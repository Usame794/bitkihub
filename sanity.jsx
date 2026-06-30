/* ============================================================
   Sanity CMS — browser-compatible client
   Token is read from _app.config.js (window.__BH.token) which
   loads before this file. To rotate the key, edit only that file.
   ============================================================ */

const SANITY_PROJECT_ID  = "akpzc8he";
const SANITY_DATASET     = "production";
const SANITY_API_VERSION = "2024-01-01";

/* ── Read token from config file loaded before this script ── */
const SANITY_WRITE_TOKEN = (window.__BH && window.__BH.token) || "";
console.log("[Sanity] Token loaded:", SANITY_WRITE_TOKEN ? `sk...${SANITY_WRITE_TOKEN.slice(-6)}` : "MISSING — app.config.js not loaded");

/* ── Image URL builder ──────────────────────────────────────
   Converts a Sanity asset _ref like:
     "image-abc123-1920x1080-jpg"
   into a CDN URL. Falls back to a plain URL (Unsplash, etc.).
   ─────────────────────────────────────────────────────────── */
function sanityImageUrl(refOrStr, w = 900, q = 70) {
  if (!refOrStr) return null;
  if (typeof refOrStr === "string" && refOrStr.startsWith("http")) return refOrStr;
  const ref = typeof refOrStr === "object" ? (refOrStr._ref || refOrStr?.asset?._ref) : refOrStr;
  if (!ref || !ref.startsWith("image-")) return refOrStr;
  const body = ref.slice("image-".length);
  const lastDash = body.lastIndexOf("-");
  const filename = body.slice(0, lastDash) + "." + body.slice(lastDash + 1);
  return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${filename}?w=${w}&q=${q}&auto=format&fit=crop`;
}

/* ── GROQ query via REST API ────────────────────────────────
   Returns result array, or throws on HTTP error.
   Pass `fallback` to return silently on error.
   ─────────────────────────────────────────────────────────── */
async function sanityFetch(query, fallback) {
  try {
    const url =
      `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}` +
      `/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`;
    const res  = await fetch(url, { headers: { "Accept": "application/json" } });
    if (!res.ok) throw new Error(`Sanity HTTP ${res.status}`);
    const { result } = await res.json();
    return result ?? fallback ?? [];
  } catch (err) {
    if (fallback !== undefined) return fallback;
    throw err;
  }
}

/* ── Write API — creates Lead documents from forms ─────────
   ⚠️  Token is visible in browser source. Risk is low (an
   attacker can only spam lead documents). Rotate in
   _app.config.js if abused.
   ─────────────────────────────────────────────────────────── */
async function sanityMutate(mutations) {
  if (!SANITY_WRITE_TOKEN) {
    throw new Error("Sanity write token not configured — check _app.config.js");
  }
  const url =
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}` +
    `/data/mutate/${SANITY_DATASET}`;
  const reqBody = JSON.stringify({ mutations });
  console.log("[Sanity] Mutate →", url, "\nHeaders: Content-Type: application/json, Authorization: Bearer sk..."+SANITY_WRITE_TOKEN.slice(-6), "\nBody:", reqBody);
  let res;
  try {
    res = await fetch(url, {
      method:  "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${SANITY_WRITE_TOKEN}`,
      },
      body: reqBody,
    });
  } catch (networkErr) {
    console.error("[Sanity] Network / CORS error:", networkErr);
    throw networkErr;
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err  = new Error(`Sanity mutate HTTP ${res.status}: ${text}`);
    console.error("[Sanity] Mutate failed:", err.message);
    throw err;
  }
  return res.json();
}

/* ── Rate limiter — max 3 form submissions per minute per session ─── */
function checkRateLimit() {
  try {
    const key = "bh_rl", windowMs = 60000, maxCalls = 3;
    const now   = Date.now();
    const calls = JSON.parse(localStorage.getItem(key) || "[]");
    const recent = calls.filter(t => now - t < windowMs);
    if (recent.length >= maxCalls) return false;
    localStorage.setItem(key, JSON.stringify([...recent, now]));
    return true;
  } catch { return true; } // fail open if localStorage unavailable
}

/* ── Input sanitizer — strip angle brackets, trim, cap length ─── */
function sanitizeField(str, maxLen = 500) {
  if (str == null) return str;
  return String(str).replace(/[<>]/g, "").trim().slice(0, maxLen);
}

/* Expose globally so subsequent scripts can call them */
Object.assign(window, {
  sanityFetch, sanityImageUrl, sanityMutate,
  checkRateLimit, sanitizeField,
  SANITY_PROJECT_ID, SANITY_DATASET,
});

/* ============================================================
   Live Preview — active only when the site is loaded inside
   the Sanity Studio Presentation tool iframe.
   ============================================================ */
;(function initLivePreview() {
  if (window.self === window.top) return;

  const QUERY = encodeURIComponent(
    '*[_type in ["liner","category","supplyProject","blogPost","faqItem","siteContent"]]'
  );
  const SSE_URL =
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}` +
    `/data/listen/${SANITY_DATASET}?query=${QUERY}&includeResult=false&visibility=sync`;

  let refreshTimer = null;
  function scheduleRefresh() {
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(async () => {
      if (typeof window.initFromSanity === "function") {
        await window.initFromSanity();
      }
      window.dispatchEvent(new CustomEvent("sanity:updated"));
    }, 400);
  }

  function connectSSE() {
    const es = new EventSource(SSE_URL);
    es.addEventListener("mutation", scheduleRefresh);
    es.onerror = () => { es.close(); setTimeout(connectSSE, 5000); };
  }

  window.addEventListener("load", connectSSE);
})();

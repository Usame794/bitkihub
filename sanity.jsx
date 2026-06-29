/* ============================================================
   Sanity CMS — browser-compatible client
   Uses the Sanity Content Lake REST API directly (no npm).
   Loaded before data.jsx so initFromSanity() can call sanityFetch().
   ============================================================ */

const SANITY_PROJECT_ID  = "akpzc8he";
const SANITY_DATASET     = "production";
const SANITY_API_VERSION = "2024-01-01";

/* ── Image URL builder ──────────────────────────────────────
   Converts a Sanity asset _ref like:
     "image-abc123-1920x1080-jpg"
   into:
     "https://cdn.sanity.io/images/akpzc8he/production/abc123-1920x1080.jpg?w=900&..."
   Falls back to a plain URL string (Unsplash, etc.) if passed one.
   ─────────────────────────────────────────────────────────── */
function sanityImageUrl(refOrStr, w = 900, q = 70) {
  if (!refOrStr) return null;

  // Already a plain URL (Unsplash / external)
  if (typeof refOrStr === "string" && refOrStr.startsWith("http")) return refOrStr;

  // Could be an asset object  { _ref: "image-..." }
  const ref = typeof refOrStr === "object" ? (refOrStr._ref || refOrStr?.asset?._ref) : refOrStr;
  if (!ref || !ref.startsWith("image-")) return refOrStr; // give back as-is

  // "image-{id}-{dims}-{ext}"  →  "{id}-{dims}.{ext}"
  const body = ref.slice("image-".length);
  const lastDash = body.lastIndexOf("-");
  const filename = body.slice(0, lastDash) + "." + body.slice(lastDash + 1);

  return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${filename}?w=${w}&q=${q}&auto=format&fit=crop`;
}

/* ── GROQ query via REST API ────────────────────────────────
   Returns result array (or throws on HTTP error).
   Pass `fallback` (array / object) to return silently on error.
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

/* ── Write API — used by forms to create Lead documents ────────
   Create a token at sanity.io/manage → project → API → Tokens
   Role: "Editor"  (minimum needed for document creation)
   ⚠️  This token is visible in browser source. Risk is low (an
   attacker could only spam lead documents). Rotate it if abused.
   ─────────────────────────────────────────────────────────── */
const SANITY_WRITE_TOKEN = "skONtxhjEmAQvNiwFLxJS3hhxUlBNXhhxZX0teTsHfofcWS2TLOTT66YSeLuP8GqB1mTc4bcDFnWtKMqQMHj4Ihq0Kb6zceZTy9k7OuAwSaHvcNN8d8dOACEugleAyzclea9Ss5YE4rix4aSam7VA88eqUOL4LOJUOgtQTaFbNAIgRH7ZFdR";

async function sanityMutate(mutations) {
  if (!SANITY_WRITE_TOKEN || SANITY_WRITE_TOKEN === "REPLACE_WITH_SANITY_WRITE_TOKEN") {
    throw new Error("Sanity write token not configured");
  }
  const url =
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}` +
    `/data/mutate/${SANITY_DATASET}`;
  let res;
  try {
    res = await fetch(url, {
      method:  "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${SANITY_WRITE_TOKEN}`,
      },
      body: JSON.stringify({ mutations }),
    });
  } catch (networkErr) {
    // Typically a CORS preflight failure or network outage
    console.error("[Sanity] Network / CORS error:", networkErr);
    throw networkErr;
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err = new Error(`Sanity mutate HTTP ${res.status}: ${text}`);
    console.error("[Sanity] Mutate failed:", err.message);
    throw err;
  }
  return res.json();
}

/* Expose globally so data.jsx and app.jsx can use them */
Object.assign(window, { sanityFetch, sanityImageUrl, sanityMutate, SANITY_PROJECT_ID, SANITY_DATASET });

/* ============================================================
   Live Preview — active only when the site is loaded inside
   the Sanity Studio Presentation tool iframe.

   Uses the Sanity Mutations SSE API to detect when content is
   published, then re-calls initFromSanity() and dispatches
   "sanity:updated" so app.jsx can remount the screens.
   ============================================================ */
;(function initLivePreview() {
  /* Not in an iframe → normal visitor, do nothing */
  if (window.self === window.top) return;

  const QUERY = encodeURIComponent(
    '*[_type in ["liner","category","supplyProject","blogPost","faqItem","siteContent"]]'
  );
  const SSE_URL =
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}` +
    `/data/listen/${SANITY_DATASET}?query=${QUERY}&includeResult=false&visibility=sync`;

  let refreshTimer = null;

  function scheduleRefresh() {
    /* Debounce: batch rapid mutations (e.g. saving multiple fields) */
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
    es.addEventListener("welcome",  () => console.log("[Sanity] Live preview ready ✓"));
    es.addEventListener("mutation", scheduleRefresh);
    es.onerror = () => {
      es.close();
      /* Reconnect after 5 s on any error */
      setTimeout(connectSSE, 5000);
    };
  }

  /* data.jsx (and thus initFromSanity) loads after sanity.jsx,
     so wait for the full page load before connecting. */
  window.addEventListener("load", connectSSE);
})();

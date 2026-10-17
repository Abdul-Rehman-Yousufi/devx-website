const IK_URL = import.meta.env.VITE_IK_URL_ENDPOINT ?? "";

/**
 * Modern placeholder SVG when a project image is missing or invalid.
 */
export const DEFAULT_PROJECT_PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="50%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="800" height="500" fill="url(#bg)"/>
  <rect width="800" height="500" fill="url(#grid)"/>
  <circle cx="400" cy="220" r="60" fill="rgba(59,130,246,0.15)" stroke="#38bdf8" stroke-width="2"/>
  <polygon points="390,200 420,220 390,240" fill="#38bdf8"/>
  <text x="400" y="320" font-family="monospace" font-size="16" fill="#94a3b8" text-anchor="middle" letter-spacing="4">DEVX ENTERPRISE PROJECT</text>
  <text x="400" y="350" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="middle">Interactive Architecture & Systems</text>
</svg>
`)}`;

/**
 * Resolves an image path intelligently:
 * - Data URLs (data:image/...) returned immediately.
 * - Absolute remote URLs (http/https) returned directly.
 * - If VITE_IK_URL_ENDPOINT is defined, passes through ImageKit transformation.
 * - Otherwise, cleans and resolves to local static path (starting with /).
 */
export function getOptimizedImageUrl(path: string | undefined | null): string {
  if (!path || path.trim() === "") {
    return DEFAULT_PROJECT_PLACEHOLDER;
  }

  // Already a base64 / data URL
  if (path.startsWith("data:")) {
    return path;
  }

  // Remote URL
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Clean local path
  const normalized = path.startsWith("/") ? path : `/${path}`;

  // If ImageKit is configured
  if (IK_URL && IK_URL.trim() !== "") {
    const baseUrl = IK_URL.replace(/\/$/, "");
    const cleanPath = normalized.slice(1);
    const encodedSegments = cleanPath
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");
    return `${baseUrl}/${encodedSegments}?tr=w-1200,q-85`;
  }

  return normalized;
}

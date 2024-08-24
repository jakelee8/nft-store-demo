let url = "http://localhost:5173";
try {
  url = (globalThis as any).location.origin;
} catch {}

export const baseUrl = url;

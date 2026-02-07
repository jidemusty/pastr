/**
 * Get the backend API base URL based on environment
 * - Production: uses NEXT_PUBLIC_BACKEND_URL environment variable
 * - Development: Falls back to localhost:3001
 */
export function getBackendUrl(): string {
  // In production, use the environment variable set by Railway
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_URL;
  }

  return "http://localhost:3001";
}

export function getApiUrl(path: string): string {
  const baseUrl = getBackendUrl();
  // remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${baseUrl}/${cleanPath}`;
}

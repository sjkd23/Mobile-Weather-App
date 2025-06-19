// Fetches JSON from a URL and throws with a clear error if the response isn't OK.
// If the server provides a JSON error message, we show that instead of just the status.
export async function fetchJSON<T = any>(
  url: string,
  options: { signal?: AbortSignal } = {}
): Promise<T> {
  const res = await fetch(url, options);

  if (!res.ok) {
    let errMsg = `${res.status} ${res.statusText}`;
    try {
      // Try to extract a more specific error message from the response body
      const errData = await res.json();
      if (errData?.message) {
        errMsg = errData.message;
      }
    } catch {
      // Ignore JSON parse errors, just use the status text
    }
    throw new Error(errMsg);
  }

  // If OK, return the parsed JSON
  return res.json();
}

// Fetch JSON from a URL, throw with a helpful error message if not OK
export async function fetchJSON<T = any>(
  url: string,
  options: { signal?: AbortSignal } = {}
): Promise<T> {
  const res = await fetch(url, options);

  if (!res.ok) {
    let errMsg = `${res.status} ${res.statusText}`;
    try {
      const errData = await res.json();
      if (errData?.message) {
        errMsg = errData.message;
      }
    } catch {
      // If parsing fails, just use the status text
    }
    throw new Error(errMsg);
  }

  return res.json();
}

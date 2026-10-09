const apiBases = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

export async function fetchBazarData(path: string, revalidate: number) {
  let lastError: Error | null = null;

  for (const base of apiBases) {
    try {
      const response = await fetch(`${base}/${path}`, {
        next: { revalidate },
      });

      if (!response.ok) {
        lastError = new Error(`Bazar Dor API returned ${response.status}.`);
        continue;
      }

      return await response.json();
    } catch (error) {
      lastError =
        error instanceof Error
          ? error
          : new Error("Could not connect to the Bazar Dor API.");
    }
  }

  throw lastError ?? new Error("The Bazar Dor API is unavailable.");
}

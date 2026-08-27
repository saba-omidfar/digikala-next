export async function digikalaFetch({ path }) {
  const url = `https://digikala.apps.abrclick.cloud${path}`;

  const res = await fetch(url, {
    headers: {
      Accept: "application/json, text/plain, */*",
      "User-Agent": "Mozilla/5.0",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Digikala proxy failed: ${res.status}`);
  }

  return res.json();
}

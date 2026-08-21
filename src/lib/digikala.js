export async function digikalaFetch({ path, cookie }) {
  const url = `https://digikala.apps.abrclick.cloud${path}`;

  const headers = {
    Accept: "application/json",
    "User-Agent": "Mozilla/5.0",
  };

  if (cookie) {
    headers.Cookie = cookie;
  }

  const res = await fetch(url, {
    method: "GET",
    headers,
    redirect: "manual",
    cache: "no-store",
  });

  console.log("DIGIKALA PROXY STATUS:", res.status);
  console.log("DIGIKALA PROXY LOCATION:", res.headers.get("location"));

  const text = await res.text();

  console.log("DIGIKALA PROXY BODY:", text.slice(0, 500));

  if (!res.ok) {
    throw new Error(
      `Digikala fetch failed: ${res.status} - ${text.slice(0, 300)}`,
    );
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Digikala returned invalid JSON: ${text.slice(0, 300)}`);
  }
}

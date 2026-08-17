export const runtime = "nodejs";

export async function GET() {
  const urls = [
    "https://example.com",
    "https://www.digikala.com",
    "https://api.digikala.com/discovery/api/v1/home",
  ];

  const results = {};

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        method: "GET",
        redirect: "manual",
      });

      results[url] = {
        status: res.status,
        location: res.headers.get("location"),
      };
    } catch (err) {
      results[url] = {
        message: err.message,
        cause: err.cause?.message,
        code: err.cause?.code,
      };
    }
  }

  return Response.json(results);
}

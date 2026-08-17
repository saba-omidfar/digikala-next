export const runtime = "nodejs";

export async function GET() {
  const url = "https://api.digikala.com/discovery/api/v1/home";

  const headers = {
    Accept: "application/json, text/plain, */*",
    "Accept-Language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",

    Origin: "https://www.digikala.com",
    Referer: "https://www.digikala.com/",

    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36",

    "x-web-client": "desktop",
    "x-web-client-id": "web",
  };

  try {
    const res = await fetch(url, {
      method: "GET",
      headers,
      redirect: "manual",
      cache: "no-store",
    });

    const text = await res.text();

    return Response.json({
      status: res.status,
      location: res.headers.get("location"),
      contentType: res.headers.get("content-type"),
      body: text.slice(0, 1000),
    });
  } catch (err) {
    return Response.json({
      message: err.message,
      name: err.name,
      cause: err.cause?.message,
      causeCode: err.cause?.code,
      causeName: err.cause?.name,
    });
  }
}

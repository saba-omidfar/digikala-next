export const runtime = "nodejs";
export const preferredRegion = "fra1";

export async function GET() {
  const url = "https://api.digikala.com/discovery/api/v1/home";

  try {
    const res = await fetch(url, {
      redirect: "manual",
      cache: "no-store",
    });

    const text = await res.text();

    return Response.json({
      status: res.status,
      location: res.headers.get("location"),
      contentType: res.headers.get("content-type"),
      body: text.slice(0, 500),
    });
  } catch (err) {
    return Response.json({
      message: err.message,
      cause: err.cause?.message,
      code: err.cause?.code,
    });
  }
}

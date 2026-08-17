export const runtime = "nodejs";

export async function GET() {
  try {
    const res = await fetch("https://api.digikala.com", {
      redirect: "manual",
      cache: "no-store",
    });

    return Response.json({
      status: res.status,
      location: res.headers.get("location"),
    });
  } catch (err) {
    return Response.json({
      message: err.message,
      cause: err.cause?.message,
    });
  }
}

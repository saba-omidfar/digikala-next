import { digikalaFetch } from "@/lib/digikala";
export const runtime = "nodejs";

export async function GET(req, { params }) {
  try {
    const { productId } = await params;

    const offset = req.nextUrl.searchParams.get("offset") || "0";

    const path = `/v1/product/${productId}/tabular-recommendation/?offset=${offset}&productId=${productId}`;

    const data = await digikalaFetch({
      path,
      headers: req.headers,
    });

    return Response.json(data);
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        message: err.message,
      },
      {
        status: 500,
      },
    );
  }
}

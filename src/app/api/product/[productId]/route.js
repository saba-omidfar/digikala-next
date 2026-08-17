import { digikalaFetch } from "@/lib/digikala";

export const runtime = "nodejs";

export async function GET(req, { params }) {
  try {
    const { productId } = await params;

    const path = `/v2/product/${productId}/?_rch=9fd46e644c8e`;

    const data = await digikalaFetch({
      path,
    });

    return Response.json(data);
  } catch (err) {
    console.error("❌ PRODUCT API ERROR =>", err);

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

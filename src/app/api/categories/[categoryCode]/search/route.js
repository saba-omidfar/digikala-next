// https://api.digikala.com/v1/categories/lip-gloss/search/?_rch=9fd46e644c8e&columns_per_page=2&page=1&q=لیپ+گلاس

import { digikalaFetch } from "@/lib/digikala";
export const runtime = "nodejs";

export async function GET(req, { params }) {
  try {
    const { categoryCode } = await params;

    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const path = `/v1/categories/${categoryCode}/search/?_rch=9fd46e644c8e&${searchParams.toString()}`;

    const data = await digikalaFetch({
      path,
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

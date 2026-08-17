// https://api.digikala.com/fresh/v1/categories/clothes-detergents/search/?_whid=29&page=1

import { digikalaFetch } from "@/lib/digikala";
export const runtime = "nodejs";

export async function GET(req, { params }) {
  try {
    const { categoryCode } = await params;

    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const path = `/fresh/v1/categories/${categoryCode}/search/?_whid=29&${searchParams.toString()}`;

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

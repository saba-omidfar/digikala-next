// https://api.digikala.com/discovery/api/v1/faceted-pages/products/category-mobile-phone/from-105000000-up-to-129000000?_rch=9fd46e644c8e&facetURL%5B0%5D=category-mobile-phone&facetURL%5B1%5D=from-105000000-up-to-129000000&page=1

import { digikalaFetch } from "@/lib/digikala";

export const runtime = "nodejs";

export async function GET(req, { params }) {
  try {
    const { facetCategoryCode, facetCode } = await params;

    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const path = `/discovery/api/v1/faceted-pages/products/${facetCategoryCode}/${facetCode}/?${searchParams.toString()}`;

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

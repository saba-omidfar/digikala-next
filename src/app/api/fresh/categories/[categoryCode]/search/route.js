// api: https://api.digikala.com/fresh/v1/categories/clothes-detergents/search/?_whid=29&seo_url=&page=1

// url: https://www.digikala.com/fresh/search/category-clothes-detergents/?has_selling_stock=1

import { digikalaFetch } from "@/lib/digikala";
export const runtime = "nodejs";

export async function GET(req, { params }) {
  try {
    let { categoryCode } = await params;

    if (categoryCode?.startsWith("category-")) {
      categoryCode = categoryCode.replace("category-", "");
    }

    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const path = `/fresh/v1/categories/${categoryCode}/search/?_whid=29&${searchParams.toString()}`;

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

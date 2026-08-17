// https://api.digikala.com/v2/category/6482/?_rch=9fd46e644c8e&q=%D8%B1%DA%98%DA%AF%D9%88%D9%86%D9%87%20%D8%B4%DB%8C%DA%AF%D9%84%D9%85

import { digikalaFetch } from "@/lib/digikala";

export const runtime = "nodejs";

export async function GET(req, { params }) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    let { categoryId } = await params;

    if (!categoryId) {
      return Response.json({ error: "categoryId required" }, { status: 400 });
    }
    const mobileSearchParams = new URLSearchParams(searchParams);

    const path = `/v2/category/${categoryId}/?${mobileSearchParams.toString()}`;

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

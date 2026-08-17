// https://api.digikala.com/v1/faq/categories/22/?categoryId=22

import { digikalaFetch } from "@/lib/digikala";

export const runtime = "nodejs";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");

    const path = `/v1/faq/categories/${categoryId}/?categoryId=${categoryId}`;

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

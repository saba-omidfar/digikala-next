// https://api.digikala.com/v1/teasing-incredible/products/?page=1

import { digikalaFetch } from "@/lib/digikala";
export const runtime = "nodejs";

export async function GET(req, { params }) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const path = `/v1/teasing-incredible/products/?${searchParams?.toString()}`;

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

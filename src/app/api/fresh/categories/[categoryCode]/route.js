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

import { digikalaFetch } from "@/lib/digikala";

export const runtime = "nodejs";

export async function GET(req, { params }) {
  try {
    const { tagCategory } = await params;

    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const path = `/v1/tags/${tagCategory}/?${searchParams.toString()}`;

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

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

    const path = `/discovery/api/v1/categories/${categoryCode}/?${searchParams.toString()}`;

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

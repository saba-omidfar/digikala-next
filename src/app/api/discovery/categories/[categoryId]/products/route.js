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

    const path = `/discovery/api/v2/categories/${categoryId}/products?${mobileSearchParams.toString()}/`;

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

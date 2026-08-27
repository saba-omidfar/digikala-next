import { digikalaFetch } from "@/lib/digikala";
export const runtime = "nodejs";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const query = searchParams.get("q");
    let categoryCode = searchParams.get("categoryCode");

    if (categoryCode?.startsWith("category-")) {
      categoryCode = categoryCode.replace("category-", "");
    }

    const path = `/v1/providers-products/?${searchParams?.toString()}`;

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

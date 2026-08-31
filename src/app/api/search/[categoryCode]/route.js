import { digikalaFetch } from "@/lib/digikala";

export const runtime = "nodejs";

export async function GET(req, { params }) {
  try {
    let { categoryCode } = await params;

    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const isProductList = searchParams.get("productList") === "true";

    if (categoryCode?.startsWith("category-")) {
      categoryCode = categoryCode.replace("category-", "");
    }

    const categoryId = searchParams.get("categoryId");

    const userAgent = req.headers.get("user-agent") || "";

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      );

    let path;
    if (isProductList) {
      const webSearchParams = new URLSearchParams(searchParams);
      webSearchParams.delete("productList");

      path = `/v1/categories/${categoryCode}/search/?${webSearchParams.toString()}`;
    } else if (isMobile) {
      if (!categoryId) {
        return Response.json({ error: "categoryId required" }, { status: 400 });
      }

      const mobileSearchParams = new URLSearchParams(searchParams);

      mobileSearchParams.delete("categoryId");
      mobileSearchParams.delete("page");
      mobileSearchParams.delete("q");

      path = `/v2/category/${categoryId}/?_rch=9fd46e644c8e&${mobileSearchParams.toString()}`;
    } else {
      const webSearchParams = new URLSearchParams(searchParams);
      webSearchParams.delete("productList");

      path = `/v1/categories/${categoryCode}/search/?_rch=9fd46e644c8e&${webSearchParams.toString()}`;
    }

    console.log("path =>", path);
    console.log("categoryCode =>", categoryCode);

    const data = await digikalaFetch({
      path,
      revalidate: 10,
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

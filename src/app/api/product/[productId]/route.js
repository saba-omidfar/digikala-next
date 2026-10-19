// import { digikalaFetch } from "@/lib/digikala";

// export const runtime = "nodejs";

// export async function GET(req, { params }) {
//   try {
//     const { productId } = await params;

//     const path = `/product/v1/products/${productId}/?_rch=9fd46e644c8e`;

//     const data = await digikalaFetch({
//       path,
//     });

//     return Response.json(data);
//   } catch (err) {
//     console.error("❌ PRODUCT API ERROR =>", err);

//     return Response.json(
//       {
//         message: err.message,
//       },
//       {
//         status: 500,
//       },
//     );
//   }
// }

export const runtime = "nodejs";

export async function GET() {
  try {
    const response = await fetch(
      "https://desktop-9a6leca.tailaf0a21.ts.net/product/v1/products/7158804/",
      { cache: "no-store" },
    );

    const data = await response.json();

    return Response.json({
      success: true,
      status: response.status,
      product: data?.data?.product?.id,
    });
  } catch (error) {
    console.error("VERCEL DIRECT FETCH ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error.message,
        cause: error.cause?.code,
      },
      { status: 500 },
    );
  }
}

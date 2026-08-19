// import { digikalaFetch } from "@/lib/digikala";

// export const runtime = "nodejs";

// export async function GET(req, { params }) {
//   const { widgetId } = await params;

//   console.log("widgetId=>", widgetId);

//   try {
//     const path = `/discovery/api/v1/widget-factory/widget/${widgetId}/`;

//     const data = await digikalaFetch({
//       path,
//
//       nextRevalidateSeconds: 60,
//     });

//     return Response.json(data);
//   } catch (err) {
//     console.error("Widget API Error:", err);

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

import { digikalaFetch } from "@/lib/digikala";

export const runtime = "nodejs";

export async function GET(req, { params }) {
  try {
    const { widgetId } = await params;

    const path = `/discovery/api/v1/widget-factory/widget/${widgetId}`;

    const data = await digikalaFetch({
      path,
    });

    return Response.json(data);
  } catch (err) {
    console.error("Widget API Error =>", err);

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

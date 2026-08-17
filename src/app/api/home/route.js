// import { digikalaFetch } from "@/lib/digikala";

// export const runtime = "nodejs";

// export async function GET() {
//   try {
//     const data = await digikalaFetch({
//       path: "/discovery/api/v1/home",
//     });

//     return Response.json(data);
//   } catch (err) {
//     console.error("HOME API ERROR =>", err);

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

export async function GET() {
  try {
    const data = await digikalaFetch({
      path: "/discovery/api/v1/home/",
    });

    return Response.json(data);
  } catch (err) {
    console.error("HOME API ERROR =>", err);

    return Response.json(
      {
        message: err.message,
        cause: err.cause?.message,
      },
      {
        status: 500,
      },
    );
  }
}

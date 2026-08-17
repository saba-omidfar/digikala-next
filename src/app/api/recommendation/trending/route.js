import { digikalaFetch } from "@/lib/digikala";

export const runtime = "nodejs";

export async function GET(req) {
  try {
    const path = `/v1/recommendation/trending/`;

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

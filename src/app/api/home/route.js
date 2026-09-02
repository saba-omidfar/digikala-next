import { digikalaFetch } from "@/lib/digikala";

export const runtime = "nodejs";
export const preferredRegion = "fra1";

export async function GET(req) {
  try {
    const path = `/api/home`;

    const data = await digikalaFetch({
      path,
      revalidate: 60,
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

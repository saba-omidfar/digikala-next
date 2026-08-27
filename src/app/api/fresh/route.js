import { digikalaFetch } from "@/lib/digikala";
export const runtime = "nodejs";

export async function GET() {
  try {
    const path = `/fresh/v1/?_whid=29`;

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

import { cookies } from "next/headers";
import { digikalaFetch } from "@/lib/digikala";

export const runtime = "nodejs";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    const path = `/discovery/api/v2/search?${searchParams.toString()}`;

    const data = await digikalaFetch({
      path,
      revalidate: 10,
      cookie: accessToken,
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

//https://api.digikala.com/v1/map/geo/?address=%DA%AF%D8%B1%DA%AF%D8%A7%D9%86&latitude=35.69070703918537&longitude=51.39002649040219

import { digikalaFetch } from "@/lib/digikala";

export const runtime = "nodejs";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const path = `/v1/map/geo/?${searchParams.toString()}`;

    const data = await digikalaFetch({
      path,
      headers: req.headers,
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

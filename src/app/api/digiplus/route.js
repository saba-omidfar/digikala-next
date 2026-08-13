import { digikalaFetch } from "@/lib/digikala";

export async function GET(req) {
  try {
    const path = `/v1/digiplus/`;

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

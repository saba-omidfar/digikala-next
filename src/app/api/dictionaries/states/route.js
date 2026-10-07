import { digikalaFetch } from "@/lib/digikala";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const path =
      `/v1/dictionaries/?` +
      `hashes%5B0%5D=854520e5db5b50175e401c36b8002ecc&` +
      `types%5B0%5D=states&`;

    const data = await digikalaFetch({
      path,
      cache: "no-store",
    });

    return Response.json(data);
  } catch (error) {
    console.error("DICTIONARIES ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

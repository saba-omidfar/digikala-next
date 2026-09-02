import { digikalaFetch } from "@/lib/digikala";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const path =
      `/v1/dictionaries/?` +
      `hashes%5B4%5D=58cfcee70626faf0dec86f1284566008&` +
      `types%5B4%5D=universal&`;

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

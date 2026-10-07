import { digikalaFetch } from "@/lib/digikala";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const path =
      `/v1/dictionaries/?` +
      `hashes%5B1%5D=0b848a3d0eda54da5e1235d2d96b863c&` +
      `types%5B1%5D=cities&`;

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

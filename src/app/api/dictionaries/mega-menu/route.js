import { digikalaFetch } from "@/lib/digikala";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const path =
      `/v1/dictionaries/?` +
      `hashes%5B3%5D=5b4d0f1131bd23ed423c553f6d522aac&` +
      `types%5B3%5D=mega_menu`;

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

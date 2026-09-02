import { digikalaFetch } from "@/lib/digikala";

export const revalidate = 86400;

export async function GET() {
  try {
    const path =
      `/v1/dictionaries/?` +
      `hashes%5B3%5D=ebc1db8afbada2b70d1aa833850c7318&` +
      `types%5B3%5D=mega_menu&`;

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

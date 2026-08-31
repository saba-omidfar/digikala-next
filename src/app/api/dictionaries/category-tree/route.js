import { digikalaFetch } from "@/lib/digikala";

export const revalidate = 86400;

export async function GET() {
  try {
    const path =
      `/v1/dictionaries/?` +
      `hashes%5B5%5D=88db406e01f9f602ffa8081c62a72ea2&` +
      `types%5B5%5D=category_tree&`;

    const data = await digikalaFetch({
      path,
      revalidate: 86400,
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

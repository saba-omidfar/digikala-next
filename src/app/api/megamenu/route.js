import dbConnect from "@/configs/db";
import MegamenuModel from "@/models/Megamenu";

export async function GET() {
  try {
    await dbConnect();

    const megamenus = await MegamenuModel.find().lean();

    return new Response(
      JSON.stringify({
        message: "Megamenus fetched successfully.",
        data: megamenus,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}

export async function PATCH(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { categoryCode, subCategoriesBestSelling } = body;

    if (!categoryCode || !subCategoriesBestSelling) {
      return Response.json(
        { message: "categoryCode یا subCategoriesBestSelling ارسال نشده" },
        { status: 400 }
      );
    }

    const updated = await MegamenuModel.findOneAndUpdate(
      { categoryUrl: { $regex: categoryCode, $options: "i" } },
      {
        $set: {
          subCategoriesBestSelling,
        },
      },
      { new: true }
    );

    if (!updated) {
      return Response.json(
        { message: "هیچ Megamenu با این categoryCode پیدا نشد" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        message: "subCategoriesBestSelling با موفقیت آپدیت شد",
        data: updated,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        message: "خطای سرور",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

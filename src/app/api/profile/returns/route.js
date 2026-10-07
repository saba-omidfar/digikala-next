import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";

import mockReturns from "@/data/mockReturns";

export const runtime = "nodejs";

export async function GET(req) {
  try {
    await dbConnect();

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        {
          success: false,
          message: "کاربر وارد نشده است",
          data: {
            return_requests: [],
            pager: {
              current_page: 1,
              total_pages: 1,
              total_items: 0,
            },
          },
        },
        { status: 401 },
      );
    }

    const user = await UserModel.findOne({
      "auth.accessToken": accessToken,
    });

    if (!user?.is_logged_in) {
      return Response.json(
        {
          success: false,
          message: "کاربر پیدا نشد",
          data: {
            return_requests: [],
            pager: {
              current_page: 1,
              total_pages: 1,
              total_items: 0,
            },
          },
        },
        { status: 404 },
      );
    }

    const { searchParams } = new URL(req.url);

    const activeTab = searchParams.get("activeTab") || "returned";
    const page = Math.max(Number(searchParams.get("page")) || 1, 1);

    const limit = 10;
    const skip = (page - 1) * limit;

    const totalItems = mockReturns.length;
    const totalPages = Math.max(Math.ceil(totalItems / limit), 1);

    const returnRequests = mockReturns.slice(skip, skip + limit);

    return Response.json({
      success: true,

      data: {
        return_requests: returnRequests,

        pager: {
          current_page: page,
          total_pages: totalPages,
          total_items: totalItems,
        },
      },
    });
  } catch (error) {
    console.error("GET /api/profile/returns error:", error);

    return Response.json(
      {
        success: false,
        message: "دریافت مرجوعی‌ها با خطا مواجه شد",
        data: {
          return_requests: [],
          pager: {
            current_page: 1,
            total_pages: 1,
            total_items: 0,
          },
        },
      },
      { status: 500 },
    );
  }
}

// import dbConnect from "@/configs/db";
// import UserModel from "@/models/User";
// import OTPModel from "@/models/Otp";
// import generateToken from "@/utils/auth";

// export async function POST(req) {
//   try {
//     await dbConnect();
//     const { username, code } = await req.json();

//     if (!username || !code) {
//       return new Response(
//         JSON.stringify({ message: "username و code هر دو لازم هستند." }),
//         { status: 400 }
//       );
//     }

//     const phoneRegex = /^(\+98|0)?9\d{9}$/;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     let query = {};
//     if (phoneRegex.test(username)) query = { "user.phone": username };
//     else if (emailRegex.test(username)) {
//       return new Response(
//         JSON.stringify({
//           message: "ورود از طریق ایمیل فقط با رمز عبور امکان‌پذیر است.",
//         }),
//         { status: 400 }
//       );
//     } else
//       return new Response(
//         JSON.stringify({ message: "فرمت ورودی نادرست است." }),
//         {
//           status: 400,
//         }
//       );

//     // پیدا کردن کاربر
//     const user = await UserModel.findOne(query);
//     if (!user) {
//       return new Response(JSON.stringify({ message: "کاربر پیدا نشد." }), {
//         status: 404,
//       });
//     }

//     // پیدا کردن OTP تاییدنشده برای این کاربر
//     const otp = await OTPModel.findOne({ userId: user._id, verified: false });

//     if (!otp) {
//       return new Response(
//         JSON.stringify({ message: "کد یافت نشد یا قبلاً استفاده شده." }),
//         {
//           status: 400,
//         }
//       );
//     }

//     // بررسی انقضا
//     if (otp.expiresAt < new Date()) {
//       // منقضی شده — پاکش کن و خطا بده
//       await otp.deleteOne();
//       return new Response(JSON.stringify({ message: "کد منقضی شده است." }), {
//         status: 400,
//       });
//     }

//     // بررسی بلاک
//     if (otp.blockedUntil && otp.blockedUntil > new Date()) {
//       const waitSeconds = Math.ceil((otp.blockedUntil - new Date()) / 1000);
//       return new Response(
//         JSON.stringify({
//           message: `تعداد تلاش‌ها زیاد است؛ لطفاً بعد از ${Math.ceil(
//             waitSeconds / 60
//           )} دقیقه دوباره تلاش کنید.`,
//         }),
//         { status: 403 }
//       );
//     }

//     // بررسی کد
//     if (otp.code !== String(code)) {
//       otp.attempts = (otp.attempts || 0) + 1;
//       // اگر از حد عبور کرد => بلاک ۵ دقیقه‌ای
//       if (otp.attempts >= 10) {
//         otp.blockedUntil = new Date(Date.now() + 5 * 60 * 1000); // 5 دقیقه
//       }
//       await otp.save();
//       return new Response(JSON.stringify({ message: "کد اشتباه است." }), {
//         status: 400,
//       });
//     }

//     // اگر رسیدیم اینجا، کد درست است
//     otp.verified = true;
//     await otp.save();
//     // حذف رکورد OTP چون دیگر نیازی نیست
//     await otp.deleteOne();

//     // تولید یا استفاده از توکن موجود
//     let token = user.auth?.token || "";
//     if (!user.is_logged_in || !token) {
//       token = generateToken({ id: user._id, username });
//       user.auth = { token, tokenCreatedAt: new Date() };
//     }
//     user.is_logged_in = true;
//     await user.save();

//     // پاسخ موفقیت‌آمیز همراه توکن و اطلاعات کاربر (نانس، در صورت نیاز می‌توان فیلدهای حساس را حذف کرد)
//     return new Response(
//       JSON.stringify({ message: "ورود موفقیت‌آمیز بود.", token, data: user }),
//       { status: 200 }
//     );
//   } catch (err) {
//     console.error("verifyCode error:", err);
//     return new Response(JSON.stringify({ message: err.message }), {
//       status: 500,
//     });
//   }
// }

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";
import OTPModel from "@/models/Otp";
import CartModel from "@/models/Cart";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    await dbConnect();

    const { code, guestCartId } = await req.json();
    const cookiesStore = await cookies();
    const token = cookiesStore?.get("token")?.value;

    if (!token)
      return Response.json(
        { message: "کاربر لاگین نیست یا توکن یافت نشد" },
        { status: 401 },
      );

    const user = await UserModel.findOne({ "auth.token": token });
    if (!user)
      return Response.json({ message: "کاربر یافت نشد" }, { status: 404 });

    // ✅ بررسی کد OTP
    const otpRecord = await OTPModel.findOne({ userId: user._id });
    if (!otpRecord || otpRecord.code !== code) {
      return Response.json({ message: "کد تایید اشتباه است" }, { status: 400 });
    }

    await OTPModel.deleteMany({ userId: user._id });

    return Response.json({
      success: true,
      message: "کد تایید صحیح است و سبد خرید مرج شد",
      user,
      clearGuestCartId: true,
    });
  } catch (err) {
    console.error("verifyCode error:", err);
    return Response.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}

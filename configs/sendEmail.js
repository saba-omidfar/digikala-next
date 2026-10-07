import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendVerificationEmail(email, code, name = "کاربر") {
  const today = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,

    subject: "تایید آدرس ایمیل - دیجیکالا",

    text: `
کاربر گرامی: ${name}

سلام

این ایمیل به درخواست شما، برای تایید ایمیل‌تان در حساب کاربری دیجی‌کالا ارسال شده است.

برای تایید ایمیل از کد تایید زیر استفاده کنید:

کد تایید: ${code}

لطفاً توجه داشته باشید، این کد پس از ۵ دقیقه منقضی خواهد شد.

تاریخ: ${today}
    `.trim(),

    html: `
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>تایید ایمیل دیجی‌کالا</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    width: 100%;
    min-width: 100%;
    background-color: #eeeeee;
    color: #77787b;
  font-family: "IRANYekan" !important;
    font-size: 16px;
    line-height: 30px;
  "
>

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
      width: 100%;
      background-color: #eeeeee;
      padding: 30px;
      border-collapse: collapse;
    "
  >
    <tr>
      <td align="center">

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            width: 100%;
            max-width: 1100px;
            background-color: #ffffff;
            border-collapse: collapse;
          "
        >

          <!-- Logo -->
          <tr>
            <td
              align="center"
              style="padding: 30px 20px 10px;"
            >
              <img
                src="https://www.digikala.com/brand/full-horizontal.svg"
                alt="دیجی‌کالا"
                width="180"
                style="
                  display: block;
                  margin: 0 auto;
                  max-width: 180px;
                  height: auto;
                  border: 0;
                "
              />
            </td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 10px 30px 20px;">

              <h1
                style="
                  margin: 0;
                  padding: 0;
                  text-align: center;
                  color: #77787b;
                font-family: "IRANYekan" !important;
                  font-size: 18px;
                  font-weight: normal;
                  line-height: 30px;
                "
              >
                تایید ایمیل دیجی‌کالا
              </h1>

            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 30px;">
              <div
                style="
                  height: 1px;
                  background-color: #f2f2f2;
                  width: 100%;
                "
              ></div>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 25px 45px 30px;">

              <p
                style="
                  margin: 0 0 12px;
                  text-align: right;
                  direction: rtl;
                  color: #77787b;
                  font-family: "IRANYekan" !important;
                  font-size: 16px;
                  line-height: 30px;
                "
              >
                کاربر گرامی: ${name}
              </p>

              <p
                style="
                  margin: 0 0 12px;
                  text-align: right;
                  direction: rtl;
                  color: #77787b;
                  font-family: "IRANYekan" !important;
                  font-size: 16px;
                  line-height: 30px;
                "
              >
                سلام
              </p>

              <p
                style="
                  margin: 0 0 12px;
                  text-align: right;
                  direction: rtl;
                  color: #77787b;
                  font-family: "IRANYekan" !important;
                  font-size: 16px;
                  line-height: 30px;
                "
              >
                این ایمیل به درخواست شما، برای تایید ایمیل‌تان در حساب کاربری دیجی‌کالا ارسال شده است.
              </p>

              <p
                style="
                  margin: 0 0 12px;
                  text-align: right;
                  direction: rtl;
                  color: #77787b;
                  font-family: "IRANYekan" !important;
                  font-size: 16px;
                  line-height: 30px;
                "
              >
                برای تایید ایمیل از کد تایید زیر استفاده کنید:
              </p>

              <p
                style="
                  margin: 0 0 12px;
                  text-align: right;
                  direction: rtl;
                  color: #77787b;
                  font-family: "IRANYekan" !important;
                  font-size: 16px;
                  line-height: 30px;
                "
              >
                لطفاً توجه داشته باشید، این کد پس از ۵ دقیقه منقضی خواهد شد.
              </p>

              <p
                style="
                  margin: 0;
                  text-align: right;
                  direction: rtl;
                  color: #77787b;
                  font-family: "IRANYekan" !important;
                  font-size: 16px;
                  line-height: 30px;
                "
              >
                تاریخ ${today}
              </p>

              <!-- Verification Code -->
              <p
                style="
                  margin: 25px 0 10px;
                  text-align: center;
                  direction: ltr;
                  color: #333333;
                  font-family: Arial, sans-serif;
                  font-size: 28px;
                  font-weight: bold;
                  letter-spacing: 8px;
                  line-height: 40px;
                "
              >
                ${code}
              </p>

            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 30px;">
              <div
                style="
                  height: 1px;
                  background-color: #f2f2f2;
                  width: 100%;
                "
              ></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 25px 45px 35px;">

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  width: 100%;
                  border-collapse: collapse;
                "
              >
                <tr>

                  <!-- More information -->
                  <td
                    width="50%"
                    valign="top"
                    style="
                      text-align: right;
                      direction: rtl;
                      padding-left: 20px;
                    "
                  >

                    <strong
                      style="
                        display: block;
                        margin-bottom: 8px;
                        color: #77787b;
                        font-size: 12px;
                        line-height: 24px;
                      "
                    >
                      اطلاعات بیشتر
                    </strong>

                    <a
                      href="https://www.digikala.com/"
                      style="
                        color: #009ec9;
                        font-size: 12px;
                        text-decoration: none;
                        line-height: 28px;
                      "
                    >
                      راهنمای خرید کالا از دیجی‌کالا
                    </a>

                    <br />

                    <a
                      href="https://www.digikala.com/"
                      style="
                        color: #009ec9;
                        font-size: 12px;
                        text-decoration: none;
                        line-height: 28px;
                      "
                    >
                      تماس با ما
                    </a>

                  </td>

                  <!-- Social media -->
                  <td
                    width="50%"
                    valign="top"
                    style="
                      text-align: right;
                      direction: rtl;
                    "
                  >

                    <strong
                      style="
                        display: block;
                        margin-bottom: 15px;
                        color: #77787b;
                        font-size: 12px;
                        line-height: 24px;
                      "
                    >
                      ما را در شبکه های اجتماعی دنبال کنید:
                    </strong>

                    <a
                      href="https://www.telegram.me/digikala"
                      style="
                        display: inline-block;
                        margin-left: 8px;
                        text-decoration: none;
                      "
                    >
                      <img
                        src="https://dkstatics-public.digikala.com/logo/be4d4f7c788cb65836f60d3883967ae0466feaff_1728117288.png"
                        alt="Telegram"
                        width="40"
                        height="40"
                        style="
                          display: block;
                          border: 0;
                        "
                      />
                    </a>

                    <a
                      href="https://www.instagram.com/digikalacom"
                      style="
                        display: inline-block;
                        margin-left: 8px;
                        text-decoration: none;
                      "
                    >
                      <img
                        src="https://dkstatics-public.digikala.com/logo/0b363fe06bb30c90068643f9c1543a752fbbe67f_1728117999.png"
                        alt="Instagram"
                        width="40"
                        height="40"
                        style="
                          display: block;
                          border: 0;
                        "
                      />
                    </a>

                    <a
                      href="https://www.facebook.com/DigikalaPortal"
                      style="
                        display: inline-block;
                        margin-left: 8px;
                        text-decoration: none;
                      "
                    >
                      <img
                        src="https://dkstatics-public.digikala.com/logo/74374e3e83467be521bdea18b9f1e45c22ed5f1d_1728118051.png"
                        alt="Facebook"
                        width="40"
                        height="40"
                        style="
                          display: block;
                          border: 0;
                        "
                      />
                    </a>

                  </td>

                </tr>
              </table>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
    `.trim(),
  });
}

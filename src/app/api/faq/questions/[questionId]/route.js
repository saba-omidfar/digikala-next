// https://api.digikala.com/v1/faq/questions/649/

import { digikalaFetch } from "@/lib/digikala";

export const runtime = "nodejs";

export async function GET(req, context) {
  try {
    const params = await context.params;
    const questionId = params?.questionId;

    const path = `/v1/faq/questions/${questionId}/`;

    const data = await digikalaFetch({
      path,
    });

    return Response.json(data);
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        message: err.message,
      },
      {
        status: 500,
      },
    );
  }
}

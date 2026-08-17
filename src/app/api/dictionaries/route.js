// https://api.digikala.com/v1/dictionaries/?hashes%5B0%5D=854520e5da5bf75e401c36b8002ecc&hashes%5B1%5D=897bdda8bf6f2dfbc47ed8eda90b76d9&hashes%5B2%5D=4ee2c70608fae0b62a7aefe87fe714e1&hashes%5B3%5D=ebc1db8afbada2b70d1aa833850c7318&hashes%5B4%5D=58cfcee70626faf0dec86f1284566008&hashes%5B5%5D=88db406e01f9f602ffa8081c62a72ea2&hashes%5B6%5D=2ea0f9b2fbe91246b5165aba96fc4493&hashes%5B7%5D=b0e7555f1d9f7820ec58302d44c3b545&hashes%5B8%5D=8f5187577f7a2bb85a316b5fd36fbd24&types%5B0%5D=states&types%5B1%5D=cities&types%5B2%5D=user_jobs&types%5B3%5D=mega_menu&types%5B4%5D=universal&types%5B5%5D=category_tree&types%5B6%5D=districts&types%5B7%5D=seo_content&types%5B8%5D=superapp_services

import { digikalaFetch } from "@/lib/digikala";

export async function GET(req) {
  try {
    const path = `/v1/dictionaries/?hashes%5B0%5D=854520e5da5bf75e401c36b8002ecc&hashes%5B1%5D=897bdda8bf6f2dfbc47ed8eda90b76d9&hashes%5B2%5D=4ee2c70608fae0b62a7aefe87fe714e1&hashes%5B3%5D=ebc1db8afbada2b70d1aa833850c7318&hashes%5B4%5D=58cfcee70626faf0dec86f1284566008&hashes%5B5%5D=88db406e01f9f602ffa8081c62a72ea2&hashes%5B6%5D=2ea0f9b2fbe91246b5165aba96fc4493&hashes%5B7%5D=b0e7555f1d9f7820ec58302d44c4b545&hashes%5B8%5D=8f5187577f7a2bb85a326b5fd36fbd64&types%5B0%5D=states&types%5B1%5D=cities&types%5B2%5D=user_jobs&types%5B3%5D=mega_menu&types%5B4%5D=universal&types%5B5%5D=category_tree&types%5B6%5D=districts&types%5B7%5D=seo_content&types%5B8%5D=superapp_services/`;

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

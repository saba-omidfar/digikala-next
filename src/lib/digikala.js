// export const runtime = "nodejs";

// export async function digikalaFetch({ path, cookie }) {
//   const url = `https://api.digikala.com${path}`;

//   const headers = {
//     Accept: "application/json, text/plain, */*",
//     "Accept-Language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",

//     Origin: "https://www.digikala.com",
//     Referer: "https://www.digikala.com/",

//     "User-Agent":
//       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36",

//     "x-web-client": "desktop",
//     "x-web-client-id": "web",
//   };

//   if (cookie) {
//     headers.Cookie = cookie;
//   }

//   try {
//     const res = await fetch(url, {
//       method: "GET",
//       headers,
//       cache: "no-store",
//       redirect: "manual",
//     });

//     const text = await res.text();

//     console.log("TEST URL =>", url);
//     console.log("STATUS =>", res.status);
//     console.log("LOCATION =>", res.headers.get("location"));
//     console.log("BODY =>", text.slice(0, 300));

//     if (!res.ok) {
//       console.error("DIGIKALA ERROR =>", {
//         status: res.status,
//         location: res.headers.get("location"),
//         body: text,
//       });

//       throw new Error(`Digikala fetch failed: ${res.status}`);
//     }

//     return JSON.parse(text);
//   } catch (err) {
//     console.error("FAILED URL =>", url);
//     console.log(err);
//   }
// }

export async function digikalaFetch({ path, cookie }) {
  const url = `https://digikala.apps.abrclick.cloud${path}`;

  const headers = {
    Accept: "application/json",
    "User-Agent": "Mozilla/5.0",
  };

  if (cookie) {
    headers.Cookie = cookie;
  }

  const res = await fetch(url, {
    method: "GET",
    headers,
    redirect: "manual",
    cache: "no-store",
  });

  const text = await res.text();

  console.log("PROXY STATUS:", res.status);
  console.log("PROXY BODY:", text.slice(0, 300));

  if (!res.ok) {
    throw new Error(`Proxy failed: ${res.status}`);
  }

  const data = JSON.parse(text);

  // نسخه فعلی Proxy پاسخ Digikala را داخل body گذاشته
  if (data.body && data.status) {
    return JSON.parse(data.body);
  }

  return data;
}

// export const runtime = "nodejs";

// export async function digikalaFetch({ path, cookie }) {
//   try {
//     const url = `https://api.digikala.com${path}`;

//     const headers = {
//       Accept: "application/json, text/plain, */*",
//       "Accept-Language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",

//       Origin: "https://www.digikala.com",
//       Referer: "https://www.digikala.com/",

//       "User-Agent":
//         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36",

//       "x-web-client": "desktop",
//       "x-web-client-id": "web",
//     };

//     if (cookie) {
//       headers.Cookie = cookie;
//     }

//     const res = await fetch(url, {
//       method: "GET",
//       headers,
//       cache: "no-store",
//       redirect: "follow",
//     });

//     const text = await res.text();

//     if (!res.ok) {
//       console.error("DIGIKALA ERROR =>", {
//         status: res.status,
//         body: text,
//       });

//       throw new Error(`Digikala fetch failed: ${res.status}`);
//     }

//     return JSON.parse(text);
//   } catch (err) {
//     console.error("DIGIKALA FETCH ERROR =>", err);

//     throw err;
//   }
// }

export const runtime = "nodejs";

export async function digikalaFetch({ path, cookie }) {
  const url = `https://api.digikala.com${path}`;

  const headers = {
    Accept: "application/json, text/plain, */*",
    "Accept-Language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",

    Origin: "https://www.digikala.com",
    Referer: "https://www.digikala.com/",

    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36",

    "x-web-client": "desktop",
    "x-web-client-id": "web",
  };

  if (cookie) {
    headers.Cookie = cookie;
  }

  console.log("DIGIKALA REQUEST =>", url);

  const res = await fetch(url, {
    method: "GET",
    headers,
    cache: "no-store",
    redirect: "manual",
  });

  const text = await res.text();

  console.log("DIGIKALA RESPONSE =>", {
    status: res.status,
    location: res.headers.get("location"),
    body: text.slice(0, 500),
  });

  return {
    status: res.status,
    location: res.headers.get("location"),
    body: text,
  };
}

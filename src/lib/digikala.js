// export const runtime = "nodejs";
// let cookieCache = null;
// let cookiePromise = null;
// const COOKIE_TTL = 10 * 60 * 1000;

// async function fetchCookiesOnce() {
//   if (cookiePromise) return cookiePromise;

//   cookiePromise = (async () => {
//     try {
//       const res = await fetch("https://api.digikala.com/", {
//         method: "GET",
//         redirect: "manual",
//         headers: {
//           "User-Agent":
//             "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
//           "Accept-Language": "fa-IR,fa;q=0.9",
//         },
//       });
//       const cookie = res.headers.get("set-cookie") || "";
//       cookieCache = { value: cookie, time: Date.now() };
//       return cookie;
//     } finally {
//       cookiePromise = null;
//     }
//   })();

//   return cookiePromise;
// }

// export async function digikalaFetch(path = "/v2/", opts = {}) {
//   const url = `https://api.digikala.com${path}`;
//   const nextOpt = opts.nextRevalidateSeconds
//     ? { next: { revalidate: opts.nextRevalidateSeconds } }
//     : {};

//   let res = await fetch(url, {
//     method: "GET",
//     headers: {
//       "User-Agent":
//         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
//       Accept: "application/json",
//       "Accept-Language": "fa-IR,fa;q=0.9",
//     },
//     ...nextOpt,
//   });

//   if (
//     (res.status === 403 || res.status === 307) &&
//     opts.allowCookieRetry !== false
//   ) {
//     const now = Date.now();
//     if (!cookieCache || now - cookieCache.time > COOKIE_TTL) {
//       await fetchCookiesOnce();
//     }
//     const cookieHeader = cookieCache?.value || "";
//     res = await fetch(url, {
//       method: "GET",
//       headers: {
//         Cookie: cookieHeader,
//         "User-Agent":
//           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
//         Accept: "application/json",
//         "Accept-Language": "fa-IR,fa;q=0.9",
//       },
//       ...nextOpt,
//     });
//   }

//   if (!res.ok)
//     throw new Error(`Digikala fetch failed ${res.status} ${res.statusText}`);
//   return res.json();
// }

// ----------------------------------------------------

// export const runtime = "nodejs";

// let cookieCache = null;
// let cookiePromise = null;
// const COOKIE_TTL = 60 * 60 * 1000;

// function extractCookies(setCookieHeaders = []) {
//   return setCookieHeaders.map((c) => c.split(";")[0]).join("; ");
// }

// async function fetchCookiesOnce() {
//   if (cookiePromise) return cookiePromise;

//   cookiePromise = (async () => {
//     try {
//       const res = await fetch("https://api.digikala.com/", {
//         method: "GET",
//         cache: "no-store",
//         headers: {
//           scheme: "theme",
//           Accept: "application/json, text/plain, */*",
//           "accept-encoding": "gzip, deflate, br, zstd",
//           "Accept-Language": "en-US,en;q=0.9,fa;q=0.8,da;q=0.7",
//           Cookie: cookiePromise,
//           Origin: "https://api.digikala.com/",
//           priority: "u=1, i",
//           Referer: "https://api.digikala.com/",
//           //       "sec-ch-ua":
//           // "Not:A-Brand";v="99", "Google Chrome";v="145", "Chromium";v="145",
//           "sec-ch-ua-mobile": "?0",
//           "sec-ch-ua-platform": "Windows",
//           "sec-fetch-dest": "empty",
//           "sec-fetch-mode": "cors",
//           "sec-fetch-site": "same-site",
//           "User-Agent":
//             "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
//           "x-web-client": "desktop",
//           "x-web-client-id": "web",
//           // "x-web-optimize-response": "1",
//         },
//       });

//       // گرفتن همه set-cookie ها
//       const raw = res.headers.raw?.()["set-cookie"] || [];
//       const cookieString = extractCookies(raw);

//       cookieCache = { value: cookieString, time: Date.now() };
//       return cookieString;
//     } finally {
//       cookiePromise = null;
//     }
//   })();

//   return cookiePromise;
// }

// export async function digikalaFetch(path) {
//   const url = `https://api.digikala.com${path}`;
//   console.log("url =>", url);

//   const now = Date.now();
//   if (!cookieCache || now - cookieCache.time > COOKIE_TTL) {
//     await fetchCookiesOnce();
//   }

//   const cookieHeader = cookieCache?.value || "";

//   const res = await fetch(url, {
//     method: "GET",
//     cache: "no-store",
//     headers: {
//       scheme: "theme",
//       Accept: "application/json, text/plain, */*",
//       "accept-encoding": "gzip, deflate, br, zstd",
//       "Accept-Language": "en-US,en;q=0.9,fa;q=0.8,da;q=0.7",
//       Cookie: cookieHeader,
//       Origin: "https://www.digikala.com",
//       priority: "u=1, i",
//       Referer: "https://www.digikala.com/",
//       //       "sec-ch-ua":
//       // "Not:A-Brand";v="99", "Google Chrome";v="145", "Chromium";v="145",
//       "sec-ch-ua-mobile": "?0",
//       "sec-ch-ua-platform": "Windows",
//       "sec-fetch-dest": "empty",
//       "sec-fetch-mode": "cors",
//       "sec-fetch-site": "same-site",
//       "User-Agent":
//         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
//       "x-web-client": "desktop",
//       "x-web-client-id": "web",
//       "x-web-optimize-response": "1",
//     },
//   });

//   if (!res.ok) {
//     throw new Error(`Digikala fetch failed ${res.status} ${res.statusText}`);
//   }

//   return res.json();
// }

export const runtime = "nodejs";

// --------------------------------------------------
// IMPORTANT
// --------------------------------------------------
// چون request از localhost میاد،
// browser کوکی‌های digikala.com رو نمیفرسته.
//
// بنابراین برای اینکه response واقعی دیجیکالا
// رو بگیری باید cookie واقعی رو inject کنیم.
//
// از DevTools > Request Headers > cookie
// کامل کپی کن و اینجا بذار.
// --------------------------------------------------

const DIGIKALA_COOKIE =
  `tracker_glob_new=gUplZXv; _ga=GA1.1.1030415819.1770316836; _ym_uid=177199663290783998; _ym_d=1771996632; Digikala:General:Location=bmFPT01JcXZRVUxkdHBWSGd6VlFpQT09%26THVmTlhLMmhzNVVEZFgvT3o3UHR5dmJ4ckNHdndwUGhmd2hqVGsvc3pHOHpYT2pPNytBbFZreklzMHRLcXQ2ME8vTy9HdHZ5N1k5RVZvbERnTCt5bmc9PQ~~; _hp2_id.11909122=%7B%22userId%22%3A%22810070886986464%22%2C%22pageviewId%22%3A%222405524217623498%22%2C%22sessionId%22%3A%222625913130530116%22%2C%22identity%22%3A%2268411837132%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _sp_id.3a05=9f571041-9fa4-4984-9141-b1a5d3ffe597.1781066794.3.1782795248.1781326889.8558fead-a684-47ad-8576-119f045d674a.a65212ab-28d2-4f17-adb6-40d8a10c95f2.63f79d11-cd65-4362-a6d0-de512291ac45.1782795096424.2; _clck=14rpaic%5E2%5Eg7g%5E0%5E2342; Digikala:User:Token:v2=eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzV1hCbVNCcjZ2cDZXa0VmQ05FMlR0U08zRWxhaEQ3X2hla3UzM3pkQ0JnIn0.eyJleHAiOjE3ODU1NTY3NjUsImlhdCI6MTc4NDk1MTk2NSwianRpIjoib25ydGFjOjRjOGIzZmZmLTRjMDgtYmQ3Yy02YzFlLWQxYjhlNTcwOWQwOSIsImlzcyI6Imh0dHBzOi8vYXV0aC5kaWdpa2FsYS5jb20vcmVhbG1zL2RrLWdyb3VwIiwic3ViIjoiZjo2NmQzYjRhMC03NTUzLTQ2OTgtODFiNC1jYzNlZTYzZTI3YTg6OGM4ODRiNTYtN2Q4Yi00NDg4LTliNWItODIyOGVkOGZmZTY5IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZGlnaWthbGEtd2ViLXB1YmxpYyIsInNpZCI6ImZlNTU2ODdmLTkxMDEtNDkwMC1hM2U1LTAzMjNhYTg0YjgzYiIsInNjb3BlIjoib3BlbmlkIGFiOnM6ZCB1cDpwOmJzYzpyIGFiOmM6ZCBhYjpjOnIiLCJtc25pZCI6IjcwMjA5NzY2Nzk1NjkyMzg1NjYiLCJ1dWlkIjoiOGM4ODRiNTYtN2Q4Yi00NDg4LTliNWItODIyOGVkOGZmZTY5In0.Z1kNQreYQns3fovKXTtcNSVKbqhTZiLT-qCYROoWi5HhDqKzFUh-s1Neaf4WKb47UPuQR3QDdfxp1qKIpPJhqGwFiQmkdLHZheYM2DB3tqTME3frEyYxelfYohfE4TjsMJHuDtay3DGyjlrIV6DGR52r8qkP4SCUiemMlKmGTzvu8lV3JHWxw69N4pnNwnZ6ndxUE07T_nreOnfOML9MR20i4wDT8jAq36WMgC4zgwzIpTwN-xGkpUfnMmCpjvgUtfjvfXDm1_2PLxO2Xe52GT73galxupoR_qEn2iloqmM735czhFxVzPJkBcoz4JoZWfytZ4SWshR92CzM7GvQgA; ACCESS_TOKEN=eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzV1hCbVNCcjZ2cDZXa0VmQ05FMlR0U08zRWxhaEQ3X2hla3UzM3pkQ0JnIn0.eyJleHAiOjE3ODU1NTY3NjUsImlhdCI6MTc4NDk1MTk2NSwianRpIjoib25ydGFjOjRjOGIzZmZmLTRjMDgtYmQ3Yy02YzFlLWQxYjhlNTcwOWQwOSIsImlzcyI6Imh0dHBzOi8vYXV0aC5kaWdpa2FsYS5jb20vcmVhbG1zL2RrLWdyb3VwIiwic3ViIjoiZjo2NmQzYjRhMC03NTUzLTQ2OTgtODFiNC1jYzNlZTYzZTI3YTg6OGM4ODRiNTYtN2Q4Yi00NDg4LTliNWItODIyOGVkOGZmZTY5IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZGlnaWthbGEtd2ViLXB1YmxpYyIsInNpZCI6ImZlNTU2ODdmLTkxMDEtNDkwMC1hM2U1LTAzMjNhYTg0YjgzYiIsInNjb3BlIjoib3BlbmlkIGFiOnM6ZCB1cDpwOmJzYzpyIGFiOmM6ZCBhYjpjOnIiLCJtc25pZCI6IjcwMjA5NzY2Nzk1NjkyMzg1NjYiLCJ1dWlkIjoiOGM4ODRiNTYtN2Q4Yi00NDg4LTliNWItODIyOGVkOGZmZTY5In0.Z1kNQreYQns3fovKXTtcNSVKbqhTZiLT-qCYROoWi5HhDqKzFUh-s1Neaf4WKb47UPuQR3QDdfxp1qKIpPJhqGwFiQmkdLHZheYM2DB3tqTME3frEyYxelfYohfE4TjsMJHuDtay3DGyjlrIV6DGR52r8qkP4SCUiemMlKmGTzvu8lV3JHWxw69N4pnNwnZ6ndxUE07T_nreOnfOML9MR20i4wDT8jAq36WMgC4zgwzIpTwN-xGkpUfnMmCpjvgUtfjvfXDm1_2PLxO2Xe52GT73galxupoR_qEn2iloqmM735czhFxVzPJkBcoz4JoZWfytZ4SWshR92CzM7GvQgA; REFRESH_TOKEN_V2=eyJhbGciOiJIUzUxMiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2YmZhN2EzMy1lMWI3LTQwNzItYjQzMS1mNGFlNjc0ODI0YzkifQ.eyJleHAiOjE3ODc1NDM5NjUsImlhdCI6MTc4NDk1MTk2NSwianRpIjoiNmFiNmY0YWEtODE3MS0yNTc1LTdmOTYtYjc5ZGYyNWYwZDRkIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmRpZ2lrYWxhLmNvbS9yZWFsbXMvZGstZ3JvdXAiLCJhdWQiOiJodHRwczovL2F1dGguZGlnaWthbGEuY29tL3JlYWxtcy9kay1ncm91cCIsInN1YiI6ImY6NjZkM2I0YTAtNzU1My00Njk4LTgxYjQtY2MzZWU2M2UyN2E4OjhjODg0YjU2LTdkOGItNDQ4OC05YjViLTgyMjhlZDhmZmU2OSIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJkaWdpa2FsYS13ZWItcHVibGljIiwic2lkIjoiZmU1NTY4N2YtOTEwMS00OTAwLWEzZTUtMDMyM2FhODRiODNiIiwic2NvcGUiOiJvcGVuaWQgYWI6czpkIHVwOnA6YnNjOnIgYWI6YzpkIGFiOmM6ciJ9.5QmT_8wbWCNwor4X7Lvsoe6_Z5Fe-JJTyu_0hvfDevKHZYSmn8J8MW0CaIMkTR6od6WrtYwcVpKt-UqF93qE2Q; ab_test_experiments=%5B%22229ea1a233356b114984cf9fa2ecd3ff%22%2C%224905b18f64695e6dbfd739d20a4ae2c0%22%2C%22f0fd80107233fa604679779d7e121710%22%2C%2237136fdc21e0b782211ccac8c2d7be63%22%5D; _sp_ses.13cb=*; PHPSESSID=3283qhl3hi55tk3e9l9qmmtv18; tracker_session=6aZ3OtP; TS01c77ebf=010231059161e75b60d90580ecfa52942df3f3172c10f0aab69021f27c4bb473ad133d772cbc77d0fb25333f438f0bfdc00300ae9a917951d8cc2df1412eb9ed3182c28e81ed11f0c37981d0c32eb89c42c759fa04; TS01b9d479=018165420755f002d2bda6cfe75631f51cff62961f41031a76f3f6ffeba84f876b14f2c3b192a7e12a58bef799f441dae539876143ea7fee75bad636fb935632464f58ad07b30b28f4e7f4cc7cfecf0c6c7baa06ee; TS01b6ea4d=0181654207a2734cdf677148fa1ae82c2cf975901641031a76f3f6ffeba84f876b14f2c3b192a7e12a58bef799f441dae539876143ea7fee75bad636fb935632464f58ad074052215f8eac56b102a0be9b6f30d622f58ed9e5334e078b32e77034e32e25f5; _sp_id.13cb=f7c3e47a-8017-4129-a756-9ec8de40b092.1770316807.627.1785555950.1785511074.bd2cc372-ea50-498f-b582-ba5791116068.77c91712-0bc8-436e-b718-9314b6354a66.ea8e77d5-f47c-4a0f-ac44-c7f800b1d6f1.1785555526142.18; _ga_QQKVTD5TG8=GS2.1.s1785555529$o328$g1$t1785555969$j34$l0$h0`
    .replace(/\s+/g, " ")
    .trim();

// location-area هم مهمه
const LOCATION_AREA =
  "WmZlakJtNUU3Y3h6K0JacG1JSzhhQVAxTXZzSXE1amtvR0JUZG9xTEV3az0=";

function buildHeaders() {
  return {
    Accept: "application/json, text/plain, */*",

    "Accept-Encoding": "gzip, deflate, br, zstd",

    "Accept-Language": "en-US,en;q=0.9,fa;q=0.8",

    Origin: "https://www.digikala.com",

    Referer: "https://www.digikala.com/",

    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36",

    "sec-ch-ua":
      '"Chromium";v="148", "Google Chrome";v="148", "Not/A)Brand";v="99"',

    "sec-ch-ua-mobile": "?0",

    "sec-ch-ua-platform": '"Windows"',

    // IMPORTANT
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",

    "x-web-client": "desktop",
    "x-web-client-id": "web",
    "x-web-optimize-response": "1",

    "location-area": LOCATION_AREA,

    Cookie: DIGIKALA_COOKIE,
  };
}

export async function digikalaFetch({ path, headers: incomingHeaders }) {
  try {
    const url = `https://api.digikala.com${path}`;

    console.log("DIGIKALA URL =>", url);

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: buildHeaders(incomingHeaders),
      redirect: "follow",
    });

    // if (!res.ok) {
    //   const text = await res.text();

    //   console.error("DIGIKALA ERROR =>", text);

    //   throw new Error({
    //     status: res.status,
    //   });

    //   throw new Error(`Digikala fetch failed ${res.status}`);
    // }

    const json = await res.json();

    return json;
  } catch (err) {
    console.error("DIGIKALA FETCH ERROR =>", err);

    throw err;
  }
}

// -----------------------------------------------------

// export const runtime = "nodejs";

// let cookieCache = { cookies: null, timestamp: 0 };
// const COOKIE_TTL = 60 * 60 * 1000;

// async function getUpdatedCookies() {
//   const now = Date.now();

//   if (cookieCache.cookies && now - cookieCache.timestamp < COOKIE_TTL) {
//     console.log("Using cached cookies.");
//     return cookieCache.cookies;
//   }

//   console.log("fetching now cookies ...");

//   try {
//     const response = await fetch("https://api.digikala.com/", {
//       method: "GET",
//       headers: {
//         Accept: "application/json, text/plain, */*",
//         "accept-encoding": "gzip, deflate, br, zstd",
//         "Accept-Language": "en-US,en;q=0.9,fa;q=0.8,da;q=0.7",
//         "User-Agent":
//           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
//         connection: "keep-alive",
//       },
//       redirect: "manual",
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       console.log(`Error fetching cookies:, ${response.status}`);
//       return "";
//     }

//     const setCookieHeader = response.headers.get("set-cookie");
//     if (setCookieHeader) {
//       const cookies = extractCookiesFromHeaders(response.headers);
//       cookieCache = { cookies: cookies, timestamp: now };
//       return cookies;
//     } else {
//       console.log("No set-cookies header found");
//       return "";
//     }
//   } catch (error) {
//     console.log("Exception while fetching cookies:", error);
//     return "";
//   }
// }

// function extractCookiesFromHeaders(headers) {
//   const setCookieHeader = headers.get("set-cookie");

//   if (!setCookieHeader) {
//     return "";
//   }

//   return setCookieHeader;
// }

// export async function digikalaFetch(path = "/v1/") {
//   const url = `https://api.digikala.com${path}`;
//   const cookies = await getUpdatedCookies();
//   console.log("URL  =>", `😍 ${url}`);

//   const defaultHeaders = {
//     Accept: "application/json, text/plain, */*",
//     "accept-encoding": "gzip, deflate, br, zstd",
//     "Accept-Language": "en-US,en;q=0.9,fa;q=0.8,da;q=0.7",
//     Cookie: cookies,
//     Origin: "https://www.digikala.com",
//     priority: "u=1, i",
//     Referer: "https://www.digikala.com/",
//     "X-Requested-With": "XMLHttpRequest",
//     "User-Agent":
//       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
//   };

//   try {
//     const response = await fetch(url, {
//       method: "GET",
//       cache: "no-store",
//       headers: defaultHeaders,
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.log(`Api Error:  ${response.status} ${response.text}`);
//       console.log(`Error Details:  ${errorText.substring(0, 500)}`);
//       throw new Error(`API request faild with status ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.log(`Exeption in digikalaFetch for ${url}:`, error);
//     throw error;
//   }
// }

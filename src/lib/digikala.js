// // export async function digikalaFetch({
// //   path,
// //   cache = "force-cache",
// //   revalidate,
// // }) {
// //   const url = `https://digikala.apps.abrclick.cloud${path}`;

// //   const options = {
// //     headers: {
// //       Accept: "application/json, text/plain, */*",
// //       "User-Agent": "Mozilla/5.0",
// //     },
// //   };

// //   if (cache === "no-store") {
// //     options.cache = "no-store";
// //   } else if (revalidate) {
// //     options.next = { revalidate };
// //   } else {
// //     options.cache = "force-cache";
// //   }

// //   const res = await fetch(url, options);

// //   if (!res.ok) {
// //     throw new Error(`Digikala proxy failed: ${res.status}`);
// //   }

// //   return res.json();
// // }

// export async function digikalaFetch({
//   path,
//   cache = "force-cache",
//   revalidate,
// }) {
//   const url = `https://digikala.apps.abrclick.cloud${path}`;

//   const startTime = Date.now();

//   console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//   console.log("🟡 DIGIKALA REQUEST");
//   console.log("📍 Path:", path);
//   console.log("🌐 URL:", url);
//   console.log("💾 Cache:", cache);
//   console.log("🔄 Revalidate:", revalidate ?? "none");

//   const options = {
//     headers: {
//       Accept: "application/json, text/plain, */*",
//       "User-Agent": "Mozilla/5.0",
//     },
//   };

//   if (cache === "no-store") {
//     options.cache = "no-store";
//   } else if (revalidate) {
//     options.next = { revalidate };
//   } else {
//     options.cache = "force-cache";
//   }

//   const fetchStart = Date.now();

//   try {
//     const res = await fetch(url, options);

//     const fetchTime = Date.now() - fetchStart;

//     console.log("📡 Response received");
//     console.log("📊 Status:", res.status);
//     console.log("⏱️ Fetch time:", `${fetchTime}ms`);

//     if (!res.ok) {
//       console.error("🔴 DIGIKALA REQUEST FAILED");
//       console.error("❌ Status:", res.status);
//       console.error("❌ Path:", path);

//       throw new Error(`Digikala proxy failed: ${res.status}`);
//     }

//     const jsonStart = Date.now();

//     const data = await res.json();

//     const jsonTime = Date.now() - jsonStart;
//     const totalTime = Date.now() - startTime;

//     console.log("📦 JSON parsed");
//     console.log("⏱️ JSON parse time:", `${jsonTime}ms`);
//     console.log("⏱️ TOTAL TIME:", `${totalTime}ms`);
//     console.log("🟢 DIGIKALA REQUEST SUCCESS");
//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

//     return data;
//   } catch (error) {
//     const totalTime = Date.now() - startTime;

//     console.error("🔴 DIGIKALA FETCH ERROR");
//     console.error("📍 Path:", path);
//     console.error("⏱️ Failed after:", `${totalTime}ms`);
//     console.error("❌ Error:", error);

//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

//     throw error;
//   }
// }

export async function digikalaFetch({
  path,
  cache = "force-cache",
  revalidate,
}) {
  const start = Date.now();

  const url = `https://digikala.apps.abrclick.cloud${path}`;

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🟡 DIGIKALA REQUEST");
  console.log("📍 Path:", path);
  console.log("🌐 URL:", url);
  console.log("💾 Cache:", cache);
  console.log("🔄 Revalidate:", revalidate);

  const options = {
    headers: {
      Accept: "application/json, text/plain, */*",
      "User-Agent": "Mozilla/5.0",
    },
  };

  if (cache === "no-store") {
    options.cache = "no-store";
  } else if (revalidate) {
    options.next = { revalidate };
  } else {
    options.cache = "force-cache";
  }

  // 1. Fetch
  const fetchStart = Date.now();

  const res = await fetch(url, options);

  const fetchTime = Date.now() - fetchStart;

  console.log("📡 Response received");
  console.log("📊 Status:", res.status);
  console.log("⏱️ Fetch time:", fetchTime, "ms");

  if (!res.ok) {
    throw new Error(`Digikala proxy failed: ${res.status}`);
  }

  // 2. Read body
  const textStart = Date.now();

  const text = await res.text();

  const textTime = Date.now() - textStart;

  console.log("📦 Response received as text");
  console.log("📏 Response size:", text.length, "bytes");
  console.log(
    "📏 Response size:",
    (text.length / 1024 / 1024).toFixed(2),
    "MB",
  );
  console.log("⏱️ Body read time:", textTime, "ms");

  // 3. JSON.parse فقط
  const parseStart = Date.now();

  const data = JSON.parse(text);

  const parseTime = Date.now() - parseStart;

  console.log("📦 JSON parsed");
  console.log("⏱️ Pure JSON.parse time:", parseTime, "ms");

  // 4. Total
  console.log("⏱️ TOTAL TIME:", Date.now() - start, "ms");

  console.log("🟢 DIGIKALA REQUEST SUCCESS");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  return data;
}

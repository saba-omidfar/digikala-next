const http = require("http");

const PORT = 3001;
const TARGET = "https://api.digikala.com";

const server = http.createServer(async (req, res) => {
  try {
    const targetUrl = TARGET + req.url;

    console.log("➡️", req.method, targetUrl);

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json, text/plain, */*",
      },
      redirect: "manual",
    });

    console.log("⬅️", response.status);

    const body = await response.arrayBuffer();

    res.writeHead(response.status, {
      "Content-Type":
        response.headers.get("content-type") || "application/json",
      "Access-Control-Allow-Origin": "*",
    });

    res.end(Buffer.from(body));
  } catch (error) {
    console.error("❌ PROXY ERROR:", error);

    res.writeHead(500, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });

    res.end(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
    );
  }
});

server.listen(PORT, () => {
  console.log(`🟢 Iran proxy running: http://localhost:${PORT}`);
});

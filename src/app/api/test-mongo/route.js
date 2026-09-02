import net from "net";

export const dynamic = "force-dynamic";

export async function GET() {
  return new Promise((resolve) => {
    const socket = new net.Socket();

    socket.setTimeout(5000);

    socket.on("connect", () => {
      socket.destroy();

      resolve(
        Response.json({
          success: true,
          message: "TCP connection successful",
        }),
      );
    });

    socket.on("timeout", () => {
      socket.destroy();

      resolve(
        Response.json({
          success: false,
          message: "TCP connection timeout",
        }),
        { status: 500 },
      );
    });

    socket.on("error", (error) => {
      socket.destroy();

      resolve(
        Response.json(
          {
            success: false,
            message: error.message,
            code: error.code,
          },
          { status: 500 },
        ),
      );
    });

    socket.connect(30677, "remote-pishgaman.runflare.com");
  });
}

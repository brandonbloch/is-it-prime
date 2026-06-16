import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/worker.ts": async () => {
      const result = await Bun.build({
        entrypoints: ["./src/worker.ts"],
      });
      return new Response(result.outputs[0], {
        headers: {
          "Content-Type": "application/javascript",
        },
      });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);

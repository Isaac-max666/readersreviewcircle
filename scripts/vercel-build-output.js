import fs from "node:fs";
import path from "node:path";

/**
 * Converts the TanStack Start build output (dist/client + dist/server)
 * into the Vercel Build Output API format (.vercel/output).
 */

const distDir = path.resolve(process.cwd(), "dist");
const outputDir = path.resolve(process.cwd(), ".vercel/output");

// Clean previous output
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true });
}

// Copy static assets
const clientDir = path.join(distDir, "client");
const staticDir = path.join(outputDir, "static");
if (fs.existsSync(clientDir)) {
  fs.mkdirSync(staticDir, { recursive: true });
  copyDir(clientDir, staticDir);
}

// Create edge function from server bundle
const funcDir = path.join(outputDir, "functions/index.func");
fs.mkdirSync(funcDir, { recursive: true });

// Write server entry that re-exports the built server bundle
const serverBundlePath = path.join(distDir, "server", "server.js");
if (fs.existsSync(serverBundlePath)) {
  // Copy the server bundle
  fs.copyFileSync(serverBundlePath, path.join(funcDir, "index.js"));
} else {
  console.error("Server bundle not found at", serverBundlePath);
  process.exit(1);
}

// Vercel Edge Function config
fs.writeFileSync(
  path.join(funcDir, ".vc-config.json"),
  JSON.stringify(
    {
      runtime: "edge",
      entrypoint: "index.js",
    },
    null,
    2
  )
);

// Routes config: try filesystem first, then fall through to edge function
fs.writeFileSync(
  path.join(outputDir, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [
        { handle: "filesystem" },
        { src: "/(.*)", "dest": "/index" },
      ],
    },
    null,
    2
  )
);

console.log("✅ Vercel Build Output API structure created at .vercel/output");

function copyDir(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Only isolate truly route-specific heavy deps. Everything else
        // shares the main bundle so React loads before any consumer.
        manualChunks: (id) => {
          if (!id.includes("node_modules")) return;
          // PDF generation is heavy and only used on /avaliacao
          if (
            id.includes("jspdf") ||
            id.includes("html2canvas") ||
            id.includes("purify") ||
            id.includes("dompurify")
          ) {
            return "pdf";
          }
        },
      },
    },
  },
}));

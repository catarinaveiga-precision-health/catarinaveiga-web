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
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            // PDF generation is heavy and only used on /avaliacao
            if (
              id.includes("jspdf") ||
              id.includes("html2canvas") ||
              id.includes("purify") ||
              id.includes("dompurify")
            ) {
              return "pdf";
            }
            // Sanity client + image-url builder
            if (id.includes("@sanity") || id.includes("sanity")) {
              return "sanity";
            }
            // Supabase (auth + db client)
            if (id.includes("@supabase") || id.includes("supabase")) {
              return "supabase";
            }
            // Radix UI primitives bundle
            if (id.includes("@radix-ui")) {
              return "radix";
            }
            // React core
            if (
              id.includes("react/") ||
              id.includes("react-dom") ||
              id.includes("react-router") ||
              id.includes("scheduler")
            ) {
              return "react-core";
            }
            // TanStack Query
            if (id.includes("@tanstack")) {
              return "query";
            }
            // Helmet (meta tags)
            if (id.includes("react-helmet")) {
              return "helmet";
            }
            // Icons
            if (id.includes("lucide-react")) {
              return "icons";
            }
            // Everything else from node_modules
            return "vendor";
          }
        },
      },
    },
  },
}));

import { defineConfig, type Plugin } from "vite";

/**
 * Mockup: servidor local y build estático para GitHub Pages.
 *
 * `index.html` se mantiene como fragmento (sin <html>, <head> ni <body>) porque
 * es exactamente el formato que espera el publicador de artefactos: el mismo
 * fichero se sirve aquí, se publica allí y se despliega en Pages sin tocar una
 * línea.
 *
 * Este plugin lo envuelve en el esqueleto que le falta. No es cosmético: sin
 * <meta charset> los acentos salen rotos («NÃºcleo») y sin <meta viewport> el
 * móvil lo renderiza a anchura de escritorio. Servir el fragmento tal cual en
 * Pages estaría mal de las dos formas.
 */

/** Se extrae del fragmento para colocarlo donde debe ir: en el <head>. */
const TITULO_POR_DEFECTO = "Núcleo SMP";
const DESCRIPCION =
  "Mockup de la web del servidor: wiki de mods, mapa en vivo e historia.";

function artifactShell(): Plugin {
  return {
    name: "nucleo:artifact-shell",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        if (/<html[\s>]/i.test(html)) return html;

        // Un <title> dentro del <body> es HTML inválido y cada navegador lo
        // trata a su manera. Se saca del fragmento y se pone en el <head>.
        const match = html.match(/<title>([\s\S]*?)<\/title>/i);
        const titulo = match?.[1]?.trim() || TITULO_POR_DEFECTO;
        const cuerpo = html.replace(/<title>[\s\S]*?<\/title>\s*/i, "");

        return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${titulo}</title>
<meta name="description" content="${DESCRIPCION}">
<meta property="og:title" content="${titulo}">
<meta property="og:description" content="${DESCRIPCION}">
<meta property="og:type" content="website">
<style>
  :root { color-scheme: light dark; }
  body { margin: 0; font: 14px system-ui, -apple-system, "Segoe UI", sans-serif; background: #fafaf9; }
  img { max-width: 100%; }
  [hidden] { display: none !important; }
</style>
</head>
<body>
${cuerpo}
</body>
</html>`;
      },
    },
  };
}

export default defineConfig({
  root: ".",
  // Rutas relativas: GitHub Pages sirve los repos de proyecto bajo
  // /<nombre-del-repo>/, y con base absoluta cualquier asset daría 404.
  base: "./",
  plugins: [artifactShell()],
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});

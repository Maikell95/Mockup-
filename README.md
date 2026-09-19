# Mockup — web del servidor

Prototipo navegable de la web: **wiki de mods**, **mapa en vivo** e **historia
del servidor**.

Es una maqueta de diseño. La navegación funciona y el mapa se mueve, pero todos
los datos son de ejemplo: sirve para decidir el aspecto y la estructura antes de
conectar nada real.

## Las tres vistas

- **Wiki de mods** — ficha de cada mod, con lo que lo diferencia de verdad: en
  qué se aparta la configuración de este servidor de la del autor del mod.
- **Mapa en vivo** — jugadores moviéndose por las tres dimensiones, marcadores
  de bases, warps y tiendas, coordenadas y chunk bajo el cursor.
- **Historia** — las temporadas del servidor en una línea de tiempo, con el tipo
  de cada acontecimiento codificado por color.

Los recuadros punteados marcan dónde irían los anuncios, dibujados a tamaño real
para ver su impacto en la página antes de decidir si se ponen.

## Verlo en local

Requiere Node 20 o superior.

```bash
pnpm install
pnpm dev        # http://localhost:5173
```

Para generar la versión estática que se publica:

```bash
pnpm build      # deja el resultado en dist/
```

## Un detalle de la publicación

`index.html` se mantiene como fragmento, sin `<html>`, `<head>` ni `<body>`. El
esqueleto se lo añade Vite al construir (`vite.config.ts`), que es también quien
le pone el `charset` — sin él los acentos se rompen — y el `viewport` para que
funcione en móvil. Por eso lo que se publica es `dist/`, no el fichero suelto.

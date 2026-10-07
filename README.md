# Plantilla de web de boda

Web estática y personalizable para bodas. Todo el contenido específico de la pareja vive en JSON, las secciones se activan/desactivan con flags, y el color principal se cambia con una variable.

## Uso rápido (nueva pareja)

1. **Fork o clona** este repo.
2. Instala dependencias:
   ```
   npm install
   ```
3. **Edita los JSON** en `src/data/` (ver siguiente sección).
4. **Reemplaza las imágenes** en `img/` (ver `Assets a reemplazar`).
5. **Genera el HTML**:
   ```
   npx gulp
   ```
6. **Previsualiza en local**:
   ```
   npx serve .
   ```
   Abre la URL que te da (tipo `http://localhost:3000`).
7. **Despliega**: push a la rama que uses en GitHub Pages. El `index.html` de la raíz se sirve tal cual.

## Archivos de configuración (`src/data/`)

### `couple.json` — datos de la pareja
```json
{
  "names": "Alejandra y Manuel",       // usado en <title>, og:title, calendario, etc.
  "name1": "Alejandra",                 // nombre solo, para el footer con el corazón
  "name2": "Manuel",
  "domain": "alejandraymanuel.com",    // usado en og:image URL
  "rsvpEndpoint": "https://script.google.com/macros/s/.../exec",
  "gifts": {                            // sección Regalos (todo configurable)
    "message": "¡Vuestra presencia es nuestro mayor regalo! Si además queréis...",
    "iban": "ESXXXXXXX",                // IBAN para transferencias
    "image": "img/japon.jpg",           // imagen bajo el IBAN (viaje, lo que sea)
    "imageAlt": "Japón",
    "copiedToast": "IBAN copiado al portapapeles ✅"
  },
  "date": {
    "display": "10 abril 2027",         // aparece en el sobre inicial
    "displayLong": "10 de abril de 2027", // aparece en "Os esperamos el día ..."
    "city": "El Puerto de Santa María",
    "js": "Apr 10, 2027 12:30:00",      // formato JS Date, para la cuenta atrás
    "calendarStart": "Apr 10, 2027 12:30", // para "Añadir a calendario"
    "calendarEnd": "Apr 11, 2027 00:00"
  },
  "calendar": {
    "address": "Iglesia Mayor Prioral",  // dirección en el evento del calendario
    "description": "¡Os esperamos en nuestra boda!"
  },
  "venues": [                            // sección "¿Dónde?" — tantos como quieras
    {
      "name": "Iglesia Mayor Prioral",
      "time": "12:30",
      "url": "https://maps.app.goo.gl/...", // link a Google Maps
      "image": "img/mi-iglesia.jpg",
      "alt": "Iglesia",
      "note": "Texto opcional bajo el botón (p.ej. info de autobús)"
    }
  ]
}
```

### `hotels.json` — recomendaciones de hoteles
Array de hoteles. Cada uno tiene `wp` (clase de animación al hacer scroll: usa `wp3`/`wp5` para columna izquierda y `wp4`/`wp6` para columna derecha) y un array de `notes`:
```json
[
  {
    "name": "Hotel Ejemplo ****",
    "url": "https://...",
    "wp": "wp3",
    "notes": ["Código descuento: BODA2027", "15% descuento en web", "..."]
  }
]
```

### `gallery.json` — fotos de la pareja
Sube fotos numeradas `1.jpeg`, `2.jpeg`, … a `img/eng_pics/` y ajusta:
```json
{
  "path": "img/eng_pics",
  "count": 14,       // número de fotos
  "ext": "jpeg"      // extensión (jpg, jpeg, png, ...)
}
```

### `sections.json` — activar/desactivar secciones + sus títulos
Cada sección tiene tres campos:
- `enabled` — mostrar u ocultar la sección (y su link en la nav del hero)
- `title` — texto del `<h3>` dentro de la sección
- `nav` — texto del link en la navegación del hero

```json
{
  "envelope": { "enabled": true },
  "where":    { "enabled": true, "title": "¿Dónde?",              "nav": "¿Dónde?" },
  "gallery":  { "enabled": true, "title": "A & M",                "nav": "A & M" },
  "cadiz":    { "enabled": true, "title": "¿Qué hacer en Cádiz?", "nav": "Cádiz" },
  "hotels":   { "enabled": true, "title": "Hoteles",              "nav": "Hoteles" },
  "gifts":    { "enabled": true, "title": "Regalos",              "nav": "Regalos" },
  "rsvp": {
    "enabled": true,
    "title": "Confirma asistencia",
    "nav": "Confirma asistencia",
    "subtitle": "Agradeceríamos vuestra respuesta lo antes posible",
    "buttonLabel": "Continuar",
    "note": "Para conservar el ambiente íntimo y familiar...",  // "" para ocultar
    "modalTitle": "¡Muchas gracias!",
    "modalText": "Te esperamos en nuestra boda.",
    "fields": {
      "attendance": true,       // ¿Asistirás? Sí/No
      "bus": true,              // Autobús Sí/No (específico si hay bus)
      "intolerances": true,     // Restricciones alimentarias
      "comments": true,         // Comentarios
      "companion": true         // Toggle de acompañante + sus 3 campos
    }
  }
}
```

Notas:
- **`gallery`**: por defecto son las iniciales de la pareja (p. ej. "A & M"). Cámbialo a lo que prefieras ("Nosotros", "Nuestra historia", etc.).
- **`cadiz`**: adapta `title` y `nav` a tu ciudad (p. ej. `title: "¿Qué hacer en Sevilla?"`, `nav: "Sevilla"`). El contenido de la guía está en `cadiz.json`.
- **`rsvp.nav`** se usa en 3 sitios: el link de la nav del hero, el botón CTA bajo la cuenta atrás y el botón CTA grande en el header.
- **`rsvp.note`**: texto en cursiva al final del formulario. Pon `""` para ocultarlo. Útil si tu boda no restringe acompañantes o no quieres la nota.
- **`rsvp.fields.*`**: cada campo del formulario se puede activar/desactivar. Los campos `name` y `surname` son siempre obligatorios y no son toggleables.
- **`envelope`** solo tiene `enabled` (no tiene título visible).

### `theme.json` — color principal
```json
{
  "accent": "#eb8ce9",       // color principal (botones, links, iconos)
  "accentHover": "#ec3ce9"   // versión más oscura para hover
}
```

### `cadiz.json` — guía local (opcional)
Guía turística que se muestra en un modal. Estructurada por zonas, cada una con imagen y bloques. El título de la sección (`<h3>`) y el texto de la nav se definen en `sections.json → cadiz.title` y `sections.json → cadiz.nav`.
```json
{
  "buttonLabel": "Conoce Cádiz y provincia",
  "modalTitle": "GUÍA DE CÁDIZ",
  "intro": "Texto de bienvenida...",
  "outro": "Texto de despedida...",
  "zones": [
    {
      "title": "El Puerto de Santa María",
      "time": "20 min en coche",         // opcional
      "image": "img/conoce-cadiz/xxx.jpg",
      "imageAlt": "...",
      "blocks": [
        {
          "title": "Dónde comer",
          "html": "Texto con <a href='...' target='_blank'>enlaces</a> permitidos."
        }
      ]
    }
  ]
}
```
Si tu boda no es en Cádiz: edita el contenido con tu ciudad, o pon `"cadiz": false` en `sections.json` para ocultarla.

## Assets a reemplazar (`img/`)

| Archivo | Uso |
|---|---|
| `img/logo.png` | Logo pequeño en la nav (arriba izquierda) |
| `img/logo-lg.png` | Logo grande (en el sobre inicial y el hero) |
| `img/hero-min.jpeg` | **Imagen de fondo del hero** — importante, la ve todo el mundo. Mantén el nombre exacto |
| `img/hoteles.png` | Imagen de la sección Hoteles |
| `img/japon.jpg` | Imagen de la sección Regalos |
| `img/eng_pics/1.jpeg` … `14.jpeg` | Fotos del swiper (ver `gallery.json`) |
| `img/conoce-cadiz/*` | Imágenes de la guía local (solo si usas `cadiz` section) |
| Imágenes de tus venues | Referenciadas desde `couple.json → venues[].image` |
| `hero-min.jpeg` (raíz) | Miniatura para `og:image` cuando se comparte el link. Suele ser la misma que `img/hero-min.jpeg` |
| `favicon-*.png`, `apple-touch-icon.png`, `safari-pinned-tab.svg` | Favicons (regenera con https://realfavicongenerator.net si quieres) |

## Estructura del proyecto

```
src/
  index.njk              orquesta los partials según sections.json
  data/                  toda la configuración editable
  partials/              cada sección en su propio archivo
    envelope.njk, hero.njk, invitation.njk, where.njk,
    gallery.njk, cadiz.njk, hotels.njk, gifts.njk,
    rsvp.njk, footer.njk, scripts.njk, head.njk

img/                     todas las imágenes de la web
css/                     styles.min.css es el único que importa
js/                      scripts.js (fuente) y scripts.min.js (build)
sass/                    LEGADO — no está sincronizado con el CSS actual

gulpfile.js              tareas de build
package.json             deps
index.html               generado (no editar a mano)
```

## Comandos

```
npx gulp html          Solo regenera index.html desde src/
npx gulp minify-js     Solo minifica js/scripts.js → scripts.min.js
npx gulp                Ejecuta html + minify-js (default)
npx gulp sass          DEPRECATED — no ejecutar (ver aviso abajo)
npx serve .            Servidor local en localhost:3000
```

## Despliegue en GitHub Pages

1. En GitHub → Settings → Pages: rama `main`, carpeta `/ (root)`.
2. Si usas dominio propio, mete el dominio en el archivo `CNAME` de la raíz.
3. `git push` — GitHub Pages sirve `index.html` de la raíz.

## Formulario RSVP (Google Apps Script)

El endpoint en `couple.json → rsvpEndpoint` apunta a un Google Apps Script Web App que guarda los datos en una Hoja de Cálculo. Para crear uno propio:

1. Crea una nueva Google Sheet.
2. Extensions → Apps Script → pega un script que reciba `doPost(e)` y añada filas.
3. Deploy como Web App con acceso "Anyone".
4. Copia la URL `https://script.google.com/macros/s/.../exec` a `rsvpEndpoint`.

## Aviso importante sobre SCSS

`sass/styles.scss` está **desincronizado** con `css/styles.min.css` (drift histórico del template original — el CSS tiene ediciones manuales que nunca se pasaron al SCSS: selectores de iconos del formulario, referencia correcta al hero image, colores, etc.).

**No ejecutes `npx gulp sass`** — sobrescribirá el CSS con una versión rota (iconos desalineados, hero image no visible).

Para cambiar:
- **Color principal** → edita `theme.json` (usa CSS variable, ya funciona en producción)
- **Otros estilos** → edita directamente `css/styles.min.css`

Si algún día quieres volver a un pipeline SCSS limpio, hay que sincronizar el SCSS con el CSS actual (~1500 bytes de diferencias). Mientras tanto, el CSS es la fuente de verdad.

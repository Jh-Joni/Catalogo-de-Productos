import { c as createComponent } from './astro-component_BgSpqzx5.mjs';
import 'piccolore';
import { o as renderHead, k as renderTemplate, h as addAttribute } from './entrypoint_BRll9zu0.mjs';
import 'clsx';
import { r as renderScript } from './script_BAnHsMNb.mjs';
import { s as supabase } from './supabase_D3mCbMb8.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const WHATSAPP_PHONE = "593967998349";
  let productos = [];
  let error = null;
  try {
    const response = await supabase.from("productos").select("*").order("created_at", { ascending: false });
    productos = response.data || [];
    error = response.error;
  } catch (err) {
    error = err;
  }
  return renderTemplate`<html lang="es" data-astro-cid-j7pv25f6> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Catálogo Exclusivo - Arte en Flores & Regalos Únicos</title><!-- Google Fonts: Playfair Display para elegancia, Montserrat para legibilidad moderna --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-j7pv25f6> <div class="particles" data-astro-cid-j7pv25f6></div> <header data-astro-cid-j7pv25f6> <button id="openAdminBtn" class="admin-login-btn" data-astro-cid-j7pv25f6> <span data-astro-cid-j7pv25f6>🔒</span> Ingresar
</button> <span class="brand-subtitle" data-astro-cid-j7pv25f6>Catálogo Exclusivo</span> <h1 data-astro-cid-j7pv25f6>Arte en Flores & <br data-astro-cid-j7pv25f6><span data-astro-cid-j7pv25f6>Regalos Únicos</span></h1> <p class="tagline" data-astro-cid-j7pv25f6>Cada pieza es tejida a mano con amor, creando recuerdos eternos para esa persona especial. Explora nuestra colección exclusiva.</p> </header> <main data-astro-cid-j7pv25f6> ${error && renderTemplate`<div class="status-container" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>Aún no está configurada la base de datos</h3> <p data-astro-cid-j7pv25f6>No te preocupes. Para que aparezcan los productos, necesitas colocar tus credenciales de Supabase en el archivo <code data-astro-cid-j7pv25f6>.env</code>.</p> <p style="font-size: 12px; opacity: 0.7;" data-astro-cid-j7pv25f6>Detalle técnico: ${error.message || "Error de conexión"}</p> </div>`} ${!error && productos.length === 0 ? renderTemplate`<div class="status-container" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>Catálogo en Preparación</h3> <p data-astro-cid-j7pv25f6>Estamos tejiendo cosas hermosas para ti. Muy pronto encontrarás aquí nuestra colección de flores y detalles para parejas.</p> </div>` : renderTemplate`<div class="catalog-grid" data-astro-cid-j7pv25f6> ${productos.map((producto) => {
    const precioFormateado = `$${Number(producto.precio).toFixed(2)}`;
    const mensajeWhatsApp = encodeURIComponent(
      `¡Hola! Me encantó el producto "${producto.nombre}" de su catálogo exclusivo. ¿Podrían darme más información?`
    );
    const enlaceWhatsApp = `https://wa.me/${WHATSAPP_PHONE}?text=${mensajeWhatsApp}`;
    return renderTemplate`<div class="product-card" data-astro-cid-j7pv25f6> <div class="image-wrapper" data-astro-cid-j7pv25f6> <img class="product-image"${addAttribute(producto.imagen_url || "https://images.unsplash.com/photo-1546842931-886c185b4c8c?q=80&w=600&auto=format&fit=crop", "src")}${addAttribute(producto.nombre, "alt")} loading="lazy" data-astro-cid-j7pv25f6> </div> <div class="card-info" data-astro-cid-j7pv25f6> <div class="price-container" data-astro-cid-j7pv25f6> <span class="price-badge" data-astro-cid-j7pv25f6>${precioFormateado}</span> </div> <div class="card-details" data-astro-cid-j7pv25f6> <h2 class="product-name" data-astro-cid-j7pv25f6>${producto.nombre}</h2> <p class="product-description"${addAttribute(producto.descripcion, "title")} data-astro-cid-j7pv25f6> ${producto.descripcion || "Hermoso detalle artesanal tejido a mano."} </p> </div> <a class="whatsapp-btn"${addAttribute(enlaceWhatsApp, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-j7pv25f6> <svg class="whatsapp-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-astro-cid-j7pv25f6> <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" data-astro-cid-j7pv25f6></path> </svg>
Solicitar por WhatsApp
</a> </div> </div>`;
  })} </div>`} </main> <footer data-astro-cid-j7pv25f6> <p data-astro-cid-j7pv25f6>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} Catálogo Exclusivo. Todos los derechos reservados.</p> </footer> <!-- Modal de Admin --> <div id="adminModal" class="modal-overlay" data-astro-cid-j7pv25f6> <div class="modal-content" data-astro-cid-j7pv25f6> <div class="lock-icon" data-astro-cid-j7pv25f6>🔒</div> <h3 data-astro-cid-j7pv25f6>Acceso Admin</h3> <input type="password" id="modalAdminPass" placeholder="Código de acceso" data-astro-cid-j7pv25f6> <div class="modal-buttons" data-astro-cid-j7pv25f6> <button id="closeAdminBtn" class="modal-btn secondary" data-astro-cid-j7pv25f6>Cancelar</button> <button id="submitAdminBtn" class="modal-btn primary" data-astro-cid-j7pv25f6>Entrar</button> </div> <p id="modalError" data-astro-cid-j7pv25f6>Código incorrecto.</p> </div> </div> ${renderScript($$result, "C:/Users/Jonni/Documents/CatalogoFlores/Catalogo-de-Productos/src/pages/index.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/Users/Jonni/Documents/CatalogoFlores/Catalogo-de-Productos/src/pages/index.astro", void 0);

const $$file = "C:/Users/Jonni/Documents/CatalogoFlores/Catalogo-de-Productos/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

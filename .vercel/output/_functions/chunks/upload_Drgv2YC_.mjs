import { s as supabase } from './supabase_D3mCbMb8.mjs';

const prerender = false;
async function POST({ request }) {
  try {
    const formData = await request.formData();
    const nombre = formData.get("nombre");
    const descripcion = formData.get("descripcion");
    const precio = parseFloat(formData.get("precio"));
    const imagen = formData.get("imagen");
    const password = formData.get("password");
    if (password !== undefined                              ) {
      return new Response(JSON.stringify({ success: false, message: "No autorizado." }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!imagen || !imagen.name || imagen.size === 0) {
      return new Response(JSON.stringify({ success: false, message: "Debes seleccionar una fotografía." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const fileExt = imagen.name.split(".").pop();
    const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const arrayBuffer = await imagen.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const { error: errorImagen } = await supabase.storage.from("productos").upload(cleanFileName, buffer, {
      contentType: imagen.type || "image/jpeg"
    });
    if (errorImagen) {
      return new Response(JSON.stringify({ success: false, message: `Error subiendo imagen: ${errorImagen.message}` }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { data: urlData } = supabase.storage.from("productos").getPublicUrl(cleanFileName);
    const imagen_url = urlData.publicUrl;
    const { error: errorInsert } = await supabase.from("productos").insert([{ nombre, descripcion, precio, imagen_url }]);
    if (errorInsert) {
      return new Response(JSON.stringify({ success: false, message: `Error en Base de Datos: ${errorInsert.message}` }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ success: true, message: "¡Obra publicada con éxito en el catálogo!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message || "Error desconocido" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import { s as supabase } from './supabase_D3mCbMb8.mjs';

const prerender = false;
async function POST({ request }) {
  try {
    const data = await request.json();
    const { id, imagen_url, password } = data;
    if (password !== undefined                              ) {
      return new Response(JSON.stringify({ success: false, message: "No autorizado." }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!id) {
      return new Response(JSON.stringify({ success: false, message: "Faltan datos." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (imagen_url) {
      const fileName = imagen_url.split("/").pop();
      if (fileName) {
        const { error: storageError } = await supabase.storage.from("productos").remove([fileName]);
        if (storageError) {
          console.error("Error eliminando imagen:", storageError);
        }
      }
    }
    const { error: dbError } = await supabase.from("productos").delete().eq("id", id);
    if (dbError) {
      return new Response(JSON.stringify({ success: false, message: dbError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ success: true, message: "Producto eliminado correctamente." }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message || "Error interno." }), {
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

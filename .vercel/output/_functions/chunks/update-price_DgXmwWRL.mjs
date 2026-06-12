import { s as supabase } from './supabase_D3mCbMb8.mjs';

const prerender = false;
async function POST({ request }) {
  try {
    const data = await request.json();
    const { id, precio, password } = data;
    if (password !== undefined                              ) {
      return new Response(JSON.stringify({ success: false, message: "No autorizado." }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!id || precio === void 0) {
      return new Response(JSON.stringify({ success: false, message: "Faltan datos." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { error } = await supabase.from("productos").update({ precio: parseFloat(precio) }).eq("id", id);
    if (error) {
      return new Response(JSON.stringify({ success: false, message: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ success: true, message: "Precio actualizado correctamente." }), {
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

export const prerender = false;

export async function POST({ request }) {
  try {
    const data = await request.json();
    const { password } = data;

    if (password === import.meta.env.ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({ success: false, message: "Contraseña incorrecta." }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Error interno del servidor." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

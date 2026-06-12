export const prerender = false;

import { supabase } from '../../lib/supabase.js';

export async function POST({ request }) {
  try {
    const data = await request.json();
    const { id, imagen_url, password } = data;

    // Verificar contraseña
    if (password !== import.meta.env.ADMIN_PASSWORD) {
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

    // 1. Eliminar la imagen del storage si existe
    if (imagen_url) {
      const fileName = imagen_url.split('/').pop();
      if (fileName) {
        const { error: storageError } = await supabase.storage
          .from("productos")
          .remove([fileName]);
        
        if (storageError) {
          console.error("Error eliminando imagen:", storageError);
          // Continuamos aunque falle la imagen, lo importante es borrar el registro
        }
      }
    }

    // 2. Eliminar el registro de la base de datos
    const { error: dbError } = await supabase
      .from("productos")
      .delete()
      .eq("id", id);

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

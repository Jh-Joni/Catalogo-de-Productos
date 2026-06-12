export const prerender = false;

import { supabase } from '../../lib/supabase.js';

export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const nombre = formData.get("nombre");
    const descripcion = formData.get("descripcion");
    const precio = parseFloat(formData.get("precio"));
    const imagen = formData.get("imagen");
    const password = formData.get("password");

    if (password !== import.meta.env.ADMIN_PASSWORD) {
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

    const fileExt = imagen.name.split('.').pop();
    const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

    const arrayBuffer = await imagen.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. Subir a Storage
    const { error: errorImagen } = await supabase.storage
      .from("productos")
      .upload(cleanFileName, buffer, {
        contentType: imagen.type || 'image/jpeg',
      });

    if (errorImagen) {
      return new Response(JSON.stringify({ success: false, message: `Error subiendo imagen: ${errorImagen.message}` }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 2. Obtener URL pública
    const { data: urlData } = supabase.storage
      .from("productos")
      .getPublicUrl(cleanFileName);

    const imagen_url = urlData.publicUrl;

    // 3. Guardar en BD
    const { error: errorInsert } = await supabase
      .from("productos")
      .insert([{ nombre, descripcion, precio, imagen_url }]);

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

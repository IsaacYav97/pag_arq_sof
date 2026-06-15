document.addEventListener("DOMContentLoaded", () => {
    cargarSidebar();
    // Por defecto, cargamos la semana 1 al iniciar
    cambiarSemana('semana1'); 
});

function cargarSidebar() {
    fetch('sidebar.html')
        .then(respuesta => respuesta.text())
        .then(html => {
            document.getElementById('contenedor-sidebar').innerHTML = html;
        })
        .catch(error => console.error('Error al cargar el menú lateral:', error));
}

function cambiarSemana(idSemana) {
    // 1. Descargamos el archivo desde la carpeta templates/
    fetch(`templates/${idSemana}.html`)
        .then(respuesta => {
            if (!respuesta.ok) {
                return `<h2>Error 404</h2><p>El contenido de ${idSemana} aún no ha sido creado.</p>`;
            }
            return respuesta.text();
        })
        .then(html => {
            // 2. Inyectamos el HTML de la semana en el contenedor principal
            document.getElementById('contenido-dinamico').innerHTML = html;

            // 3. Actualizamos qué botón está activo en el menú (si el menú ya cargó)
            const botones = document.querySelectorAll('.menu-btn');
            if (botones.length > 0) {
                botones.forEach(btn => btn.classList.remove('active'));
                const botonActivo = Array.from(botones).find(btn => 
                    btn.getAttribute('onclick').includes(idSemana)
                );
                if (botonActivo) botonActivo.classList.add('active');
            }
        })
        .catch(error => console.error(`Error al cargar la plantilla ${idSemana}:`, error));
}
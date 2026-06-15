// js/main.js

document.addEventListener("DOMContentLoaded", () => {
    cargarSidebar();
    cambiarSemana('semana1'); 

    // 🍔 Lógica del Menú Hamburguesa Inmóvil
    const btnMenu = document.getElementById('btn-menu');
    
    if (btnMenu) { 
        btnMenu.addEventListener('click', () => {
            document.body.classList.toggle('menu-activo');
        });
    }
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
    fetch(`templates/${idSemana}.html`)
        .then(respuesta => {
            if (!respuesta.ok) return `<h2>Error 404</h2><p>Contenido no encontrado.</p>`;
            return respuesta.text();
        })
        .then(html => {
            document.getElementById('contenido-dinamico').innerHTML = html;

            const botones = document.querySelectorAll('.menu-btn');
            if (botones.length > 0) {
                botones.forEach(btn => btn.classList.remove('active'));
                const botonActivo = Array.from(botones).find(btn => btn.getAttribute('onclick').includes(idSemana));
                if (botonActivo) botonActivo.classList.add('active');
            }

            // ⚡ Cierra el menú automáticamente al cambiar de semana para dejar ver los apuntes
            if (document.body.classList.contains('menu-activo')) {
                document.body.classList.remove('menu-activo');
            }
        })
        .catch(error => console.error(`Error al cargar ${idSemana}:`, error));
}
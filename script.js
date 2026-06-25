document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Efecto Scroll Suave para los enlaces de la navegación
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Ajuste por la barra de navegación fija
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Animación "Fade-In" al hacer scroll (Intersection Observer)
    // Esto hace que los elementos aparezcan elegantemente al bajar la página
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15, // El elemento aparece cuando el 15% es visible
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target); // Deja de observar una vez que ya apareció
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

});



// --- LÓGICA DEL CARRUSEL 3D DEL EQUIPO ---
function moveCarousel(direction) {
    // Seleccionamos las 3 tarjetas
    const cards = document.querySelectorAll('.team-card-3d');
    
    let prev, active, next;
    
    // Identificamos qué rol tiene cada tarjeta en este momento
    cards.forEach(card => {
        if(card.classList.contains('prev-card')) prev = card;
        if(card.classList.contains('active-card')) active = card;
        if(card.classList.contains('next-card')) next = card;
    });

    // Removemos las clases actuales para "barajar" las posiciones
    cards.forEach(card => card.classList.remove('prev-card', 'active-card', 'next-card'));

    // Asignamos las nuevas posiciones dependiendo del botón que se presionó
    if (direction === 'next') {
        // Rotación hacia la derecha
        next.classList.add('active-card');
        active.classList.add('prev-card');
        prev.classList.add('next-card');
    } else if (direction === 'prev') {
        // Rotación hacia la izquierda
        prev.classList.add('active-card');
        active.classList.add('next-card');
        next.classList.add('prev-card');
    }
}




// --- CURSOR DE MARTILLO INTERACTIVO ---
const gavelCursor = document.getElementById('gavel-cursor');

// 1. Hacer que el martillo siga la posición del mouse
document.addEventListener('mousemove', function(e) {
    // Evitar que el código se ejecute en celulares donde no hay elemento
    if(gavelCursor.style.display !== 'none') {
        gavelCursor.style.left = e.clientX + 'px';
        gavelCursor.style.top = e.clientY + 'px';
    }
});

// 2. Animar el golpe del martillo al presionar el clic
document.addEventListener('mousedown', function() {
    gavelCursor.classList.add('gavel-hit');
});

// 3. Levantar el martillo al soltar el clic
document.addEventListener('mouseup', function() {
    gavelCursor.classList.remove('gavel-hit');
});

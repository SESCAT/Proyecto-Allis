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
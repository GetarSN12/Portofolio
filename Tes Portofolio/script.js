document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - document.querySelector('header').offsetHeight, // Sesuaikan dengan tinggi header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Scroll-reveal effect for sections
    const sections = document.querySelectorAll('.about-section, .experience-section, .skills-section, .contact-section');

    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null, // viewport as the root
        threshold: 0.15 // percentage of target visibility to trigger
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.setAttribute('aria-expanded', mainNav.classList.contains('active'));
    });
    
    // Close menu when clicking on a nav link (for mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Update active link based on current page
    const currentPage = location.pathname.split('/')[1] || 'index';
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href').split('/')[1] || 'index';
        if (currentPage === linkPage) {
            link.classList.add('active');
        }
    });
});

// Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback to Intersection Observer
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                image.src = image.dataset.src;
                imageObserver.unobserve(image);
            }
        });
    });
    
    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });
}
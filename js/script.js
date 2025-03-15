document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    if (burger && nav) {
        burger.addEventListener('click', function() {
            // Toggle navigation - using the correct class name
            nav.classList.toggle('active');
            
            // Burger animation
            burger.classList.toggle('toggle');
        });
    }
}); 
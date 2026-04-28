// ===== УПРАВЛЕНИЕ БУРГЕР-МЕНЮ С ПЛАВНЫМ ВЫЕЗДОМ СПРАВА =====
const burgerMenu = document.getElementById('burgerMenu');
const overlayMenu = document.getElementById('overlayMenu');
const closeMenu = document.getElementById('closeMenu');

// Создаём затемнение фона
const backdrop = document.createElement('div');
backdrop.className = 'overlay-backdrop';
document.body.appendChild(backdrop);

function toggleMenu() {
    burgerMenu.classList.toggle('active');
    overlayMenu.classList.toggle('open');
    backdrop.classList.toggle('active');
    
    if (overlayMenu.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Клик по затемнению — закрыть меню
backdrop.addEventListener('click', toggleMenu);
burgerMenu.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);

// Закрытие при клике на ссылку
const menuLinks = document.querySelectorAll('.mobile-nav a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (overlayMenu.classList.contains('open')) {
            toggleMenu();
        }
    });
});

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlayMenu.classList.contains('open')) {
        toggleMenu();
    }
});
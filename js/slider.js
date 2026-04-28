// ===== НАСТРОЙКИ КАРУСЕЛИ =====
// 👇👇👇 ЗДЕСЬ ПРОПИШИТЕ НАЗВАНИЯ ВАШИХ ФАЙЛОВ 👇👇👇
const imageList = [
    "images/1.jpg",
    "images/2.jpg",
    "images/3.jpg",
    "images/4.jpg",
    "images/5.jpg"
];

let currentIndex = 0;
let autoSlideInterval;

const sliderImagesDiv = document.getElementById("sliderImages");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("sliderDots");

function buildSlider() {
    sliderImagesDiv.innerHTML = "";
    imageList.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "Фото квартиры";
        img.onerror = function() {
            this.src = "https://placehold.co/1200x560/f8f8f8/cccccc?text=Фото+квартиры";
        };
        sliderImagesDiv.appendChild(img);
    });

    dotsContainer.innerHTML = "";
    imageList.forEach((_, idx) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.addEventListener("click", () => goToSlide(idx));
        dotsContainer.appendChild(dot);
    });
    updateDots();
}

function updateSlider() {
    const wrapper = document.querySelector(".slider-wrapper");
    if (!wrapper) return;
    const width = wrapper.clientWidth;
    sliderImagesDiv.style.transform = `translateX(-${currentIndex * width}px)`;
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, idx) => {
        if (idx === currentIndex) dot.classList.add("active");
        else dot.classList.remove("active");
    });
}

function nextSlide() {
    if (imageList.length === 0) return;
    currentIndex = (currentIndex + 1) % imageList.length;
    updateSlider();
}

function prevSlide() {
    if (imageList.length === 0) return;
    currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
    updateSlider();
}

function goToSlide(index) {
    currentIndex = index;
    updateSlider();
    resetAutoSlide();
}

function startAutoSlide(ms = 5000) {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => nextSlide(), ms);
}

function resetAutoSlide() {
    startAutoSlide(5000);
}

prevBtn.addEventListener("click", () => { prevSlide(); resetAutoSlide(); });
nextBtn.addEventListener("click", () => { nextSlide(); resetAutoSlide(); });
window.addEventListener("resize", () => updateSlider());

if (imageList.length > 0) {
    buildSlider();
    setTimeout(() => updateSlider(), 100);
    startAutoSlide(5000);
} else {
    sliderImagesDiv.innerHTML = '<img src="https://placehold.co/1200x560/f8f8f8/cccccc?text=Добавьте+фото+в+папку+images" alt="Памятка">';
}

// ===== ПОДСВЕТКА АКТИВНОГО ПУНКТА МЕНЮ ПРИ СКРОЛЛЕ =====
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-bar a');

function updateActiveNav() {
    let current = '';
    const scrollPosition = window.scrollY + 100; // небольшой отступ сверху

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1); // убираем #
        if (href === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);
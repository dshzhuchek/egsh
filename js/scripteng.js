document.addEventListener('DOMContentLoaded', function() {
    // Бургер-меню
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (burgerBtn) {
        burgerBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Кнопка "читать больше"
    const readMoreBtn = document.getElementById('readMoreBtn');
    const moreText = document.getElementById('moreText');
    
    if (readMoreBtn && moreText) {
        readMoreBtn.addEventListener('click', function() {
            if (moreText.classList.contains('show')) {
                moreText.classList.remove('show');
                this.textContent = 'read more';
            } else {
                moreText.classList.add('show');
                this.textContent = 'close';
            }
        });
    }
    
    // Анимация появления при скролле
    const fadeElements = document.querySelectorAll('.fade-in-item');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // Элемент появляется, когда он входит в видимую область
            if (elementTop < windowHeight - 100 && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    }
    
    // Проверяем при загрузке страницы
    checkFade();
    
    // Проверяем при скролле
    window.addEventListener('scroll', checkFade);
    
    // ===== СКРЫВАЮЩЕЕСЯ МЕНЮ ПРИ СКРОЛЛЕ =====
    let lastScrollTop = 0;
    const header = document.querySelector('.header-conteiner');
    
    if (header) {
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Скролл вниз и не у самого верха
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.classList.add('header-hidden');
            } 
            // Скролл вверх
            else if (scrollTop < lastScrollTop) {
                header.classList.remove('header-hidden');
            }
            
            lastScrollTop = scrollTop;
        });
        
        // Показываем меню при наведении в верхнюю часть экрана
        document.addEventListener('mousemove', function(e) {
            if (e.clientY < 80) {
                header.classList.remove('header-hidden');
            }
        });
        
        // Для мобильных устройств - показываем при касании верхней части
        let touchStartY = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchmove', function(e) {
            if (!touchStartY) return;
            
            let touchY = e.touches[0].clientY;
            let deltaY = touchY - touchStartY;
            
            // Если свайп вниз и начинается от верхнего края
            if (deltaY > 30 && touchStartY < 80) {
                header.classList.remove('header-hidden');
            }
        });
    }
});
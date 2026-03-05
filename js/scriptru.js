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
                this.textContent = 'читать больше';
            } else {
                moreText.classList.add('show');
                this.textContent = 'скрыть';
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
    const scrollThreshold = 10;
    
    if (header) {
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Определяем направление скролла
            if (Math.abs(lastScrollTop - scrollTop) <= scrollThreshold) return;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Скролл вниз - скрываем меню
                header.classList.add('header-hidden');
            } else {
                // Скролл вверх - показываем меню
                header.classList.remove('header-hidden');
            }
            
            lastScrollTop = scrollTop;
        });
        
        // Показываем меню при наведении курсора в верхнюю часть экрана
        document.addEventListener('mousemove', function(e) {
            if (e.clientY < 100) {
                header.classList.remove('header-hidden');
            }
        });
        
        // Для мобильных устройств - показываем при свайпе вниз
        let touchStartY = 0;
        let touchStartX = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
        });
        
        document.addEventListener('touchmove', function(e) {
            if (!touchStartY) return;
            
            let touchY = e.touches[0].clientY;
            let touchX = e.touches[0].clientX;
            let deltaY = touchY - touchStartY;
            let deltaX = Math.abs(touchX - touchStartX);
            
            // Если свайп вниз (deltaY > 0) и это больше вертикальное движение, чем горизонтальное
            if (deltaY > 50 && deltaX < 50 && touchStartY < 100) {
                header.classList.remove('header-hidden');
                touchStartY = 0; // Сбрасываем, чтобы не срабатывало много раз
            }
        });
        
        document.addEventListener('touchend', function() {
            touchStartY = 0;
        });
    }
});
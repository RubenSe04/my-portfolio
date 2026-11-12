document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MODAL & AUTO-SLIDESHOW DI DALAM MODAL ---
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const closeButtons = document.querySelectorAll('.modal-close');
    const modals = document.querySelectorAll('.modal');
    
    let autoSlideIntervals = {}; 

    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; 
            startAutoSlide(modal);
        }
    };

    const closeModal = (modal) => {
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = 'auto'; 
            stopAutoSlide(modal.id);
        }
    };

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetModalId = trigger.getAttribute('data-target');
            openModal(targetModalId);
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeModal(button.closest('.modal'));
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) closeModal(activeModal);
        }
    });

    // Inisialisasi properti Carousel Modal
    const carousels = document.querySelectorAll('.modal-carousel');
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = track.querySelectorAll('.slide');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        
        carousel.dataset.currentIndex = 0;

        if (slides.length <= 1) {
            if(prevBtn) prevBtn.style.display = 'none';
            if(nextBtn) nextBtn.style.display = 'none';
            return; 
        }

        const updateSlide = (index) => {
            slides.forEach((slide, i) => {
                if (i === index) slide.classList.add('active');
                else slide.classList.remove('active');
            });
        };

        if(nextBtn) {
            nextBtn.addEventListener('click', () => {
                let currentIndex = parseInt(carousel.dataset.currentIndex);
                currentIndex = (currentIndex + 1) % slides.length;
                carousel.dataset.currentIndex = currentIndex;
                updateSlide(currentIndex);
                resetAutoSlide(carousel.closest('.modal'));
            });
        }

        if(prevBtn) {
            prevBtn.addEventListener('click', () => {
                let currentIndex = parseInt(carousel.dataset.currentIndex);
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                carousel.dataset.currentIndex = currentIndex;
                updateSlide(currentIndex);
                resetAutoSlide(carousel.closest('.modal'));
            });
        }
    });

    function startAutoSlide(modal) {
        const carousel = modal.querySelector('.modal-carousel');
        if (!carousel) return;
        const slides = carousel.querySelectorAll('.slide');
        if (slides.length <= 1) return; 

        const nextBtn = carousel.querySelector('.next');
        autoSlideIntervals[modal.id] = setInterval(() => {
            if(nextBtn) nextBtn.click(); 
        }, 2500); 
    }

    function stopAutoSlide(modalId) {
        if (autoSlideIntervals[modalId]) {
            clearInterval(autoSlideIntervals[modalId]);
            delete autoSlideIntervals[modalId];
        }
    }

    function resetAutoSlide(modal) {
        stopAutoSlide(modal.id);
        startAutoSlide(modal);
    }

    // --- 2. THUMBNAIL AUTO-SLIDESHOW (DI HALAMAN UTAMA) ---
    const thumbnailCarousels = document.querySelectorAll('.thumbnail-carousel');
    
    thumbnailCarousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.thumb-slide');
        if (slides.length <= 1) return;
        
        let currentIndex = 0;
        setInterval(() => {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add('active');
        }, 3000); 
    });

});
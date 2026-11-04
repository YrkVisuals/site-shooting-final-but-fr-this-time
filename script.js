document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.gallery-carousel');

    carousels.forEach((carousel) => {
        const slides = [...carousel.querySelectorAll('.carousel-slide')];
        const dots = [...carousel.querySelectorAll('.dot')];
        const prevButton = carousel.querySelector('.carousel-btn.prev');
        const nextButton = carousel.querySelector('.carousel-btn.next');

        if (!slides.length) return;

        let currentIndex = 0;
        let autoPlayId;

        const showSlide = (index) => {
            currentIndex = (index + slides.length) % slides.length;

            slides.forEach((slide, idx) => {
                slide.classList.toggle('is-active', idx === currentIndex);
            });

            dots.forEach((dot, idx) => {
                dot.classList.toggle('is-active', idx === currentIndex);
            });
        };

        const startAutoPlay = () => {
            clearInterval(autoPlayId);
            autoPlayId = setInterval(() => {
                showSlide(currentIndex + 1);
            }, 3500);
        };

        prevButton?.addEventListener('click', () => {
            showSlide(currentIndex - 1);
            startAutoPlay();
        });

        nextButton?.addEventListener('click', () => {
            showSlide(currentIndex + 1);
            startAutoPlay();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                startAutoPlay();
            });
        });

        carousel.addEventListener('mouseenter', () => clearInterval(autoPlayId));
        carousel.addEventListener('mouseleave', startAutoPlay);

        showSlide(0);
        startAutoPlay();
    });
});

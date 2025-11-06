const menuBtn=document.querySelector('.menu-toggle');
const navDiv=document.querySelector('.main-nav');


    menuBtn.addEventListener('click',()=>{
        menuBtn.classList.toggle('openClose');

        
    })
    
    
    
    
    
    
    document.addEventListener('DOMContentLoaded', () => {
    // 1. Select all necessary elements
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nav = document.querySelector('.carousel-nav');
    const indicators = Array.from(nav.children);

    // Ensure we have slides before proceeding
    if (slides.length === 0) return; 

    // Get the width of a single slide (1200px in this case)
    const slideWidth = slides[0].getBoundingClientRect().width;

    let currentSlideIndex = 0;

    // 2. Arrange slides next to each other
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    // 3. Helper function to move the carousel
    const moveToSlide = (targetIndex) => {
        // Calculate the amount to transform the track
        const amountToMove = targetIndex * slideWidth;
        
        // Apply the smooth transition set in CSS
        track.style.transform = `translateX(-${amountToMove}px)`;
        
        // Update the current index
        currentSlideIndex = targetIndex;
    };

    // 4. Helper function to update indicators
    const updateIndicators = (targetIndex) => {
        indicators.forEach(indicator => indicator.classList.remove('current'));
        indicators[targetIndex].classList.add('current');
    };

    // 5. Next button click listener
    nextButton.addEventListener('click', () => {
        let nextIndex = currentSlideIndex + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0; // Loop back to the first slide
        }
        moveToSlide(nextIndex);
        updateIndicators(nextIndex);
    });

    // 6. Previous button click listener
    prevButton.addEventListener('click', () => {
        let prevIndex = currentSlideIndex - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1; // Loop back to the last slide
        }
        moveToSlide(prevIndex);
        updateIndicators(prevIndex);
    });

    // 7. Indicator click listener
    nav.addEventListener('click', e => {
        const targetIndicator = e.target.closest('.carousel-indicator');

        if (!targetIndicator) return; // Exit if not clicking an indicator

        const targetIndex = parseInt(targetIndicator.dataset.slideIndex);

        moveToSlide(targetIndex);
        updateIndicators(targetIndex);
    });

    // **BONUS:** Auto-play feature
    const autoPlay = () => {
        let nextIndex = (currentSlideIndex + 1) % slides.length;
        moveToSlide(nextIndex);
        updateIndicators(nextIndex);
    };

    let interval = setInterval(autoPlay, 5000); // Change slide every 5 seconds (5000ms)

    // Pause auto-play on hover
    const container = document.querySelector('.carousel-container');
    container.addEventListener('mouseenter', () => clearInterval(interval));
    container.addEventListener('mouseleave', () => {
        interval = setInterval(autoPlay, 5000);
    });
});
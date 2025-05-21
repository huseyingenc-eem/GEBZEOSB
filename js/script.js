document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("slider");
    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");
    const sliderDotsContainer = document.getElementById("slider-dots");

    // Temel slider elemanlarının varlığını kontrol et
    if (!slider || !nextBtn || !prevBtn || !sliderDotsContainer) {
        console.warn("Slider elemanlarından biri veya birkaçı bulunamadı. Slider başlatılmayacak.");
        return;
    }

    const slides = slider.children;
    const totalSlides = slides.length;
    let currentSlide = 0; // Slider'ın mevcut durumunu takip etmek için

    if (totalSlides === 0) {
        // console.warn("Slider içinde hiç slayt bulunamadı.");
        return;
    }

    const dots = sliderDotsContainer.querySelectorAll(".dot");

    function updateSlide() {
        // slider'ın genişliği HTML'de w-[100%] olarak ayarlanmış.
        // Her bir resim de w-full. Flex container (#slider) içindeki resimler
        // flex-shrink-0 olduğu için küçülmeyecek ve #slider'ın içeriği taşacaktır.
        // translateX(-${currentSlide * 100}%) ifadesi, #slider elementini
        // kendi genişliğinin %100'ü kadar kaydırır. Bu mantık doğrudur.
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;

        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.classList.remove("bg-indigo-600");
                dot.classList.add("bg-gray-300");
                if (index === currentSlide) {
                    dot.classList.remove("bg-gray-300");
                    dot.classList.add("bg-indigo-600");
                }
            });
        }
    }

    nextBtn.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlide();
    });

    prevBtn.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlide();
    });

    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                currentSlide = index;
                updateSlide();
            });
        });
    }

    
    // Sayfa yüklendiğinde ilk slaytı ve doğru noktayı göster
    updateSlide();
});


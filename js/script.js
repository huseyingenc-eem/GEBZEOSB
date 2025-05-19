document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("mobile-menu-button");
  const menu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("overlay");

  if (button && menu && overlay) {
    button.addEventListener("click", () => {
      const isOpen = !menu.classList.contains("hidden");

      if (!isOpen) {
        menu.classList.remove("hidden", "opacity-0", "scale-95");
        menu.classList.add("opacity-100", "scale-100");
        overlay.classList.remove("hidden");
      } else {
        menu.classList.add("opacity-0", "scale-95");
        menu.classList.remove("opacity-100", "scale-100");
        setTimeout(() => {
          menu.classList.add("hidden");
          overlay.classList.add("hidden");
        }, 300);
      }
    });

    overlay.addEventListener("click", () => {
      menu.classList.add("opacity-0", "scale-95");
      menu.classList.remove("opacity-100", "scale-100");
      setTimeout(() => {
        menu.classList.add("hidden");
        overlay.classList.add("hidden");
      }, 300);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        menu.classList.add("hidden");
        overlay.classList.add("hidden");
        menu.classList.remove("opacity-100", "scale-100");
        menu.classList.add("opacity-0", "scale-95");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const logoLink = document.getElementById("logo-link");

  if (logoLink) {
    logoLink.addEventListener("click", (e) => {
      const currentPath = window.location.pathname;

      if (currentPath === "/" || currentPath === "/index.html") {
        e.preventDefault();
        console.log("Zaten anasayfadasın, yönlendirme yapılmadı.");
      }
    });
  }
});

let currentSlide = 0;

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  let currentSlide = 0;
  const totalSlides = slider.children.length;

  function updateSlide() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
  });

  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlide();
  });
});





document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  const totalSlides = slider.children.length;

  function updateSlide() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;

    const dots = document.querySelectorAll("#slider-dots .dot");
    dots.forEach((dot, index) => {
      dot.classList.remove("bg-indigo-600");
      dot.classList.add("bg-gray-300");
      if (index === currentSlide) {
        dot.classList.remove("bg-gray-300");
        dot.classList.add("bg-indigo-600");
      }
    });
  }



 // Tıklanabilir DOT'lar
  document.querySelectorAll("#slider-dots .dot").forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlide();
    });
  });

  nextBtn?.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
  });

  prevBtn?.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlide();
  });

  // Sayfa yüklenince ilk slaytı göster
  updateSlide();
});
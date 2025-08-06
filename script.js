document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Functionality
  function handleMobileMenu() {
    const hamburger = document.querySelector(".hamburger-menu")
    const navLinks = document.querySelector(".nav-links")
    const body = document.body

    if (hamburger && navLinks) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("is-active")
        navLinks.classList.toggle("nav-active")
        body.classList.toggle("no-scroll")
      })

      // Add event listener to all links within the nav menu
      navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          if (hamburger.classList.contains("is-active")) {
            hamburger.classList.remove("is-active")
            navLinks.classList.remove("nav-active")
            body.classList.remove("no-scroll")
          }
        })
      })
    }
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const startPosition = window.pageYOffset;
        const targetPosition = targetId === 'home' ? 0 : targetElement.offsetTop - 80;
        const distance = targetPosition - startPosition;
        const duration = 1500;
        let startTime = null;

        function animation(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          
          // Ease-out animation curve
          const easeOut = 1 - Math.pow(1 - progress, 3);
          
          window.scrollTo(0, startPosition + (distance * easeOut));
          
          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        }
        
        requestAnimationFrame(animation);
      }
    });
  });

  // Popup book effect on scroll
  function handlePopupEffects() {
    const popupSections = document.querySelectorAll('.popup-content');
    
    popupSections.forEach(popup => {
      const rect = popup.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
      
      if (isVisible) {
        popup.classList.add('popup-active');
      } else {
        popup.classList.remove('popup-active');
      }
    });
  }

  // Fade in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = '0.2s';
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // Parallax effect for the homepage hero section
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    handlePopupEffects();
  }

  // Add scroll event listeners
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial calls
  handleMobileMenu();
  handlePopupEffects();
});

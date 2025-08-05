document.addEventListener("DOMContentLoaded", () => {
  // This script handles animations that are used across the site.

  // Function for the "popup book" effect on scroll
  function handlePopupEffects() {
    const popupSections = document.querySelectorAll(".popup-content")
    if (!popupSections.length) return

    popupSections.forEach((popup) => {
      const rect = popup.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0

      if (isVisible) {
        popup.classList.add("popup-active")
      } else {
        // Optional: remove class if you want the effect to reverse on scroll up
        // popup.classList.remove('popup-active');
      }
    })
  }

  // Function for the general fade-in animation on scroll
  function handleFadeIn() {
    const fadeInElements = document.querySelectorAll(".fade-in")
    if (!fadeInElements.length) return

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = "0.2s"
          entry.target.classList.add("fade-in")
          observer.unobserve(entry.target) // Stop observing once animated
        }
      })
    }, observerOptions)

    fadeInElements.forEach((el) => {
      observer.observe(el)
    })
  }

  // Parallax effect for the homepage hero section
  function handleParallax() {
    const hero = document.querySelector(".hero")
    if (hero) {
      // Only run this on the homepage
      const scrolled = window.pageYOffset
      hero.style.backgroundPosition = `center ${scrolled * 0.5}px`
    }
  }

  // Custom smooth scroll function with slower speed (4% slower than default)
  function smoothScrollTo(targetElement, duration = 1040) {
    // 1000ms * 1.04 = 1040ms (4% slower)
    const targetPosition = targetElement.offsetTop
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    let startTime = null

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const run = ease(timeElapsed, startPosition, distance, duration)
      window.scrollTo(0, run)
      if (timeElapsed < duration) requestAnimationFrame(animation)
    }

    // Easing function for smooth animation
    function ease(t, b, c, d) {
      t /= d / 2
      if (t < 1) return (c / 2) * t * t + b
      t--
      return (-c / 2) * (t * (t - 2) - 1) + b
    }

    requestAnimationFrame(animation)
  }

  // Smooth scroll for navigation links and scroll-down indicator
  function handleSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]')

    scrollLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          smoothScrollTo(targetElement)
        }
      })
    })
  }

  // Initial calls
  handlePopupEffects()
  handleFadeIn()
  handleParallax()
  handleSmoothScroll()

  // Add scroll event listener
  window.addEventListener("scroll", () => {
    handlePopupEffects()
    handleParallax()
  })
})

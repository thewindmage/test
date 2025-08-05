document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Functionality
  function handleMobileMenu() {
    const hamburger = document.querySelector(".hamburger-menu")
    const navLinks = document.querySelector(".nav-links")
    const links = document.querySelectorAll(".nav-links li a")

    if (hamburger && navLinks) {
      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("is-active")
        hamburger.classList.toggle("is-active")
        // Toggle ARIA attribute for accessibility
        const isActive = navLinks.classList.contains("is-active")
        hamburger.setAttribute("aria-expanded", isActive)
      })

      // Close menu when a link is clicked
      links.forEach((link) => {
        link.addEventListener("click", () => {
          if (navLinks.classList.contains("is-active")) {
            navLinks.classList.remove("is-active")
            hamburger.classList.remove("is-active")
            hamburger.setAttribute("aria-expanded", "false")
          }
        })
      })
    }
  }

  // Function for the "popup book" effect on scroll
  function handlePopupEffects() {
    const popupSections = document.querySelectorAll(".popup-content")
    if (!popupSections.length) return

    popupSections.forEach((popup) => {
      const rect = popup.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0

      if (isVisible) {
        popup.classList.add("popup-active")
      }
    })
  }

  // Parallax effect for the homepage hero section
  function handleParallax() {
    const hero = document.querySelector(".hero")
    if (hero) {
      const scrolled = window.pageYOffset
      hero.style.backgroundPosition = `center ${scrolled * 0.5}px`
    }
  }

  // Custom smooth scroll function
  function smoothScrollTo(targetElement, duration = 1040) {
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

    function ease(t, b, c, d) {
      t /= d / 2
      if (t < 1) return (c / 2) * t * t + b
      t--
      return (-c / 2) * (t * (t - 2) - 1) + b
    }

    requestAnimationFrame(animation)
  }

  // Smooth scroll for navigation links
  function handleSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]')

    scrollLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href")
        // Only prevent default for on-page links
        if (targetId.startsWith("#")) {
          e.preventDefault()
          const targetElement = document.querySelector(targetId)
          if (targetElement) {
            smoothScrollTo(targetElement)
          }
        }
      })
    })
  }

  // Initial calls
  handleMobileMenu()
  handlePopupEffects()
  handleParallax()
  handleSmoothScroll()

  // Add scroll event listener
  window.addEventListener("scroll", () => {
    handlePopupEffects()
    handleParallax()
  })
})

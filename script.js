document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Functionality
  function handleMobileMenu() {
    const hamburger = document.querySelector(".hamburger-menu")
    const navLinks = document.querySelector(".nav-links")
    const links = document.querySelectorAll(".nav-links li a")
    const body = document.body

    if (hamburger && navLinks) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("is-active")
        navLinks.classList.toggle("nav-active")
        body.classList.toggle("no-scroll")
      })

      links.forEach((link) => {
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

  // Function for the "popup book" effect on scroll
  function handlePopupEffects() {
    const popupSections = document.querySelectorAll(".popup-content")
    if (!popupSections.length) return

    const triggerBottom = window.innerHeight * 0.8

    popupSections.forEach((popup) => {
      const popupTop = popup.getBoundingClientRect().top
      if (popupTop < triggerBottom) {
        popup.classList.add("popup-active")
      }
    })
  }

  // Parallax effect for the homepage hero section
  function handleParallax() {
    const hero = document.querySelector(".hero")
    if (hero) {
      const scrolled = window.pageYOffset
      // Use a smaller multiplier for a more subtle effect that works on all screen sizes
      hero.style.backgroundPositionY = `${scrolled * 0.3}px`
    }
  }

  // Smooth scroll for navigation links
  function handleSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href")
        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)

        // Ensure it's a local anchor link on the same page
        if (href.startsWith("#") && targetElement) {
          e.preventDefault()

          const start = window.pageYOffset
          const end = targetElement.getBoundingClientRect().top
          const duration = 1200 // ms
          let startTime = null

          function animation(currentTime) {
            if (startTime === null) startTime = currentTime
            const timeElapsed = currentTime - startTime
            const progress = Math.min(timeElapsed / duration, 1)

            // Ease-out quint function
            const ease = 1 - Math.pow(1 - progress, 5)

            window.scrollTo(0, start + end * ease)

            if (timeElapsed < duration) {
              requestAnimationFrame(animation)
            }
          }
          requestAnimationFrame(animation)
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

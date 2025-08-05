document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Functionality
  function handleMobileMenu() {
    const hamburger = document.querySelector(".hamburger-menu")
    const navLinks = document.querySelector(".nav-links")
    const links = document.querySelectorAll(".nav-links li a")

    if (hamburger && navLinks) {
      // This is a placeholder for full functionality
      // For now, we'll just log to console
      hamburger.addEventListener("click", () => {
        console.log("Hamburger menu clicked")
        // A full implementation would toggle an 'is-active' class here
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
      hero.style.transform = `translateY(${scrolled * 0.3}px)`
    }
  }

  // Smooth scroll for navigation links
  function handleSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href")
        // Ensure it's a local anchor link on the same page
        if (href.startsWith("#") && document.getElementById(href.substring(1))) {
          e.preventDefault()
          document.querySelector(href).scrollIntoView({
            behavior: "smooth",
          })
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

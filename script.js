document.addEventListener("DOMContentLoaded", function () {
  // Mobile navigation
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".desktop-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      nav.classList.toggle("mobile-visible");

      if (nav.classList.contains("mobile-visible")) {
        nav.style.display = "flex";
        nav.style.position = "absolute";
        nav.style.top = "68px";
        nav.style.left = "0";
        nav.style.right = "0";
        nav.style.flexDirection = "column";
        nav.style.gap = "20px";
        nav.style.padding = "25px 7%";
        nav.style.background = "#f5f4ef";
        nav.style.borderBottom = "1px solid #d8d7d1";
      } else {
        nav.removeAttribute("style");
      }
    });
  }

  // Collections: search + category filter
  const searchInput = document.getElementById("searchInput");
  const filterButtons = document.querySelectorAll(".filter-button");
  const products = document.querySelectorAll(".product");
  const resultCount = document.getElementById("resultCount");
  const noResults = document.getElementById("noResults");
  let selectedCategory = "all";

  function updateProducts() {
    if (!products.length) return;

    const searchText = searchInput ? searchInput.value.trim().toLowerCase() : "";
    let visibleCount = 0;

    products.forEach(function (product) {
      const name = product.dataset.name.toLowerCase();
      const category = product.dataset.category.toLowerCase();

      const matchesSearch = name.includes(searchText);
      const matchesCategory =
        selectedCategory === "all" || category === selectedCategory;

      if (matchesSearch && matchesCategory) {
        product.style.display = "";
        visibleCount++;
      } else {
        product.style.display = "none";
      }
    });

    if (resultCount) {
      resultCount.textContent =
        visibleCount + " product" + (visibleCount === 1 ? "" : "s");
    }

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? "block" : "none";
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", updateProducts);
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      filterButtons.forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");
      selectedCategory = button.dataset.filter;
      updateProducts();
    });
  });

  // Wishlist buttons
  document.querySelectorAll(".wish").forEach(function (button) {
    button.addEventListener("click", function () {
      button.classList.toggle("liked");
      button.textContent = button.classList.contains("liked") ? "♥" : "♡";
    });
  });

  // Contact form
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const message = document.getElementById("formMessage");
      message.textContent =
        "Thank you! Your message has been received. We'll get back to you soon.";

      contactForm.reset();
    });
  }

  // Newsletter
  const newsletterForm = document.getElementById("newsletterForm");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("newsletterEmail");
      const message = document.getElementById("newsletterMessage");

      message.textContent = "You're on the list. Welcome to Nostra!";
      email.value = "";
    });
  }
});

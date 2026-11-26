(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    root.setAttribute("data-theme", saved);
  }

  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    const syncIcon = () => {
      const isLight = root.getAttribute("data-theme") === "light";
      themeBtn.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
      themeBtn.innerHTML = isLight
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
    };
    syncIcon();
    themeBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      syncIcon();
    });
  }

  const menuBtn = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // Lightbox for gallery images
  const galleryImages = document.querySelectorAll(".gallery-item img");
  if (galleryImages.length > 0) {
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img alt="Preview">';
    document.body.appendChild(lb);

    const lbImg = lb.querySelector("img");
    const closeBtn = lb.querySelector(".lightbox-close");

    const close = () => lb.classList.remove("open");
    closeBtn.addEventListener("click", close);
    lb.addEventListener("click", (e) => {
      if (e.target === lb) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });

    galleryImages.forEach((img) => {
      img.addEventListener("click", () => {
        lbImg.src = img.src;
        lbImg.alt = img.alt || "Preview";
        lb.classList.add("open");
      });
    });
  }
})();

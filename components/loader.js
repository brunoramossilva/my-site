// Este script carrega dinamicamente o cabeçalho e o rodapé nas páginas HTML.
(() => {
  function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes("projetos.html")) return "projetos";
    if (path.includes("contato.html")) return "contato";
    return "index";
  }

  function getBaseUrl() {
    return window.location.pathname.includes("/pages/") ? "../" : "";
  }

  async function loadComponent(name, id) {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}components/${name}.html`);
    const html = await res.text();
    const target = document.getElementById(id);
    if (target) target.innerHTML = html.replace(/\{\{baseUrl\}\}/g, baseUrl);
    if (name === "header") markActivePage();
  }

  function markActivePage() {
    const current = getCurrentPage();
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("data-page") === current,
      );
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      loadComponent("header", "header-placeholder");
      loadComponent("footer", "footer-placeholder");
    });
  } else {
    loadComponent("header", "header-placeholder");
    loadComponent("footer", "footer-placeholder");
  }
})();

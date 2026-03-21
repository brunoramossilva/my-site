// Este script carrega dinamicamente o cabeçalho e o rodapé nas páginas HTML.
(() => {
  function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes("projetos.html")) return "projetos";
    if (path.includes("contato.html")) return "contato";
    return "index";
  }
  
  // Determina o caminho base para os componentes, dependendo se estamos em uma página dentro de "pages/" ou na raiz
  function getBaseUrl() {
    return window.location.pathname.includes("/pages/") ? "../" : "";
  }

  // Carrega o componente HTML e o insere no elemento alvo, substituindo {{baseUrl}} pelo caminho correto
  async function loadComponent(name, id) {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}components/${name}.html`);
    const html = await res.text();
    const target = document.getElementById(id);
    if (target) target.innerHTML = html.replace(/\{\{baseUrl\}\}/g, baseUrl);
    if (name === "header") markActivePage();
  }

  // Marca o link do menu correspondente à página atual como ativo
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

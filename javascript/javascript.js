/* =============================
   Menu lateral e preferências
   ============================= */

// Abre a sidebar (menu)
function openNav() {
  const sidebar = document.getElementById("mySidebar");
  const main = document.getElementById("main");
  if (sidebar) sidebar.style.left = "0";
  if (main) main.style.marginLeft = "250px";
}

// Fecha a sidebar (menu)
function closeNav() {
  const sidebar = document.getElementById("mySidebar");
  const main = document.getElementById("main");
  if (sidebar) sidebar.style.left = "-250px";
  if (main) main.style.marginLeft = "0";
}

// Troca a família de fontes do site
function mudarFonte(fonte) {
  const pagina = document.getElementById("pagina");
  if (pagina) pagina.style.fontFamily = fonte;
}

/* =============================
   Dados do carrossel
   =============================

   Observações:
   - "link" abre uma página ao clicar na imagem (ex.: jogo-abelha.html).
   - Sem "link", abre um pop-up com título, data e descrição.
*/

const imagens = [
  {
    src: "imagem/5.png",
    titulo: "Jogo Da Fazenda",
    data: "Ao longo do ano 2024",
    descricao: "Projeto desenvolvido na disciplina de Tópicos Especiais.",
    largura: "400px",
    altura: "auto"
  },
  {
    src: "imagem/6.png",
    titulo: "crime scene erasethecrime",
    data: "Maio de 2024",
    descricao: "Projeto desenvolvido na disciplina de Programação de Jogos 3D.",
    largura: "300px",
    altura: "auto"
  },
  {
    src: "imagem/7.png",
    titulo: "terra de sol e sangue",
    data: "Maio de 2025",
    descricao: "Projeto de conclusão de curso.",
    largura: "400px",
    altura: "auto"
  },
  {
    src: "imagem/8.png",
    titulo: "Nightmare Critters",
    data: "Março de 2025",
    descricao: "Projeto desenho de sprites.",
    largura: "50%",
    altura: "auto"
  },
  // >>> Item do jogo da abelha no portfólio (abre a página do jogo)
  {
    src: "imagem/youwin.png", // pode usar "imagem/start.png" como miniatura
    titulo: "Jogo da Abelha",
    data: "Novembro de 2025",
    descricao: "Mini-game em Canvas. Use A/D para mover, colete 10 flores.",
    largura: "400px",
    altura: "auto",
    link: "jogo.html"
  }
];

/* =============================
   Lógica do carrossel
   ============================= */

let indiceAtual = 0;
const imagensPorTela = 3;

// Renderiza as imagens do carrossel (se o carrossel existir na página)
function exibirImagens() {
  const container = document.getElementById("carrossel-imagens");
  if (!container) return; // Página sem carrossel (ex.: jogo-abelha.html)

  container.innerHTML = "";

  for (let i = 0; i < imagensPorTela; i++) {
    const index = (indiceAtual + i) % imagens.length;
    const imagemInfo = imagens[index];

    const wrapper = document.createElement("div");
    const img = document.createElement("img");
    const caption = document.createElement("small");

    img.src = imagemInfo.src;
    img.alt = imagemInfo.titulo;
    img.title = imagemInfo.descricao;

    // Clique: se houver "link", navega; senão, abre pop-up com info.
    img.onclick = function () {
      if (imagemInfo.link) {
        window.location.href = imagemInfo.link;
        return;
      }

      const popup = window.open(
        "",
        `popup${index}`,
        "width=850,height=700,resizable=yes,scrollbars=yes"
      );

      if (popup) {
        popup.document.write(`
          <html>
            <head>
              <title>${imagemInfo.titulo}</title>
              <meta charset="UTF-8" />
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                img { width: ${imagemInfo.largura}; height: ${imagemInfo.altura}; border-radius: 8px; display: block; margin-bottom: 15px; }
                h1 { margin-top: 0; }
                .info { margin-bottom: 10px; }
              </style>
            </head>
            <body>
              <h1>${imagemInfo.titulo}</h1>
              <div class="info"><strong>Data de criação:</strong> ${imagemInfo.data}</div>
              <img src="${imagemInfo.src}" alt="${imagemInfo.titulo}">
              <p><strong>Descrição:</strong> ${imagemInfo.descricao}</p>
            </body>
          </html>
        `);
        popup.document.close();
        popup.focus();
      } else {
        alert("Por favor, permita pop-ups para visualizar as informações.");
      }
    };

    caption.textContent = imagemInfo.titulo;
    caption.style.display = "block";
    caption.style.textAlign = "center";
    caption.style.marginTop = "6px";

    wrapper.appendChild(img);
    wrapper.appendChild(caption);
    container.appendChild(wrapper);
  }
}

// Avança ou retrocede o carrossel
function mudarImagens(direcao) {
  // Se a página não tiver carrossel, não faz nada
  if (!document.getElementById("carrossel-imagens")) return;

  // Gira páginas inteiras (em blocos de N imagens)
  indiceAtual = (indiceAtual + direcao * imagensPorTela + imagens.length) % imagens.length;
  exibirImagens();
}

/* =============================
   Inicialização segura
   ============================= */

document.addEventListener("DOMContentLoaded", () => {
  // Só tenta montar o carrossel se ele existir nesta página
  if (document.getElementById("carrossel-imagens")) {
    exibirImagens();
  }
});

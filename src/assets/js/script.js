
  
  // ==================== 1. INICIALIZAÇÃO DO MAPA ====================

const map = L.map('map', {

// Centraliza o mapa no meio do planeta //
  center: [0, 0],
   
  //  Zoom inicial
     zoom: 2, 
    
   // Impede de afastar demais
    minZoom: 1.5, 

    // Impede de aproximar muito 
     maxZoom: 10,

      // Sem a repetição lateral do mapa, no caso do mundo
     worldCopyJump: true,
    
      // Limita movimento do mapa
      maxBounds: [[-85, -240], [85, 240]],
     
       // Faz o mapa "bater" nos limites suavemente 
       maxBoundsViscosity: 1.0
      
       
      });

  // Tile Layer (fundo do mapa) ou a parte dos países e continentes
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    noWrap: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

// ==================== 2. DEFINIÇÃO DOS ÍCONES ====================

  const IconeBase = L.Icon.extend({
  options: {

    iconSize:     [40, 40], // TAMANHO DO ÍCONE: [Largura, Altura]


  
  }
});




const icones = {

  recife:    new IconeBase({ iconUrl: 'src/assets/icons/corais-logo.png' }),
  fossa:     new IconeBase({ iconUrl: 'src/assets/icons/fossas-icon.png' }),
  poluicao:  new IconeBase({ iconUrl: 'src/assets/icons/poluição-icon.png' }),
  polar:     new IconeBase({ iconUrl: 'src/assets/icons/zona-polar-icon.png' }),
  vida:      new IconeBase({ iconUrl: 'src/assets/icons/vida-ameaçada-icon.png' }),
  santuario: new IconeBase({ iconUrl: 'src/assets/icons/santuário-icon.png' }),
  vulcao:    new IconeBase({ iconUrl: 'src/assets/icons/vulcões-icon.png'})
};

// ==================== 3. DADOS E CRIAÇÃO DOS MARCADORES ====================

// Links para os offcanvas correspondentes
const locais = [
  // 🌊🏵️ Recifes
  { nome: "Grande Barreira de Coral", tipo: "recife", lat: -18.2871, lon: 147.6992, painel: "info-coral" },
  { nome: "Recife de Raja Ampat", tipo: "recife", lat: -0.2346, lon: 130.5069, painel: "info-raja" },
  { nome: "Recife de Belize", tipo: "recife", lat: 17.3153, lon: -87.5345, painel: "info-belize" },

  // 🕳️ Fossas
  { nome: "Fossa das Marianas", tipo: "fossa", lat: 11.35, lon: 142.2, painel: "info-marianas" },
  { nome: "Fossa de Tonga", tipo: "fossa", lat: -23.6, lon: -174.9, painel: "info-tonga" },
  { nome: "Fossa de Porto Rico", tipo: "fossa", lat: 19.75, lon: -66.5, painel: "info-prico" },

  // 🧴 Poluição
  { nome: "Ilha de Midway", tipo: "poluicao", lat: 28.2072, lon: -177.3735, painel: "info-midway" },
  { nome: "Grande Mancha de Lixo do Pacífico", tipo: "poluicao", lat: 32.0, lon: -137.0, painel: "info-lixo" },
  { nome: "Baía de Jacarta", tipo: "poluicao", lat: -6.118, lon: 106.846, painel: "info-jacarta" },

  // ❄️ Zonas Polares
  { nome: "Mar de Weddell", tipo: "polar", lat: -73.0, lon: -45.0, painel: "info-weddell" },
  { nome: "Groenlândia (costa leste)", tipo: "polar", lat: 72.0, lon: -24.0, painel: "info-groenlandia" },
  { nome: "Mar de Beaufort", tipo: "polar", lat: 71.0, lon: -150.0, painel: "info-beaufort" },

  // 🐢 Vida Ameaçada
  { nome: "Ilhas Galápagos", tipo: "vida", lat: -0.9538, lon: -90.9656, painel: "info-galapagos" },
  { nome: "Recife de Apo", tipo: "vida", lat: 9.067, lon: 123.271, painel: "info-apo" },
  { nome: "Costa do Quênia", tipo: "vida", lat: -3.33, lon: 39.57, painel: "info-quenia" },

  // 🕊️ Santuários Marinhos
  { nome: "Monumento Nacional Papahānaumokuākea", tipo: "santuario", lat: 25.0, lon: -170.0, painel: "info-papahanaumokuakea" },
  { nome: "Ilhas Phoenix (Kiribati)", tipo: "santuario", lat: -3.7, lon: -172.0, painel: "info-phoenix" },
  { nome: "Santuário de Fernando de Noronha", tipo: "santuario", lat: -3.85, lon: -32.42, painel: "info-noronha" },

  // 🌋 Vulcões Submarinos
  { nome: "Monte Submarino Loihi", tipo: "vulcao", lat: 18.92, lon: -155.27, painel: "info-loihi" },
  { nome: "Axial Seamount", tipo: "vulcao", lat: 45.95, lon: -130.01, painel: "info-axial" },
  { nome: "Kick’em Jenny", tipo: "vulcao", lat: 12.3, lon: -61.64, painel: "info-jenny" },
];

// "Caixa" (array) para guardar todos os marcadores.
 const todosOsMarcadores = [];

locais.forEach(local => {
    // CORREÇÃO: Adicionamos a propriedade 'tipo' para que o filtro saiba o que é cada marcador.
    const marcador = L.marker([local.lat, local.lon], { 
      icon: icones[local.tipo],
      tipo: local.tipo 
    });
    
    marcador.bindPopup(`
      <b>${local.nome}</b><br>
      <button class="btn btn-sm btn-info mt-1 text-white fw-bolder" onclick="abrirPainel('${local.painel}')">Ver informações</button>
    `);

    marcador.on('click', function() {
      // 1. Abre o popup (balãozinho)
      this.openPopup(); 
      // 2. Anima o mapa para centralizar e dar zoom no local clicado
      map.flyTo([local.lat, local.lon], 4, {
        animate: true,
        duration: 1.5 // Duração da animação em segundos
      });
    });
    // ==========================================
    
    todosOsMarcadores.push(marcador);
    marcador.addTo(map);
  });

function abrirPainel(id) {
  const painel = new bootstrap.Offcanvas(`#${id}`);
  painel.show();
}



   // ==================== 4. LÓGICA DO FILTRO ====================
  const botoesFiltro = document.querySelectorAll('.filtro');

  botoesFiltro.forEach(botao => {
    botao.addEventListener('click', function() {
      const tipoSelecionado = this.getAttribute('data-tipo');
      
      todosOsMarcadores.forEach(marcador => {
        if (tipoSelecionado === 'todos' || marcador.options.tipo === tipoSelecionado) {
          marcador.addTo(map);
        } else {
          map.removeLayer(marcador);
        }
      });

      botoesFiltro.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });


// 1. ANIMAÇÃO DE APARECIMENTO (Scroll Reveal)
// Faz com que os elementos surjam suavemente conforme você desce a página
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100; // Ponto de gatilho
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal(); // Dispara ao carregar a página

// 2. EFEITO DE SOMBRA NO MENU AO ROLAR
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// 3. MAPA CORPORATIVO (Leaflet)
// Centralizado no Noroeste Paulista, estilo claro e legível.
var map = L.map('map', { scrollWheelZoom: false }).setView([-20.08, -50.45], 10);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; PrimeLogic', 
    maxZoom: 19
}).addTo(map);

// Pino Profissional Customizado
var cleanIcon = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:#1A365D; width:16px; height:16px; border-radius:50%; box-shadow: 0 4px 10px rgba(26,54,93,0.4); border: 2px solid white;'></div>",
    iconSize: [16, 16], 
    iconAnchor: [8, 8]
});

// Cidades da PrimeLogic
const cities = [
    { name: "Turmalina", coords: [-20.266, -50.478] },
    { name: "Dolcinópolis", coords: [-20.121, -50.513] },
    { name: "Mira Estrela", coords: [-19.982, -50.146] },
    { name: "Populina", coords: [-19.932, -50.627] },
    { name: "Pedranópolis", coords: [-20.244, -50.011] },
    { name: "Mesópolis", coords: [-19.957, -50.871] },
    { name: "Ouroeste", coords: [-20.000, -50.375] }
];

// Plota os pinos no mapa
cities.forEach(city => {
    L.marker(city.coords, {icon: cleanIcon}).addTo(map)
     .bindPopup(`<div style="text-align: center;"><strong style="color:#1A365D; font-size:15px; font-family:'Inter', sans-serif;">${city.name}</strong><br><span style="color:#475569; font-size:12px; font-family:'Inter', sans-serif;">Operação Ativa</span></div>`);
});

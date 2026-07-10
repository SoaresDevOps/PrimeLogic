/* ==========================================================================
   PRIMELOGIC — app.js
   ========================================================================== */

(function () {
  'use strict';

  /* ---- HUD live clock ---------------------------------------------------- */
  var clockEl = document.getElementById('hud-clock');

  function tickClock() {
    if (!clockEl) return;
    var now = new Date();
    var hh = String(now.getHours()).padStart(2, '0');
    var mm = String(now.getMinutes()).padStart(2, '0');
    var ss = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = hh + ':' + mm + ':' + ss;
  }
  tickClock();
  setInterval(tickClock, 1000);

  /* ---- Mobile navigation --------------------------------------------------
     The nav list is hidden below 980px behind a toggle. When open, it is
     rendered as a fixed dropdown panel anchored under the header.
  ------------------------------------------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('nav--open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav--open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- 3D tilt interaction for product cards ------------------------------
     Sharp, precise rotation driven by pointer position — no bounce, no
     overshoot. Falls back to no movement for touch / reduced motion.
  ------------------------------------------------------------------------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var MAX_TILT = 6; // degrees

  if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.tilt').forEach(function (card) {
      var inner = card.querySelector('.product-card__inner');
      if (!inner) return;

      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width;  // 0..1
        var py = (e.clientY - rect.top) / rect.height;  // 0..1

        var rotateY = (px - 0.5) * (MAX_TILT * 2);
        var rotateX = (0.5 - py) * (MAX_TILT * 2);

        inner.style.transform =
          'rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateZ(0)';
      });

      card.addEventListener('mouseleave', function () {
        inner.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
      });
    });
  }

  /* ---- Leaflet map: Cobertura Regional (Noroeste Paulista) --------------- */
  var mapEl = document.getElementById('map');

  if (mapEl && window.L) {
    var CENTER = [-20.42, -50.20]; // Noroeste Paulista, entre Rio Preto e Populina
    var map = L.map('map', {
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: true
    }).setView(CENTER, 8);

    // Clean, muted basemap that reads as "corporate diagnostic" rather than
    // a consumer travel map — desaturated CARTO tiles.
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    var signalColor = '#3D7BFF';

    var cities = [
      { name: 'São José do Rio Preto', coords: [-20.8113, -49.3758], hub: true },
      { name: 'Populina',              coords: [-20.4239, -50.5372], hub: true },
      { name: 'Jales',                 coords: [-20.2697, -50.5486] },
      { name: 'Fernandópolis',         coords: [-20.2836, -50.2467] },
      { name: 'Votuporanga',           coords: [-20.4237, -49.9756] },
      { name: 'Mirassol',              coords: [-20.8194, -49.5222] },
      { name: 'General Salgado',       coords: [-20.6503, -50.3708] },
      { name: 'Nova Canaã Paulista',   coords: [-20.3689, -50.3111] }
    ];

    cities.forEach(function (city) {
      var marker = L.circleMarker(city.coords, {
        radius: city.hub ? 8 : 5,
        color: signalColor,
        weight: city.hub ? 2 : 1,
        fillColor: signalColor,
        fillOpacity: city.hub ? 0.85 : 0.5
      }).addTo(map);

      marker.bindPopup('<strong>' + city.name + '</strong>' + (city.hub ? '<br>Base de operação' : '<br>Cobertura ativa'));
    });

    // Coverage radius around the operational hub, corporate "range ring" feel.
    L.circle(CENTER, {
      radius: 90000,
      color: signalColor,
      weight: 1,
      fillColor: signalColor,
      fillOpacity: 0.06,
      dashArray: '4 6'
    }).addTo(map);
  }
})();

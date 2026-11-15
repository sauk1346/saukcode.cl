// Piel saukcode para las páginas independientes de TI3V61 (laboratorio y banco
// de preguntas). No modifica su contenido ni su lógica:
//  1) sigue el tema elegido en saukcode y agrega la cabecera del sitio;
//  2) laboratorio: un módulo por página (portada + 19 módulos), con anterior/siguiente;
//  3) banco de preguntas: un tema por página, con anterior/siguiente.
(function () {
  var root = document.documentElement;
  var PAGE = (document.currentScript && document.currentScript.dataset.page) || 'lab';
  root.classList.add('sk-' + PAGE);
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);
  } catch (e) {}
  // Evita el parpadeo de la portada cuando se entra directo a un módulo
  if (PAGE === 'lab') root.classList.toggle('sk-mod', location.hash.length > 1);

  // El laboratorio se inicializa en DOMContentLoaded; esto corre justo después
  document.addEventListener('DOMContentLoaded', function () { setTimeout(setup, 0); });

  function setup() {
    var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
    var crumb = PAGE === 'banco' ? 'banco-preguntas' : 'laboratorio';

    // Cabecera de saukcode: misma estructura que src/components/layout/Navbar.astro
    var SUN = '<svg class="sk-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>';
    var MOON = '<svg class="sk-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    var LENS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>';
    var site = document.createElement('div');
    site.innerHTML =
      '<header class="sk-site"><nav class="sk-site-in">' +
        '<button class="sk-ibtn sk-menu-btn" type="button" aria-label="Abrir menú de navegación" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>' +
        '<a class="sk-logo" href="/">SAUK<span>CODE</span></a>' +
        '<ul class="sk-site-r">' +
          '<li class="sk-wide"><a class="sk-link" href="/#programacion">Programación</a></li>' +
          '<li><button class="sk-search-btn sk-open-search" type="button" aria-label="Buscar en el sitio">' + LENS + '<span class="sk-wide">Buscar</span></button></li>' +
          '<li><button class="sk-ibtn sk-theme" type="button" aria-label="Cambiar tema">' + SUN + MOON + '</button></li>' +
        '</ul></nav>' +
        '<div class="sk-menu" hidden><a href="/#programacion">Programación</a></div>' +
      '</header>' +
      '<div id="reading-progress" aria-hidden="true">' + new Array(21).join('<span></span>') + '</div>' +
      '<div id="reading-1up" aria-hidden="true">1UP</div>' +
      '<nav class="sk-crumb" aria-label="Breadcrumb"><ol>' +
        '<li><a href="/">inicio</a></li><li class="sep" aria-hidden="true">▸</li>' +
        '<li><a href="/inacap">inacap</a></li><li class="sep" aria-hidden="true">▸</li>' +
        '<li><a href="/inacap/ti3v61">ti3v61</a></li><li class="sep" aria-hidden="true">▸</li>' +
        '<li><span aria-current="page">' + crumb + '</span></li></ol></nav>' +
      '<dialog id="search-modal"><div class="sk-sm-h"><span class="sk-sm-t">BUSCAR</span><kbd>Ctrl K</kbd>' +
        '<button id="search-close" type="button" aria-label="Cerrar búsqueda">Esc ✕</button></div>' +
        '<div id="search-container"></div>' +
        '<p id="search-dev-note" hidden>El índice de búsqueda se genera con <code>npm run build</code>; no está disponible en el servidor de desarrollo.</p></dialog>';
    var wrap = document.querySelector('.wrap');
    while (site.firstChild) document.body.insertBefore(site.firstChild, wrap);

    // Tema: mismo comportamiento y misma clave que el sitio
    document.querySelector('.sk-theme').addEventListener('click', function () {
      var cur = root.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = cur === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next); // el laboratorio redibuja sus gráficos al cambiar este atributo
      try { localStorage.setItem('theme', next); } catch (e) {}
    });

    // Menú móvil
    var menuBtn = document.querySelector('.sk-menu-btn'), menu = document.querySelector('.sk-menu');
    menuBtn.addEventListener('click', function () { menu.hidden = !menu.hidden; menuBtn.setAttribute('aria-expanded', String(!menu.hidden)); });

    // Búsqueda del sitio (Pagefind), igual que SearchModal.astro
    (function () {
      var modal = document.getElementById('search-modal'), loaded = false;
      function focusInput() { var input = modal.querySelector('input'); if (input) { input.focus(); input.select(); } }
      function openSearch() {
        modal.showModal();
        if (loaded) { setTimeout(focusInput, 0); return; }
        loaded = true;
        var css = document.createElement('link'); css.rel = 'stylesheet'; css.href = '/pagefind/pagefind-ui.css'; document.head.appendChild(css);
        var sc = document.createElement('script'); sc.src = '/pagefind/pagefind-ui.js';
        sc.onload = function () {
          try {
            new window.PagefindUI({ element: '#search-container', showSubResults: true, showImages: false,
              translations: { placeholder: 'Buscar apuntes, ejercicios, ramos…', zero_results: 'Sin resultados para [SEARCH_TERM]' } });
            setTimeout(focusInput, 50);
          } catch (e) { document.getElementById('search-dev-note').hidden = false; }
        };
        sc.onerror = function () { document.getElementById('search-dev-note').hidden = false; };
        document.head.appendChild(sc);
      }
      document.querySelector('.sk-open-search').addEventListener('click', openSearch);
      document.getElementById('search-close').addEventListener('click', function () { modal.close(); });
      modal.addEventListener('click', function (e) { if (e.target === modal) modal.close(); });
      document.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); if (modal.open) modal.close(); else openSearch(); }
      });
    })();

    // Barra de energía de lectura (20 celdas) y 1UP, igual que LessonLayout.astro
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) { var blink = 0; setInterval(function () { blink = (blink + 1) % 4; root.dataset.blink = String(blink); }, 350); }
    var bar = document.getElementById('reading-progress'), cells = [].slice.call(bar.children), oneUp = document.getElementById('reading-1up'), armed = true;
    function progress() {
      var max = root.scrollHeight - window.innerHeight;
      var pr = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      var filled = Math.round(pr * 20);
      bar.classList.remove('tier-low', 'tier-mid', 'tier-high');
      bar.classList.add(filled >= 14 ? 'tier-high' : filled >= 7 ? 'tier-mid' : 'tier-low');
      cells.forEach(function (c, i) { c.classList.toggle('filled', i < filled); c.classList.toggle('tip', i === filled - 1 && filled < 20); });
      if (filled < 12) armed = true;
      if (filled === 20 && armed && getComputedStyle(bar).display !== 'none') {
        armed = false;
        if (!reduce) { oneUp.classList.remove('show'); void oneUp.offsetWidth; oneUp.classList.add('show'); }
      }
    }
    window.addEventListener('scroll', progress, { passive: true });
    window.addEventListener('resize', progress, { passive: true });

    var pagerLink = function (cls, href, text, prev) {
      var arrow = '<span aria-hidden="true">' + (prev ? '←' : '→') + '</span>';
      var t = '<span class="sk-pg-n">' + esc(text) + '</span>';
      return '<a class="btn ' + cls + '"' + (href ? ' href="' + href + '"' : ' role="button" tabindex="0"') + '>' + (prev ? arrow + t : t + arrow) + '</a>';
    };

    if (PAGE === 'banco') { bank(); progress(); return; }

    // ---------- Laboratorio: un módulo por página ----------
    var mods = [].slice.call(document.querySelectorAll('section.mod'));
    var toolbar = document.querySelector('.toolbar');
    var main = document.getElementById('main');
    var rail = document.getElementById('rail');
    if (!mods.length || !toolbar || !main) return;
    var num = function (m) { return String(m.dataset.num != null ? m.dataset.num : mods.indexOf(m)).padStart(2, '0'); };
    var label = function (m) { return num(m) + ' · ' + m.dataset.name; };

    // Barra: índice, anterior, módulo actual, siguiente
    var nav = document.createElement('div');
    nav.className = 'sk-nav';
    nav.innerHTML =
      '<a class="btn sk-home" href="#">Índice</a>' +
      '<a class="btn sk-prev" aria-label="Módulo anterior"><span aria-hidden="true">←</span><span class="sk-t"> Anterior</span></a>' +
      '<span class="sk-cur"><span class="sk-cur-l"></span><span class="sk-cur-s"></span></span>' +
      '<a class="btn sk-next" aria-label="Módulo siguiente"><span class="sk-t">Siguiente </span><span aria-hidden="true">→</span></a>';
    toolbar.insertBefore(nav, toolbar.firstChild);

    // Portada: índice de módulos por etapa (misma lista que el riel lateral)
    var toc = document.createElement('nav');
    toc.className = 'sk-toc';
    toc.setAttribute('aria-label', 'Índice de módulos');
    // Una tarjeta por etapa con sus módulos (reemplaza en la portada a la franja de etapas)
    var stages = [], st = null;
    if (rail) [].forEach.call(rail.children, function (el) {
      if (el.tagName === 'H4') { st = { name: el.textContent, mods: [] }; stages.push(st); }
      else if (el.tagName === 'A' && st) st.mods.push(document.getElementById(el.dataset.m));
    });
    toc.innerHTML = stages.map(function (g, i) {
      return '<section class="sk-stage"><header><span class="sk-st-k">Etapa ' + (i + 1) + '</span><span class="sk-st-n">' + esc(g.name) + '</span></header><ol>' +
        g.mods.map(function (m) { return '<li><a href="#' + m.id + '"><span class="no">' + num(m) + '</span><span>' + esc(m.dataset.name) + '</span></a></li>'; }).join('') +
        '</ol></section>';
    }).join('');
    main.insertBefore(toc, main.firstChild);

    // Anterior / siguiente al final de cada módulo
    mods.forEach(function (m, i) {
      var p = mods[i - 1], n = mods[i + 1];
      var pg = document.createElement('nav');
      pg.className = 'sk-pager';
      pg.setAttribute('aria-label', 'Módulo anterior y siguiente');
      pg.innerHTML =
        (p ? pagerLink('sk-pg-prev', '#' + p.id, label(p), true) : pagerLink('sk-pg-prev', '#', 'Índice', true)) +
        (n ? pagerLink('sk-pg-next', '#' + n.id, label(n), false) : pagerLink('sk-pg-next', '#', 'Índice', false));
      m.appendChild(pg);
    });

    var baseTitle = document.title;
    var setLink = function (a, m) {
      if (m) { a.setAttribute('href', '#' + m.id); a.removeAttribute('aria-disabled'); a.title = label(m); }
      else { a.removeAttribute('href'); a.setAttribute('aria-disabled', 'true'); a.title = ''; }
    };

    function current() {
      var id = '';
      try { id = decodeURIComponent(location.hash.slice(1)); } catch (e) {}
      var el = id && document.getElementById(id);
      var mod = el && el.closest('section.mod');
      return mod ? { mod: mod, el: el } : null;
    }

    function show() {
      var t = current();
      root.classList.toggle('sk-mod', !!t);
      mods.forEach(function (m) { m.classList.toggle('sk-on', !!t && m === t.mod); });
      var close = document.querySelector('#popRoot [data-close]');
      if (close) close.click();
      if (t) {
        var i = mods.indexOf(t.mod);
        setLink(nav.querySelector('.sk-prev'), mods[i - 1]);
        setLink(nav.querySelector('.sk-next'), mods[i + 1]);
        nav.querySelector('.sk-cur-l').textContent = 'Módulo ' + label(t.mod);
        nav.querySelector('.sk-cur-s').textContent = num(t.mod) + ' / ' + num(mods[mods.length - 1]);
        document.title = t.mod.dataset.name + ' · ' + baseTitle;
        if (rail) [].forEach.call(rail.querySelectorAll('a'), function (a) { a.classList.toggle('cur', a.dataset.m === t.mod.id); });
      } else {
        document.title = baseTitle;
      }
      // Los gráficos se dibujaron ocultos: se redibujan con su ancho real
      window.dispatchEvent(new Event('resize'));
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (t && t.el !== t.mod) setTimeout(function () { t.el.scrollIntoView({ behavior: 'instant', block: 'start' }); }, 140);
      setTimeout(hints, 200);
      armed = false; setTimeout(function () { progress(); armed = true; }, 250);
    }

    // Aviso de desplazamiento horizontal en tablas y bloques anchos
    function hints() {
      [].forEach.call(document.querySelectorAll('section.mod.sk-on .tw'), function (w) {
        if (!w.dataset.sk) { w.dataset.sk = 1; w.addEventListener('scroll', function () { mark(w); }, { passive: true }); }
        mark(w);
      });
    }
    function mark(w) { w.classList.toggle('sk-more', w.scrollWidth - w.clientWidth - w.scrollLeft > 4); }

    window.addEventListener('hashchange', show);
    window.addEventListener('resize', function () { setTimeout(hints, 150); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { window.dispatchEvent(new Event('resize')); });
    show();

    // ---------- Banco de preguntas: un tema por página ----------
    // Usa el filtro de temas del propio banco: solo pulsa sus botones.
    function bank() {
      var qMain = document.getElementById('qMain'), topicsBox = document.getElementById('qTopics');
      if (!qMain || !topicsBox) return;
      var topics = function () { return [].slice.call(topicsBox.querySelectorAll('button')); };
      // Primera visita: parte en el tema 1 en vez de las 182 preguntas juntas
      var first = false;
      try { first = localStorage.getItem('acrqa_topic') === null; } catch (e) {}
      if (first && topics()[1]) topics()[1].click();

      function go(btn) {
        btn.click();
        var top = document.querySelector('.qa-bar').getBoundingClientRect().top + window.scrollY - 76;
        window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
      }
      function pager() {
        if (qMain.querySelector('.sk-pager')) return;
        var list = topics(), i = list.findIndex(function (b) { return b.getAttribute('aria-pressed') === 'true'; });
        if (i < 1 || qMain.querySelector('.qa-single') || qMain.querySelector('.qa-empty')) return; // «Todos», una a la vez o sin resultados
        var name = function (b) { return (b.firstChild && b.firstChild.textContent || b.textContent).trim(); };
        var pg = document.createElement('nav');
        pg.className = 'sk-pager';
        pg.setAttribute('aria-label', 'Tema anterior y siguiente');
        pg.innerHTML = (list[i - 1] && i - 1 >= 1 ? pagerLink('sk-pg-prev', '', name(list[i - 1]), true) : '<span></span>') +
          (list[i + 1] ? pagerLink('sk-pg-next', '', name(list[i + 1]), false) : '');
        var prev = pg.querySelector('.sk-pg-prev'), next = pg.querySelector('.sk-pg-next');
        var bind = function (a, b) {
          if (!a) return;
          a.addEventListener('click', function () { go(b); });
          a.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(b); } });
        };
        bind(prev, list[i - 1]); bind(next, list[i + 1]);
        qMain.appendChild(pg);
      }
      // Buscar recorre todos los temas: al escribir pasa a «Todos» y al borrar vuelve al tema en que estabas
      var search = document.getElementById('qSearch'), back = null;
      if (search) search.addEventListener('input', function () {
        var list = topics(), i = list.findIndex(function (b) { return b.getAttribute('aria-pressed') === 'true'; });
        if (search.value.trim() && i > 0) { back = i; list[0].click(); }
        else if (!search.value.trim() && back !== null) { var b = list[back]; back = null; if (b) b.click(); }
      });
      new MutationObserver(function () { pager(); setTimeout(progress, 50); }).observe(qMain, { childList: true });
      new MutationObserver(function () { var old = qMain.querySelector('.sk-pager'); if (old) old.remove(); pager(); }).observe(topicsBox, { attributes: true, subtree: true, attributeFilter: ['aria-pressed'] });
      pager();
    }
  }
})();

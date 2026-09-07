(function () {
  const menuEl = document.getElementById('menu');
  const categoryViewEl = document.getElementById('category-view');
  const categoryContentEl = document.getElementById('category-content');
  const backBtn = document.getElementById('back-btn');
  const lastUpdatedEl = document.getElementById('last-updated');

  let planData = null;

  // Fetch JSON and init
  fetch('data/plan.json')
    .then(function (res) { return res.json(); })
    .then(function (data) {
      planData = data;
      lastUpdatedEl.textContent = data.trip.last_updated;
      renderMenu(data.categories);
    })
    .catch(function (err) {
      menuEl.innerHTML = '<p style="color:#f87171;text-align:center;">Error cargando datos del plan.</p>';
    });

  function renderMenu(categories) {
    menuEl.innerHTML = '';
    categories.forEach(function (cat) {
      var btn = document.createElement('button');
      btn.className = 'category-btn';
      btn.innerHTML =
        '<span class="icon">' + cat.icon + '</span>' +
        '<span class="label">' + cat.title + '</span>' +
        '<span class="status status-' + cat.status + '">' + formatStatus(cat.status) + '</span>';
      btn.addEventListener('click', function () {
        showCategory(cat);
      });
      menuEl.appendChild(btn);
    });
  }

  function formatStatus(s) {
    if (s === 'confirmado') return '✅ Confirmado';
    if (s === 'pendiente') return '⏳ Pendiente';
    if (s === 'descartado') return '❌ Descartado';
    return s;
  }

  function showCategory(cat) {
    menuEl.classList.add('hidden');
    categoryViewEl.classList.remove('hidden');

    var html = '';
    html += '<div class="category-header">';
    html += '  <span style="font-size:2rem;">' + cat.icon + '</span>';
    html += '  <h2>' + cat.title + '</h2>';
    html += '  <span class="status status-' + cat.status + '" style="margin-left:auto;">' + formatStatus(cat.status) + '</span>';
    html += '</div>';

    if (cat.map) {
      html += '<div class="category-map"><img src="' + cat.map + '" alt="Mapa del itinerario"></div>';
    }

    cat.sections.forEach(function (sec) {
      html += '<div class="category-section">';
      html += '  <h3>' + sec.subtitle + '</h3>';
      if (sec.content) {
        html += '<p>' + sec.content + '</p>';
      }
      if (sec.items && sec.items.length > 0) {
        html += '<ul>';
        sec.items.forEach(function (item) {
          html += '<li>' + item + '</li>';
        });
        html += '</ul>';
      }
      html += '</div>';
    });

    categoryContentEl.innerHTML = html;
    window.scrollTo(0, 0);
  }

  backBtn.addEventListener('click', function () {
    categoryViewEl.classList.add('hidden');
    menuEl.classList.remove('hidden');
    window.scrollTo(0, 0);
  });
})();

(function () {
  var navToggle = document.getElementById('navToggle');
  var siteNav = document.getElementById('siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
    });

    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', '메뉴 열기');
      });
    });
  }

  // Sticky header shrinks after scrolling past the hero edge.
  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Subtle reveal-on-scroll for elements marked .reveal.
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      revealEls.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add('is-visible');
      });
    }
  }

  // Mobile accordion for long service lists.
  document.querySelectorAll('.accordion-toggle').forEach(function (btn) {
    var wrap = btn.previousElementSibling;
    var label = btn.querySelector('.accordion-label');
    if (!wrap || !label) return;

    btn.setAttribute('aria-expanded', 'false');

    btn.addEventListener('click', function () {
      var collapsed = wrap.classList.toggle('is-collapsed');
      btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      var defaultLabel = btn.getAttribute('data-label') || '전체 서비스 보기';
      var count = btn.getAttribute('data-count') || '';
      label.textContent = collapsed ? defaultLabel + ' (' + count + ')' : '접기';
    });
  });

  // Prefill the project-type select and urgent note on the contact page.
  var typeSelect = document.getElementById('project-type');
  if (typeSelect) {
    var params = new URLSearchParams(window.location.search);
    var typeParam = params.get('type');
    var typeMap = {
      bid: 'public-bid',
      presentation: 'presentation',
      ir: 'ir',
      government: 'government',
      corporate: 'profile',
      global: 'global-proposal'
    };

    if (typeParam && typeMap[typeParam]) {
      typeSelect.value = typeMap[typeParam];
    }

    if (typeParam === 'urgent') {
      var messageField = document.getElementById('message');
      if (messageField && !messageField.value) {
        messageField.value = '[긴급 프로젝트] ';
      }
    }
  }

  var form = document.querySelector('.contact-form');
  var note = document.getElementById('formNote');

  if (form && note) {
    form.addEventListener('submit', function (event) {
      var action = form.getAttribute('action') || '';

      if (action.indexOf('YOUR_FORM_ID') !== -1) {
        event.preventDefault();
        note.textContent = 'Formspree 폼 ID가 아직 연결되지 않았습니다. action 값을 실제 폼 주소로 교체해주세요.';
        return;
      }

      event.preventDefault();
      note.textContent = '전송 중입니다…';

      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            note.textContent = '문의가 접수되었습니다. 순서대로 연락드리겠습니다.';
            form.reset();
          } else {
            note.textContent = '전송에 실패했습니다. 잠시 후 다시 시도해주세요.';
          }
        })
        .catch(function () {
          note.textContent = '전송에 실패했습니다. 잠시 후 다시 시도해주세요.';
        });
    });
  }
})();

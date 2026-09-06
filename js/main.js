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

  var form = document.querySelector('.contact-form');
  var note = document.getElementById('formNote');

  if (form && note) {
    form.addEventListener('submit', function (event) {
      var action = form.getAttribute('action') || '';

      if (action.indexOf('YOUR_FORM_ID') !== -1) {
        event.preventDefault();
        note.textContent = 'Formspree 폼 ID가 아직 연결되지 않았습니다. index.html의 action 값을 실제 폼 주소로 교체해주세요.';
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

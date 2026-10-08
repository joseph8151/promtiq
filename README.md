# 프롬틱 (PROMTIQ)

브랜드가 기억되는 방식을 설계합니다 — 유럽풍의 절제된 에디토리얼 톤을 지향하는
브랜드 · 웹사이트 스튜디오.

정적 HTML/CSS/JS 단일 페이지(`index.html`)입니다. 이전 버전에 있던 `services.html`,
`insights.html`, `contact.html`은 이번 개편에서 하나의 페이지(섹션 앵커)로 통합되었습니다.

```
.
├── index.html   # Header, Hero, 소개, 서비스(6), AI 상담, 브랜드 진단, 진행 과정, 서비스 비용, 문의, Footer
├── css/style.css
├── js/main.js
├── wrangler.jsonc
└── README.md
```

## 디자인 시스템

```css
--khaki: #66705B;          /* 메인 카키 */
--olive: #303A30;          /* 딥 올리브 — 버튼, 다크 밴드 */
--pistachio: #C8D6B8;      /* 포인트. 절제해서 사용 */
--pistachio-light: #E1E8D7;
--ivory: #F6F1E7;          /* 메인 배경 */
--off-white: #FBF9F4;      /* 보조 배경, 카드 */
--beige: #D9CFBD;
--charcoal: #292C28;       /* 본문 텍스트 */
--gray: #85887F;           /* 보조 텍스트 */
```

사용 비율 가이드: 아이보리/오프화이트 60% · 올리브/카키 25% · 피스타치오 10% · 베이지 5%.
피스타치오는 카드 배경색으로 쓰지 않고 숫자·라인·hover·태그에만 사용합니다.

- 제목: Noto Serif KR (전체 타이포의 20~30%만)
- 본문/메뉴/버튼: Pretendard
- 한글 줄바꿈 보호를 위해 `body { word-break: keep-all; }`를 전역 적용 — 제목은
  의도한 지점에 `<br>`로 1차 분리하고, 화면이 좁아지면 `keep-all`이 어절 단위로만
  2차 줄바꿈합니다. **새 카피를 넣을 때도 이 규칙을 유지하세요.**

## 섹션 구성 (리듬을 반복하지 않도록 설계)

1. Hero — 타이포그래피 중심, 이미지 없음
2. 소개 — 가운데 정렬 큰 문장 + 짧은 설명 (`#about`)
3. 서비스 — 좌측 고정 타이틀 / 우측 세로 리스트 (`#services`)
4. AI 상담 — 전체 폭 딥 올리브 배경 (`#ai`)
5. 브랜드 진단 — 큰 숫자 10개 그리드 (`#diagnosis`)
6. 진행 과정 — 세로 Timeline, 피스타치오 원형 마커 (`#process`)
7. 서비스 비용 — 표가 아닌 에디토리얼 그리드, 가격은 작게 (`#pricing`)
8. 문의 — 전체 폭 딥 올리브 배경 + 폼 (`#contact`)

## 카피 원칙 (필독)

- 고유명사(PROMTIQ)를 제외하고 고객이 읽는 문구는 전부 한국어입니다.
  "Explore", "Starting Price", "Contact" 같은 영어 라벨을 다시 넣지 마세요.
- 가격은 "200만원부터" 형식으로 통일. "From 2,000,000원" 같은 영어 혼용 금지.
- 가격의 시각적 비중을 낮게 유지하세요(`service-price`, `pricing-amount`는 작은
  회색 텍스트). 서비스 설명이 항상 가격보다 먼저, 크게 보여야 합니다.
- AI는 미래 기술처럼 과장하지 않습니다. "사람이 설계하고, 기술이 완성도를
  높입니다." 톤을 유지하세요.

## 사용 금지 디자인

금색/네온 그라디언트, Glow·유리 효과, 알약(pill) 버튼, 카드마다 아이콘 하나씩
붙이는 패턴, 과도한 그림자, parallax·회전·bounce 애니메이션. 버튼 radius는
6px 고정(4~8px 범위), 카드 radius는 8~12px, 그림자는 쓰지 않고 선과 배경색
차이로만 계층을 만듭니다.

## 로컬 확인

```bash
npx serve .
# 또는
python3 -m http.server 8080
```

## GitHub 연결

```bash
git remote add origin https://github.com/<org>/<repo>.git
git push -u origin main
```

## Cloudflare 배포

Cloudflare 대시보드에서 **Workers & Pages → Create → Connect to Git**으로 연결하면,
"Pages" 대신 **Worker(정적 자산)** 프로젝트로 잡히는 경우가 있습니다. 이 경우 배포 커맨드가
`npx wrangler versions upload`로 실행되며, 저장소 루트의 `wrangler.jsonc`가 정적 파일
위치(`assets.directory`)를 알려줍니다 — 이 파일이 없으면 "Missing entry-point to Worker
script or to assets directory" 에러로 빌드가 실패합니다.

1. Cloudflare 대시보드 → **Workers & Pages → Create → Connect to Git**
2. 이 저장소(`joseph8151/promtiq`) 선택, 프로덕션 브랜치 지정 (`main`)
3. 빌드 설정은 기본값 그대로 두어도 됩니다 (`wrangler.jsonc`가 자산 위치를 지정)
4. 배포 후 좌측 **Domains** 또는 **Custom domains**에서 실제 도메인 연결
5. 배포 후에도 화면이 안 바뀌면 시크릿 창 또는 `?v=2` 같은 캐시 무효화 쿼리로 재확인

## Formspree 연결

1. [formspree.io](https://formspree.io)에서 새 폼 생성 후 발급되는 Form ID 확인
2. `index.html`의 문의 폼 `action` 값을 실제 폼 주소로 교체

   ```html
   <form class="contact-form" action="https://formspree.io/f/실제_폼_ID" method="POST">
   ```

3. Formspree 대시보드 → **Settings → Domains**에 배포 도메인 등록(스팸 방지)

## 유지 관리 시 유의사항

- 서비스 품목/가격 변경 시 `#services`(서비스 목록), `#pricing`(가격 에디토리얼
  그리드), 문의 폼의 `#service` select 옵션 **세 곳**을 함께 수정
- 색상·폰트 등 디자인 토큰은 `css/style.css` 최상단 `:root` 변수에서 일괄 관리
- 새 제목·문장을 추가할 때 `word-break: keep-all`이 전역 적용되어 있으므로
  과도하게 `max-width: Nch` 같은 문자 단위 폭 제한을 다시 추가하지 마세요
  (CJK 폰트에서 `ch` 단위가 실제 글자 폭보다 훨씬 좁게 계산되어 줄바꿈이
  깨집니다 — px 또는 em 단위를 사용하세요)

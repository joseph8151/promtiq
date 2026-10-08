# 프롬틱 (PROMTIQ)

제안서 · 기획서 · PPT 전문 제작 — 기업이 선택받아야 하는 순간에 필요한 문서를
자료 분석부터 구조, 문장, 디자인까지 설계하는 B2B 문서 스튜디오.

정적 HTML/CSS/JS 멀티페이지 사이트입니다.

```
.
├── index.html       # Hero, 소개, 4대 서비스, 대표 서비스 8개, 핵심 차별점, 이런 고객에게,
│                     # 자료만 있어도, 제작 과정(8단계), 긴급 제작, 서비스 비용, 문의 CTA
├── services.html    # 제안서(30) · 기획서(25+사업계획서13) · PPT(24) · 기업문서(20) = 112개
├── insights.html    # 콘텐츠 허브 — 주제 9개 티저
├── contact.html      # 제작 문의 — 상세 폼(파일 첨부 포함)
├── css/style.css
├── js/main.js
├── wrangler.jsonc
└── README.md
```

## 브랜드 범위 (엄격히 유지)

PROMTIQ는 **제안서 / 기획서 / PPT·발표자료 / 기업 문서** 네 가지 영역만 다룹니다.
홈페이지 제작, 웹디자인, 브랜딩·네이밍·로고, AI 챗봇/컨시어지, SNS·블로그
운영, SEO 대행, CRM·웹 시스템 구축은 **취급하지 않으며, 관련 카피·메뉴·섹션을
다시 추가하지 마세요.** (이전 버전들의 이런 서비스는 git 히스토리에만 남아있습니다.)

`templates/maison/`는 이번 범위 밖의 별도 클라이언트 납품용 템플릿이라 그대로
유지됩니다 — promtiqs.com 라이브 사이트와는 무관합니다.

## 디자인 시스템

```css
--khaki: #66705B;
--olive: #303A30;          /* 버튼, 다크 밴드 */
--pistachio: #C8D6B8;      /* 숫자·라인·hover·태그 전용 */
--pistachio-light: #E1E8D7;
--ivory: #F6F1E7;          /* 메인 배경 */
--off-white: #FBF9F4;      /* 카드, 폼 인풋 배경 */
--beige: #D9CFBD;
--charcoal: #292C28;       /* 본문 텍스트 */
--gray: #85887F;           /* 보조 텍스트 */
```

- 제목: Noto Serif KR (전체의 20~30%만) · 본문/메뉴/버튼: Pretendard
- `body { word-break: keep-all; }` 전역 적용 — 제목은 `<br>`로 1차 분리, 화면이
  좁아지면 어절 단위로만 2차 줄바꿈합니다. **`max-width: Nch` 같은 문자 단위
  폭 제한은 다시 추가하지 마세요** (CJK 폰트에서 `ch`가 실제보다 좁게 계산되어
  단어 중간이 깨집니다 — px 단위를 쓰세요).
- 버튼 radius 6px 고정, 카드 radius 8~12px, 그림자 대신 선/배경색 차이로 계층화.
- 금색·네온 그라디언트, Glow, 알약(pill) 버튼, 카드마다 아이콘 하나씩,
  parallax·회전·bounce 애니메이션 금지.

## 서비스 구조 (4 카테고리 · 112개)

| 코드 | 카테고리 | 세부 서비스 | 시작가 |
|---|---|---|---|
| 01 | 제안서 제작 | 30개 | 70만원부터 (입찰·RFP는 150만원부터) |
| 02 | 기획서 제작 | 25개 + 사업계획서 13개(중첩 강조) | 70만원부터 |
| 03 | PPT·발표자료 제작 | 24개 | 50만원부터 |
| 04 | 기업 문서 제작 | 20개 | 70만원부터 |

대표 서비스 8개(공공입찰/기업RFP/B2B영업/사업기획서/사업계획서/IR/회사소개서/PPT)는
`index.html#flagship`에 "N만원부터" 형식으로만 노출합니다.

## 카피 원칙 (필독)

- 선정 보장, 입찰 성공 보장, 투자유치 성공 보장 같은 표현 **절대 금지**.
  실제 자료를 바탕으로 구조와 전달력을 높이는 서비스로만 설명합니다.
- 가격은 "N만원부터" 형식 통일, 영어 혼용("From") 금지. 시각적 비중도 작게
  유지 — 서비스 설명이 가격보다 먼저, 크게 보여야 합니다.
- 긴급 제작: 모든 당일 제작이 가능하다고 보장하지 않습니다.
- PROMTIQ 고유명사를 제외하고 고객이 읽는 문구는 모두 한국어. `Pitch Deck`,
  `Investor Deck`, `Executive Summary`, `Case Study`, `Profile`처럼 브리프가
  명시적으로 영어 그대로 쓰라고 지정한 업계 용어만 예외입니다.

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
2. `contact.html`의 문의 폼 `action` 값을 실제 폼 주소로 교체

   ```html
   <form class="contact-form" action="https://formspree.io/f/실제_폼_ID" method="POST" enctype="multipart/form-data">
   ```

3. Formspree 대시보드 → **Settings → Domains**에 배포 도메인 등록(스팸 방지)
4. 파일 첨부 필드(`attachment`)가 있으므로 요금제가 파일 업로드를 지원하는지 확인

## 유지 관리 시 유의사항

- 서비스 품목/가격 변경 시 `index.html`(`#services`, `#flagship`, `#pricing`),
  `services.html`의 해당 `category-section`, `contact.html`의 `#service` select
  옵션 **세 곳**을 함께 수정
- 4개 페이지가 헤더·푸터·CSS·JS를 공유하므로 내비게이션 문구를 바꿀 때 전부 수정
- 모바일에서 `services.html`의 긴 서비스 목록은 아코디언(`.accordion-toggle`)으로
  접혀 있습니다. 항목 추가/삭제 시 버튼의 `data-count`도 함께 갱신하세요
- `contact.html`은 `?service=값` 쿼리 파라미터로 서비스 선택을 자동 채웁니다
  (`js/main.js`의 `fallbackMap` 참고). `index.html`/`services.html`에서 새
  CTA 링크를 추가할 때 이 값들과 맞춰주세요

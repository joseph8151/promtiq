# Promtiq (프롬틱)

Documents that move business — 기업이 선택받아야 하는 순간에 필요한 제안서, IR 자료,
사업계획서, 기업 문서를 설계하는 비즈니스 다큐먼트 스튜디오.

정적 HTML/CSS/JS 사이트입니다. 빌드 과정이 없고, 파일을 그대로 서빙합니다.

```
.
├── index.html       # 홈 — Hero, Message, Services 요약(6), Flagship, BID Flow, Audience, Why, Process, Urgent, Capabilities, Insights teaser, Contact CTA
├── services.html    # 서비스 상세 — 6개 카테고리(100개 세부 서비스) + 기업 인접 서비스(15개)
├── insights.html    # 콘텐츠 허브 — 주제 10개 티저 (본문 미작성, 추후 채움)
├── contact.html     # Project Inquiry — 상세 문의 폼(파일 첨부 포함)
├── css/style.css
├── js/main.js
├── wrangler.jsonc
└── README.md
```

## 브랜드 포지셔닝

"프리미엄 홈페이지 제작 아틀리에"에서 **"기업의 중요한 문서와 정보를 설계하는 B2B
전문 스튜디오"**로 전면 재정의했습니다. 경쟁 상대는 동네 PPT 업체가 아니라 전략
컨설팅·기업 브랜딩 스튜디오입니다. AI는 상품으로 팔지 않습니다 — 파는 것은
Strategy / Structure / Writing / Design / Business Outcome 입니다.

## 디자인 시스템

```css
--ink: #0B1220;      /* 본문/헤더/푸터 배경 */
--ivory: #F4F1EA;    /* 메인 배경 */
--bronze: #B59A6A;   /* 숫자·라인·hover·라벨 전용. 버튼 전체 채색 금지 */
--charcoal: #252A31; /* 다크 밴드 배경 */
--stone: #8A8E93;    /* 보조 텍스트 */
--white: #FCFCFA;    /* 카드/인풋 배경 */
```

- 영문 디스플레이: Instrument Serif (Hero, 카테고리 서브헤드)
- 한글/본문: Pretendard
- Bronze는 절대 버튼 전체 색이나 금색 그라디언트로 쓰지 않습니다.

## 서비스 구조 (6 카테고리 · 100개)

| 코드 | 카테고리 | 세부 서비스 수 | 앵커 |
|---|---|---|---|
| 01 | Bid & Proposal | 20 | `services.html#bid` |
| 02 | Presentation | 12 | `services.html#presentation` |
| 03 | IR & Business | 12 | `services.html#ir` |
| 04 | Government & Funding | 10 | `services.html#government` |
| 05 | Corporate Documents | 16 | `services.html#corporate` |
| 06 | Global Business | 15 | `services.html#global` |
| — | 기업 인접 서비스(Additional) | 15 | `services.html#additional` |

Flagship 8종(공공입찰/기업RFP/B2B영업/IR/사업계획서/회사소개서/PT/해외제안)은
`index.html`의 `#flagship`에서 "From ₩N" 시작가로만 노출합니다.

## 카피·숫자 원칙 (필독)

- 선정 보장, 합격 보장, 확인되지 않은 수주율·실적 수치(예: "수주율 95%")는 **절대 사용 금지**.
- 가상 고객사명, 가짜 매출/수주 사례를 만들지 않습니다. 실제 사례가 없으면
  "Selected Capabilities"(프로젝트 **영역**)로만 표현합니다 — `index.html#capabilities` 참고.
- "무료상담", "지금 신청하세요", "특가" 같은 저가형 CTA 문구 금지.
  대신 Project Inquiry / Discuss a Project / 제안서 제작 문의 / RFP 검토 문의 사용.
- AI를 전면에 내세우지 않습니다. 꼭 필요하면 아주 작게 "Human directed. AI enhanced."만 사용.

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
4. 파일 첨부 필드(`attachment`)를 받으려면 Formspree 요금제가 파일 업로드를
   지원하는지 확인 (무료 플랜은 용량 제한이 있습니다)

## 유지 관리 시 유의사항

- 서비스 품목/가격 변경 시 `index.html`(`#services`, `#flagship`)과 `services.html`의
  해당 `category-section`, `contact.html`의 `project_type` select 옵션을 함께 수정
- 색상·폰트 등 디자인 토큰은 `css/style.css` 최상단 `:root` 변수에서 일괄 관리
- 4개 페이지(`index`/`services`/`insights`/`contact`)가 헤더·푸터·CSS·JS를 공유하므로,
  내비게이션 문구를 바꿀 때 네 파일 모두 수정
- 모바일에서 `services.html`의 긴 서비스 목록은 아코디언(`.accordion-toggle`)으로
  접혀 있습니다. 항목을 추가/삭제하면 버튼의 `data-count`도 함께 갱신하세요

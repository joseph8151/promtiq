# Promtiq (프롬틱)

공간이 아닌, 품격을 짓습니다 — 브랜드와 디지털 자산을 설계하는 프리미엄 크리에이티브 스튜디오.

정적 HTML/CSS/JS로 제작된 사이트입니다. 홈(`index.html`)은 브랜드 철학과 6개 서비스
카테고리를 요약해 보여주고, `services.html`은 각 서비스의 상세 구성과 별도 상품
(Naming / Copy / Proposal / Launch)까지 전부 담은 상세 페이지입니다.

```
.
├── index.html       # 홈 — Hero, Philosophy, Services 요약, AI Concierge, Brand Report, Process, Starting Price, FAQ, Contact
├── services.html    # 서비스 상세 — 6개 카테고리 풀 구성 + 별도 서비스
├── css/style.css
├── js/main.js
├── wrangler.jsonc
└── README.md
```

## 서비스 구조

| 코드 | 서비스 | 시작가 |
|---|---|---|
| WEB | Website Atelier | 2,000,000원~ (Signature/Maison/Atelier 3단) |
| BRAND | Brand Identity | 690,000원~ |
| PROFILE | Company Profile | 790,000원~ (Medical/Academy/Professional/Corporate) |
| CONTENT | Content Studio | 월 490,000원~ (Social/Journal) |
| AI | AI Concierge | 990,000원~ |
| CONSULTING | Brand Report | 290,000원 |

별도 서비스(Naming/Copy/Proposal/Launch)는 `services.html`의 `#addons` 섹션에만 노출합니다.

## 카피 원칙 (필독)

- AI Concierge를 제외한 모든 서비스는 "AI가 만들어드립니다" 식으로 표현하지 않습니다.
  Brand Strategy / Creative Direction / Editorial Design 같은 표현을 우선합니다.
- AI 관련 표현이 필요할 때는 작게 "Human directed. AI enhanced." 정도만 사용합니다.
- 병원·학원 관련 문구에는 효능 보장, 성적 보장 표현을 쓰지 않습니다.
- 문장은 짧게. 설명보다 먼저 신뢰가 보이도록 씁니다.

## 로컬 확인

별도 빌드 과정 없이 정적 파일만으로 동작합니다.

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
2. 이 저장소(`joseph8151/promtiq`) 선택, 프로덕션 브랜치 지정
3. 빌드 설정은 기본값 그대로 두어도 됩니다 (`wrangler.jsonc`가 자산 위치를 지정)
4. 배포 후 좌측 **Domains** 또는 **Custom domains**에서 실제 도메인 연결

만약 Cloudflare 계정의 GitHub App 저장소 접근 권한이 없어 "Cloning repository..." 단계에서
실패한다면, GitHub → **Settings → Applications → Installed GitHub Apps**에서 Cloudflare
Pages/Workers 앱에 이 저장소 접근 권한을 추가해야 합니다.

## Formspree 연결

1. [formspree.io](https://formspree.io)에서 새 폼 생성 후 발급되는 Form ID 확인
2. `index.html`의 문의 폼 `action` 값을 실제 폼 주소로 교체

   ```html
   <form class="contact-form" action="https://formspree.io/f/실제_폼_ID" method="POST">
   ```

3. Formspree 대시보드 → **Settings → Domains**에 배포 도메인 등록(스팸 방지)
4. 필요 시 **Settings → Notifications**에서 알림 받을 이메일 확인

## 유지 관리 시 유의사항

- 가격·구성 문구 변경 시 `index.html`의 `#services`/`#pricing` 섹션, `services.html`의
  해당 `detail-section`, 문의 폼 `select` 옵션 세 곳을 함께 수정
- 색상·폰트 등 디자인 토큰은 `css/style.css` 최상단 `:root` 변수에서 일괄 관리
- `services.html`은 `index.html`과 헤더·푸터·CSS를 공유하므로, 내비게이션 문구를 바꿀 때
  두 파일 모두 수정

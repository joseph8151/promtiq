# [상호] — Maison 패키지 (Promtiq)

Maison(250만 원, 부가세 별도) 등급 클라이언트 사이트 템플릿입니다.
Promtiq의 Tiffany Atelier 디자인 시스템을 그대로 사용하며, "청량한 신뢰"를 인상으로 설계했습니다.

```
.
├── index.html
├── css/style.css
├── js/main.js
└── README.md
```

## 배포 전 교체해야 할 항목

`index.html`에서 아래 대괄호 표시를 실제 값으로 모두 바꿔주세요.

| 플레이스홀더 | 위치 | 설명 |
|---|---|---|
| `[상호]` | `<title>`, 헤더, 히어로, 소개, 강점, 푸터 | 업체명 |
| `[업종]` | `<title>`, 히어로 | 예: 내과, 영어학원, 세무사무소 |
| `[지역]` | `<title>`, 히어로, 소개 | 예: 강남, 분당 |
| `[강점 1]` `[강점 2]` `[강점 3]` | 강점 섹션 | 실제 강점 3가지와 한두 문장 설명 |
| `[주소]` | 오시는 길, 푸터 | 실제 주소 |
| `[전화]` | 오시는 길(`tel:` 링크 포함), 푸터 | 실제 연락처 (숫자만, 예: 0212345678) |
| `[이메일]` | 오시는 길(`mailto:` 링크 포함) | 실제 이메일 |
| `[운영시간]` | 오시는 길 | 예: 평일 09:00–18:00 · 주말 휴무 |
| `[FORM_ID]` | 문의 폼 `action` | Formspree 폼 ID |

`[전화]`는 두 곳(표시 텍스트, `tel:` 링크)에 모두 등장하므로 전체 찾기·바꾸기를 권장합니다.

## 병원 · 학원 카피 유의사항

강점·소개 문구 작성 시 효능 보장, 성적 보장 표현(예: "100% 완치", "합격 보장")은
사용하지 마세요. 사실에 근거한 정직한 문장으로 채워주세요.

## 로컬 확인

```bash
npx serve .
```

## GitHub 연결

```bash
git remote add origin https://github.com/<org>/<client-repo>.git
git push -u origin main
```

## Cloudflare 배포

Cloudflare Workers & Pages에서 Git 연동 시 "Worker(정적 자산)" 프로젝트로 잡히는 경우,
아래 `wrangler.jsonc`를 저장소 루트에 추가해야 빌드가 정적 파일 위치를 인식합니다.

```jsonc
{
  "name": "[상호-영문-슬러그]",
  "compatibility_date": "2026-09-07",
  "assets": { "directory": "." }
}
```

Production branch가 `main`인지 확인하고, 실제 배포 브랜치에 파일이 있는지 확인하세요.

## Formspree 연결

1. [formspree.io](https://formspree.io)에서 새 폼 생성 후 Form ID 확인
2. `index.html`의 `action="https://formspree.io/f/[FORM_ID]"`를 실제 값으로 교체
3. Formspree 대시보드 → **Settings → Domains**에 배포 도메인 등록(스팸 방지)

## 유지 관리 시 유의사항

- 색상·폰트 등 디자인 토큰은 `css/style.css` 최상단 `:root` 변수에서 일괄 관리
- 푸터 크레딧은 "Crafted by Promtiq" 문구만 유지 (그 외 Promtiq 홍보 문구 추가 금지)

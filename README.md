# AIHub — AI 툴 비교 & 탐색 플랫폼

AI 업계의 Futurepedia + G2 + Product Hunt를 결합한 플랫폼.

## 기술 스택

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Supabase**
- **Lucide Icons**

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

```bash
cp .env.local.example .env.local
```

`.env.local` 파일에 Supabase 정보를 입력하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Supabase 데이터베이스 설정

Supabase 대시보드 → SQL Editor에서 `supabase/schema.sql` 파일의 내용을 실행하세요.

> **Note**: Supabase 없이도 동작합니다. `src/data/tools.ts`의 로컬 샘플 데이터를 사용합니다.

### 4. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인하세요.

## 페이지 구조

| 경로 | 설명 |
|------|------|
| `/` | 홈페이지 (히어로, 인기 툴, 카테고리, 비교) |
| `/tool/[slug]` | AI 툴 상세 페이지 |
| `/compare/[toolA]-vs-[toolB]` | 툴 비교 페이지 |
| `/category/[category]` | 카테고리별 툴 목록 |
| `/search` | 검색 페이지 |

## 지원 카테고리

- `coding` — 코딩
- `design` — 디자인
- `video` — 비디오
- `research` — 리서치
- `productivity` — 생산성
- `writing` — 글쓰기
- `image` — 이미지
- `audio` — 오디오

## 샘플 데이터 (10개 툴)

ChatGPT, Claude, Cursor, Perplexity, Gemini, Midjourney, ElevenLabs, Windsurf, Lovable, Bolt

## 폴더 구조

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # 루트 레이아웃 + SEO
│   ├── page.tsx            # 홈페이지
│   ├── not-found.tsx       # 404 페이지
│   ├── tool/[slug]/        # 툴 상세
│   ├── compare/[comp]/     # 비교 페이지
│   ├── category/[cat]/     # 카테고리 페이지
│   └── search/             # 검색 페이지
├── components/
│   ├── ui/                 # shadcn/ui 컴포넌트
│   ├── layout/             # Header, Footer
│   ├── home/               # 홈 섹션 컴포넌트
│   ├── tools/              # 툴 카드, 로고
│   └── compare/            # 비교 테이블
├── data/
│   └── tools.ts            # 로컬 샘플 데이터
└── lib/
    ├── types.ts            # TypeScript 타입
    ├── utils.ts            # 유틸리티 & 상수
    └── supabase.ts         # Supabase 클라이언트
```

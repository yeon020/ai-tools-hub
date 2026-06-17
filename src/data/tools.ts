import type { Tool } from "@/lib/types";

export const SAMPLE_TOOLS: Tool[] = [
  /* ═══════════════════════════════════════
     CHAT (10)
  ═══════════════════════════════════════ */
  {
    id: "1", name: "ChatGPT", slug: "chatgpt", company: "OpenAI",
    description: "OpenAI가 만든 세계에서 가장 인기 있는 AI 챗봇. 글쓰기, 코딩, 분석, 창작 등 다양한 작업을 지원합니다.",
    long_description: "ChatGPT는 OpenAI가 개발한 GPT-4o 기반의 대화형 AI입니다. 2022년 11월 출시 이후 전 세계 1억 명 이상이 사용하는 AI 어시스턴트로, 자연어 이해·생성 능력이 뛰어나 복잡한 질문 답변, 코드 작성, 문서 요약, 번역 등 다양한 작업을 수행합니다. GPT-4o 모델은 텍스트·이미지·음성 등 멀티모달 입력을 지원하며, DALL-E를 통한 이미지 생성, Code Interpreter를 통한 코드 실행도 가능합니다.",
    logo_url: "", website_url: "https://chatgpt.com", affiliate_url: "https://chatgpt.com",
    category: "chat", pricing: "무료 / $20/월 (Plus) / $200/월 (Pro)",
    free_plan: true, api_support: true, web_search: true, file_upload: true,
    image_generation: true, voice_support: true, coding_support: true, mobile_app: true,
    context_window: "128K tokens", recommended_for: "일반 사용자, 개발자, 비즈니스",
    features: ["GPT-4o 모델", "웹 브라우징", "DALL-E 이미지 생성", "Code Interpreter", "파일 분석", "커스텀 GPTs", "음성 대화", "멀티모달 입력"],
    alternatives: ["claude", "gemini", "perplexity"],
    rating: 4.7, review_count: 4280, release_date: "2022-11-30",
    created_at: "2024-01-01T00:00:00Z", updated_at: "2024-11-20T00:00:00Z", featured: true,
  },
  {
    id: "2", name: "Claude", slug: "claude", company: "Anthropic",
    description: "Anthropic의 안전 중심 AI 어시스턴트. 200K 토큰 컨텍스트와 뛰어난 코딩·분석 능력을 자랑합니다.",
    long_description: "Claude는 Anthropic이 개발한 Constitutional AI 기반의 AI 어시스턴트입니다. Claude 3.5 Sonnet 모델은 코드 작성, 수학적 추론, 문서 분석에서 최고 수준의 성능을 보여주며, 200K 토큰의 방대한 컨텍스트 윈도우로 매우 긴 문서도 한 번에 처리합니다. Artifacts 기능으로 코드·UI를 실시간 미리보기하며, Projects로 대화 맥락을 유지합니다.",
    logo_url: "", website_url: "https://claude.ai", affiliate_url: "https://claude.ai",
    category: "chat", pricing: "무료 / $20/월 (Pro) / $100/월 (Team)",
    free_plan: true, api_support: true, web_search: false, file_upload: true,
    image_generation: false, voice_support: false, coding_support: true, mobile_app: true,
    context_window: "200K tokens", recommended_for: "코딩, 문서 분석, 비즈니스 작업",
    features: ["Claude 3.5 Sonnet/Haiku", "200K 컨텍스트", "Artifacts", "Projects", "파일 분석", "코드 실행", "API 접근", "안전성 중심 설계"],
    alternatives: ["chatgpt", "gemini", "perplexity"],
    rating: 4.8, review_count: 2910, release_date: "2023-03-14",
    created_at: "2024-01-15T00:00:00Z", updated_at: "2024-11-18T00:00:00Z", featured: true,
  },
  {
    id: "3", name: "Gemini", slug: "gemini", company: "Google",
    description: "Google의 멀티모달 AI. 1M 토큰 컨텍스트와 Google Workspace 완벽 통합으로 생산성을 극대화합니다.",
    long_description: "Gemini는 Google DeepMind가 개발한 멀티모달 AI로 텍스트·이미지·오디오·비디오를 모두 이해합니다. Gemini 1.5 Pro는 1M 토큰의 초대형 컨텍스트를 지원하며, Google Search·Gmail·Docs·Drive 등 Google 생태계와 깊이 통합되어 있습니다. Imagen 3를 통한 이미지 생성, Google 검색 기반 실시간 정보 제공도 지원합니다.",
    logo_url: "", website_url: "https://gemini.google.com", affiliate_url: "https://gemini.google.com",
    category: "chat", pricing: "무료 / $19.99/월 (Advanced)",
    free_plan: true, api_support: true, web_search: true, file_upload: true,
    image_generation: true, voice_support: true, coding_support: true, mobile_app: true,
    context_window: "1M tokens", recommended_for: "Google 서비스 사용자, 멀티모달 작업",
    features: ["Gemini 1.5 Pro/Flash", "1M 토큰 컨텍스트", "Google Workspace 통합", "실시간 웹 검색", "Imagen 3 이미지 생성", "코드 실행", "Gems 커스터마이징", "음성 대화"],
    alternatives: ["chatgpt", "claude", "perplexity"],
    rating: 4.4, review_count: 1820, release_date: "2023-12-06",
    created_at: "2024-02-01T00:00:00Z", updated_at: "2024-11-15T00:00:00Z", featured: true,
  },
  {
    id: "4", name: "Perplexity", slug: "perplexity", company: "Perplexity AI",
    description: "실시간 웹 검색 + AI를 결합한 차세대 검색 엔진. 출처를 인용하며 정확한 답변을 제공합니다.",
    long_description: "Perplexity AI는 전통적인 검색 엔진과 대화형 AI를 결합한 혁신적인 서비스입니다. 모든 답변에 출처를 명시하며, Claude·GPT-4·Gemini 등 다양한 AI 모델을 선택해 사용할 수 있습니다. Spaces 기능으로 팀과 함께 리서치를 공유하고, Pro 플랜에서는 파일 업로드와 이미지 생성도 지원합니다.",
    logo_url: "", website_url: "https://perplexity.ai", affiliate_url: "https://perplexity.ai",
    category: "chat", pricing: "무료 / $20/월 (Pro)",
    free_plan: true, api_support: true, web_search: true, file_upload: true,
    image_generation: true, voice_support: false, coding_support: false, mobile_app: true,
    context_window: "모델별 상이", recommended_for: "리서치, 정보 검색, 팩트체크",
    features: ["실시간 웹 검색", "출처 인용", "다중 AI 모델 선택", "Spaces 협업", "파일 업로드", "이미지 생성", "API 접근", "모바일 앱"],
    alternatives: ["chatgpt", "claude", "gemini"],
    rating: 4.6, review_count: 1540, release_date: "2022-12-07",
    created_at: "2024-01-20T00:00:00Z", updated_at: "2024-11-12T00:00:00Z", featured: true,
  },
  {
    id: "5", name: "Grok", slug: "grok", company: "xAI",
    description: "Elon Musk의 xAI가 만든 AI. X(트위터) 실시간 데이터와 연동되며 위트 있는 답변이 특징입니다.",
    long_description: "Grok은 Elon Musk가 설립한 xAI가 개발한 AI 어시스턴트입니다. X의 실시간 데이터에 접근할 수 있어 최신 트렌드와 뉴스를 반영한 답변을 제공합니다. Grok 2 모델은 이미지 이해·생성 기능을 지원하며, X Premium 구독자에게 제공됩니다.",
    logo_url: "", website_url: "https://grok.com", affiliate_url: "https://grok.com",
    category: "chat", pricing: "X Premium ($8/월) 포함 / API 별도",
    free_plan: false, api_support: true, web_search: true, file_upload: true,
    image_generation: true, voice_support: false, coding_support: true, mobile_app: true,
    context_window: "131K tokens", recommended_for: "X 사용자, 실시간 정보, 유머",
    features: ["Grok 2 모델", "X 실시간 데이터", "이미지 생성 (Aurora)", "이미지 이해", "웹 검색", "코딩 지원", "API 접근", "X 앱 통합"],
    alternatives: ["chatgpt", "claude", "gemini"],
    rating: 4.2, review_count: 890, release_date: "2023-11-04",
    created_at: "2024-03-01T00:00:00Z", updated_at: "2024-11-10T00:00:00Z", featured: false,
  },
  {
    id: "21", name: "DeepSeek", slug: "deepseek", company: "DeepSeek",
    description: "중국 스타트업 DeepSeek이 만든 고성능 오픈소스 AI. GPT-4 수준의 성능을 무료로 제공합니다.",
    long_description: "DeepSeek은 중국 AI 스타트업 DeepSeek이 개발한 대규모 언어 모델입니다. DeepSeek-V3와 R1 모델은 GPT-4o와 비교 가능한 수준의 성능을 보여주며, 특히 수학·코딩 분야에서 탁월합니다. 오픈소스로 공개되어 있어 로컬 실행도 가능하며, 무료 사용 한도가 매우 넉넉해 전 세계적으로 주목받고 있습니다.",
    logo_url: "", website_url: "https://chat.deepseek.com", affiliate_url: "https://chat.deepseek.com",
    category: "chat", pricing: "무료 / API 사용량 기반 (저렴)",
    free_plan: true, api_support: true, web_search: true, file_upload: true,
    image_generation: false, voice_support: false, coding_support: true, mobile_app: true,
    context_window: "128K tokens", recommended_for: "개발자, 수학·코딩, 비용 절감",
    features: ["DeepSeek-V3 모델", "DeepSeek-R1 추론 모델", "오픈소스 공개", "저렴한 API", "수학·코딩 특화", "웹 검색", "파일 분석", "로컬 실행 가능"],
    alternatives: ["chatgpt", "claude", "gemini"],
    rating: 4.5, review_count: 1240, release_date: "2023-11-02",
    created_at: "2025-01-01T00:00:00Z", updated_at: "2025-01-20T00:00:00Z", featured: true,
  },
  {
    id: "22", name: "Microsoft Copilot", slug: "microsoft-copilot", company: "Microsoft",
    description: "Microsoft의 AI 어시스턴트. GPT-4 기반으로 Bing 검색과 통합되어 Windows·Office와 함께 사용됩니다.",
    long_description: "Microsoft Copilot은 OpenAI의 GPT-4를 기반으로 한 Microsoft의 AI 어시스턴트입니다. Bing 검색 엔진과 통합되어 실시간 웹 정보를 제공하며, Windows 11, Microsoft 365(Word, Excel, PowerPoint, Teams) 등 Microsoft 생태계 전반에 깊이 통합되어 있습니다. 무료로 GPT-4 모델을 사용할 수 있다는 것이 큰 강점입니다.",
    logo_url: "", website_url: "https://copilot.microsoft.com", affiliate_url: "https://copilot.microsoft.com",
    category: "chat", pricing: "무료 / Microsoft 365 포함 ($6.99/월~)",
    free_plan: true, api_support: false, web_search: true, file_upload: true,
    image_generation: true, voice_support: true, coding_support: true, mobile_app: true,
    context_window: "128K tokens", recommended_for: "Microsoft 사용자, 기업, Windows 사용자",
    features: ["GPT-4 무료 사용", "Bing 검색 통합", "이미지 생성 (DALL-E)", "Microsoft 365 통합", "음성 대화", "코딩 지원", "문서 분석", "Windows 11 내장"],
    alternatives: ["chatgpt", "gemini", "claude"],
    rating: 4.3, review_count: 2100, release_date: "2023-02-07",
    created_at: "2024-02-01T00:00:00Z", updated_at: "2024-11-05T00:00:00Z", featured: false,
  },
  {
    id: "23", name: "Meta AI", slug: "meta-ai", company: "Meta",
    description: "Meta의 AI 어시스턴트. Llama 3 기반으로 WhatsApp, Instagram, Facebook에서 무료로 사용 가능합니다.",
    long_description: "Meta AI는 Meta가 개발한 Llama 3 기반의 AI 어시스턴트입니다. WhatsApp, Instagram, Facebook, Messenger 등 Meta 플랫폼에 통합되어 있어 별도 앱 설치 없이 사용할 수 있습니다. 실시간 웹 검색, 이미지 생성(Imagine 기능), 대화형 질문 답변 등을 무료로 제공합니다.",
    logo_url: "", website_url: "https://meta.ai", affiliate_url: "https://meta.ai",
    category: "chat", pricing: "완전 무료",
    free_plan: true, api_support: false, web_search: true, file_upload: false,
    image_generation: true, voice_support: false, coding_support: false, mobile_app: true,
    context_window: "128K tokens", recommended_for: "SNS 사용자, 캐주얼 AI 사용",
    features: ["Llama 3 모델", "완전 무료", "WhatsApp/Instagram 통합", "실시간 웹 검색", "이미지 생성 (Imagine)", "Facebook 통합", "Messenger 통합", "모바일 앱"],
    alternatives: ["chatgpt", "microsoft-copilot", "gemini"],
    rating: 4.1, review_count: 980, release_date: "2023-09-27",
    created_at: "2024-03-01T00:00:00Z", updated_at: "2024-10-20T00:00:00Z", featured: false,
  },
  {
    id: "24", name: "Poe", slug: "poe", company: "Quora",
    description: "Quora가 만든 AI 챗봇 플랫폼. ChatGPT, Claude, Gemini 등 여러 AI를 한 곳에서 비교 사용할 수 있습니다.",
    long_description: "Poe는 Quora가 개발한 AI 챗봇 플랫폼으로, 하나의 앱에서 GPT-4o, Claude 3.5, Gemini 등 다양한 AI 모델을 모두 사용할 수 있습니다. 크리에이터가 직접 봇을 만들고 공유할 수 있는 생태계를 갖추고 있으며, 무료 플랜에서도 여러 AI 모델을 제한적으로 체험할 수 있습니다.",
    logo_url: "", website_url: "https://poe.com", affiliate_url: "https://poe.com",
    category: "chat", pricing: "무료 / $19.99/월 (Premium)",
    free_plan: true, api_support: false, web_search: false, file_upload: true,
    image_generation: true, voice_support: false, coding_support: true, mobile_app: true,
    context_window: "모델별 상이", recommended_for: "다양한 AI 비교 체험, 멀티모델 사용자",
    features: ["다중 AI 모델 접근", "GPT-4o/Claude/Gemini 통합", "커스텀 봇 생성", "봇 공유 생태계", "파일 업로드", "이미지 생성", "모바일 앱", "무료 체험"],
    alternatives: ["chatgpt", "claude", "gemini"],
    rating: 4.2, review_count: 760, release_date: "2023-01-01",
    created_at: "2024-02-15T00:00:00Z", updated_at: "2024-10-15T00:00:00Z", featured: false,
  },
  {
    id: "25", name: "Character AI", slug: "character-ai", company: "Character.AI",
    description: "다양한 AI 캐릭터와 대화할 수 있는 플랫폼. 창작, 롤플레이, 언어 학습 등에 활용됩니다.",
    long_description: "Character AI는 사용자가 다양한 성격과 배경을 가진 AI 캐릭터를 만들고 대화할 수 있는 플랫폼입니다. 유명인, 역사 인물, 가상 캐릭터 등 수백만 개의 봇이 생성되어 있으며, 창작, 롤플레이, 언어 연습 등 다양한 목적으로 활용됩니다. 특히 10-20대 사용자 사이에서 큰 인기를 끌고 있습니다.",
    logo_url: "", website_url: "https://character.ai", affiliate_url: "https://character.ai",
    category: "chat", pricing: "무료 / $9.99/월 (c.ai+)",
    free_plan: true, api_support: false, web_search: false, file_upload: false,
    image_generation: false, voice_support: true, coding_support: false, mobile_app: true,
    context_window: "32K tokens", recommended_for: "창작, 롤플레이, 언어 학습, 엔터테인먼트",
    features: ["수백만 AI 캐릭터", "캐릭터 생성", "롤플레이 특화", "음성 대화", "다국어 지원", "모바일 앱", "커뮤니티", "창작 도구"],
    alternatives: ["chatgpt", "poe", "meta-ai"],
    rating: 4.0, review_count: 3200, release_date: "2022-09-16",
    created_at: "2024-03-15T00:00:00Z", updated_at: "2024-10-10T00:00:00Z", featured: false,
  },

  /* ═══════════════════════════════════════
     CODING (10)
  ═══════════════════════════════════════ */
  {
    id: "6", name: "Cursor", slug: "cursor", company: "Anysphere",
    description: "AI 기반 차세대 코드 에디터. VS Code 호환이며 Composer로 멀티파일 AI 편집이 가능합니다.",
    long_description: "Cursor는 VS Code를 기반으로 AI를 중심에 놓고 설계된 코드 에디터입니다. Tab 자동완성, Chat, Composer(멀티파일 편집) 세 가지 AI 인터페이스를 제공합니다. Claude·GPT-4 등 최신 모델을 활용하며, 전체 코드베이스를 인덱싱해 프로젝트 맥락을 이해합니다. 현재 AI 코딩 도구 중 가장 높은 만족도를 자랑합니다.",
    logo_url: "", website_url: "https://cursor.com", affiliate_url: "https://cursor.com",
    category: "coding", pricing: "무료 / $20/월 (Pro) / $40/월 (Business)",
    free_plan: true, api_support: false, web_search: false, file_upload: false,
    image_generation: false, voice_support: false, coding_support: true, mobile_app: false,
    context_window: "모델별 상이", recommended_for: "전문 개발자, 풀스택 개발",
    features: ["AI Tab 자동완성", "Composer 멀티파일 편집", "Chat 기능", "VS Code 확장 호환", "코드베이스 인덱싱", "터미널 AI", "Git 통합", "다양한 AI 모델"],
    alternatives: ["windsurf", "github-copilot", "claude-code"],
    rating: 4.9, review_count: 3850, release_date: "2023-03-01",
    created_at: "2024-02-01T00:00:00Z", updated_at: "2024-11-19T00:00:00Z", featured: true,
  },
  {
    id: "7", name: "Windsurf", slug: "windsurf", company: "Codeium",
    description: "Codeium의 AI 코드 에디터. Cascade 에이전트로 자율적인 멀티스텝 코딩 작업을 처리합니다.",
    long_description: "Windsurf는 AI 코딩 어시스턴트 전문 기업 Codeium이 출시한 차세대 코드 에디터입니다. 핵심 기능 Cascade는 AI 에이전트로서 여러 단계의 코딩 작업을 자율적으로 처리합니다. 무료 플랜에서도 강력한 AI 기능을 무제한 제공하며, 웹 검색 통합으로 최신 문서를 참조해 코드를 작성합니다.",
    logo_url: "", website_url: "https://windsurf.com", affiliate_url: "https://windsurf.com",
    category: "coding", pricing: "무료 / $15/월 (Pro) / $35/월 (Teams)",
    free_plan: true, api_support: false, web_search: true, file_upload: false,
    image_generation: false, voice_support: false, coding_support: true, mobile_app: false,
    context_window: "모델별 상이", recommended_for: "개발자, AI 에이전트 코딩",
    features: ["Cascade AI 에이전트", "AI Tab 자동완성", "멀티파일 편집", "웹 검색 통합", "터미널 통합", "VS Code 확장 호환", "무제한 AI (무료)", "코드베이스 이해"],
    alternatives: ["cursor", "github-copilot", "claude-code"],
    rating: 4.7, review_count: 1120, release_date: "2024-11-13",
    created_at: "2024-03-01T00:00:00Z", updated_at: "2024-11-20T00:00:00Z", featured: true,
  },
  {
    id: "8", name: "GitHub Copilot", slug: "github-copilot", company: "GitHub / Microsoft",
    description: "GitHub과 Microsoft가 만든 AI 코딩 어시스턴트. 모든 주요 IDE에서 동작합니다.",
    long_description: "GitHub Copilot은 OpenAI Codex 기반의 AI 코딩 어시스턴트입니다. VS Code, JetBrains, Vim 등 모든 주요 IDE에 플러그인으로 설치해 사용합니다. Copilot Chat으로 대화형 코딩이 가능하며, GitHub Actions와 통합된 Copilot Workspace로 이슈에서 PR까지 자동화합니다.",
    logo_url: "", website_url: "https://github.com/features/copilot", affiliate_url: "https://github.com/features/copilot",
    category: "coding", pricing: "무료 / $10/월 (Individual) / $19/월 (Business)",
    free_plan: true, api_support: true, web_search: false, file_upload: false,
    image_generation: false, voice_support: false, coding_support: true, mobile_app: false,
    context_window: "모델별 상이", recommended_for: "개발자, 오픈소스 기여자, 기업",
    features: ["멀티 IDE 지원", "Copilot Chat", "코드 자동완성", "GitHub Actions 통합", "Copilot Workspace", "PR 자동 리뷰", "보안 취약점 감지", "다양한 언어 지원"],
    alternatives: ["cursor", "windsurf", "claude-code"],
    rating: 4.5, review_count: 5200, release_date: "2021-06-29",
    created_at: "2024-01-01T00:00:00Z", updated_at: "2024-10-30T00:00:00Z", featured: false,
  },
  {
    id: "9", name: "Claude Code", slug: "claude-code", company: "Anthropic",
    description: "터미널 기반 AI 코딩 에이전트. 코드베이스 전체를 이해하고 자율적으로 작업을 수행합니다.",
    long_description: "Claude Code는 Anthropic이 개발한 터미널 기반 AI 코딩 에이전트입니다. Claude 3.5 Sonnet의 강력한 추론 능력을 기반으로 코드베이스 전체를 이해하고 복잡한 멀티파일 작업을 자율적으로 수행합니다. 파일 읽기·쓰기, 터미널 명령 실행, Git 작업, 웹 검색 등 에이전트로서의 완전한 기능을 제공합니다.",
    logo_url: "", website_url: "https://claude.ai/code", affiliate_url: "https://claude.ai/code",
    category: "coding", pricing: "API 사용량 기반 (Claude Pro 포함)",
    free_plan: false, api_support: true, web_search: false, file_upload: true,
    image_generation: false, voice_support: false, coding_support: true, mobile_app: false,
    context_window: "200K tokens", recommended_for: "시니어 개발자, 터미널 작업",
    features: ["터미널 기반 에이전트", "전체 코드베이스 이해", "멀티파일 편집", "Git 작업", "터미널 명령 실행", "200K 컨텍스트", "API 통합", "자율적 작업 수행"],
    alternatives: ["cursor", "windsurf", "github-copilot"],
    rating: 4.6, review_count: 680, release_date: "2025-02-24",
    created_at: "2025-02-01T00:00:00Z", updated_at: "2024-11-18T00:00:00Z", featured: false,
  },
  {
    id: "10", name: "Replit AI", slug: "replit-ai", company: "Replit",
    description: "브라우저 기반 AI 개발 환경. 설치 없이 바로 코딩하고 즉시 배포할 수 있습니다.",
    long_description: "Replit AI는 클라우드 기반 통합 개발 환경(IDE) Replit에 AI를 결합한 서비스입니다. 50개 이상의 프로그래밍 언어를 지원하며, AI 코드 완성·Chat·디버깅 기능을 제공합니다. 코드 작성부터 배포까지 브라우저에서 모두 해결할 수 있어 학생과 초보자에게 특히 인기입니다.",
    logo_url: "", website_url: "https://replit.com", affiliate_url: "https://replit.com",
    category: "coding", pricing: "무료 / $25/월 (Core)",
    free_plan: true, api_support: false, web_search: false, file_upload: true,
    image_generation: false, voice_support: false, coding_support: true, mobile_app: true,
    context_window: "모델별 상이", recommended_for: "학생, 초보자, 빠른 프로토타이핑",
    features: ["브라우저 기반 IDE", "50+ 언어 지원", "AI 코드 완성", "AI Chat", "즉시 배포", "협업 기능", "모바일 지원", "AI 디버깅"],
    alternatives: ["cursor", "windsurf", "github-copilot"],
    rating: 4.3, review_count: 2100, release_date: "2023-05-01",
    created_at: "2024-02-15T00:00:00Z", updated_at: "2024-10-25T00:00:00Z", featured: false,
  },
  {
    id: "26", name: "Bolt", slug: "bolt", company: "StackBlitz",
    description: "StackBlitz의 브라우저 기반 AI 풀스택 개발 환경. Claude AI로 앱을 설명하면 즉시 생성됩니다.",
    long_description: "Bolt.new는 StackBlitz가 개발한 혁신적인 AI 풀스택 개발 환경입니다. 브라우저에서 실행되는 WebContainers 기술로 Node.js 환경을 브라우저 내에서 완전히 구현합니다. Claude AI를 활용해 자연어 프롬프트만으로 완전한 웹 애플리케이션을 생성하고, 실시간으로 실행하며 Netlify/Vercel에 바로 배포할 수 있습니다.",
    logo_url: "", website_url: "https://bolt.new", affiliate_url: "https://bolt.new",
    category: "coding", pricing: "무료 / $20/월 (Pro) / $45/월 (Teams)",
    free_plan: true, api_support: false, web_search: false, file_upload: true,
    image_generation: false, voice_support: false, coding_support: true, mobile_app: false,
    context_window: "모델별 상이", recommended_for: "비개발자, 풀스택 앱 생성, 프로토타이핑",
    features: ["브라우저 기반 풀스택", "WebContainers 기술", "Claude AI 통합", "자연어 앱 생성", "실시간 미리보기", "Netlify/Vercel 배포", "패키지 설치 지원", "코드 다운로드"],
    alternatives: ["lovable", "v0", "cursor"],
    rating: 4.5, review_count: 980, release_date: "2024-10-01",
    created_at: "2024-10-01T00:00:00Z", updated_at: "2024-11-15T00:00:00Z", featured: true,
  },
  {
    id: "27", name: "Lovable", slug: "lovable", company: "Lovable",
    description: "프롬프트만으로 풀스택 웹앱을 만드는 AI 개발 플랫폼. Supabase 백엔드 자동 통합.",
    long_description: "Lovable은 자연어 프롬프트로 완전한 웹 애플리케이션을 생성하는 AI 풀스택 개발 플랫폼입니다. React, TypeScript, Tailwind CSS를 기반으로 한 프로덕션 수준의 코드를 생성하며, Supabase와 통합되어 백엔드도 자동으로 설정합니다. GitHub 연동, 커스텀 도메인 배포 등의 기능을 지원합니다.",
    logo_url: "", website_url: "https://lovable.dev", affiliate_url: "https://lovable.dev",
    category: "coding", pricing: "무료 / $20/월 (Starter) / $50/월 (Launch)",
    free_plan: true, api_support: false, web_search: false, file_upload: true,
    image_generation: false, voice_support: false, coding_support: true, mobile_app: false,
    context_window: "모델별 상이", recommended_for: "비개발자, 스타트업, 빠른 프로덕트 개발",
    features: ["자연어 앱 생성", "React/TypeScript 코드 생성", "Supabase 백엔드 통합", "실시간 미리보기", "GitHub 연동", "커스텀 도메인", "디자인 편집", "원클릭 배포"],
    alternatives: ["bolt", "v0", "cursor"],
    rating: 4.6, review_count: 840, release_date: "2024-01-01",
    created_at: "2024-04-01T00:00:00Z", updated_at: "2024-11-14T00:00:00Z", featured: true,
  },
  {
    id: "28", name: "v0", slug: "v0", company: "Vercel",
    description: "Vercel이 만든 AI UI 생성 도구. 프롬프트로 React 컴포넌트와 UI를 즉시 생성합니다.",
    long_description: "v0는 Vercel이 개발한 AI 기반 UI 생성 도구입니다. 자연어나 이미지 입력으로 React, Next.js 기반의 UI 컴포넌트를 즉시 생성합니다. shadcn/ui와 Tailwind CSS를 기반으로 하며, 생성된 코드를 바로 Next.js 프로젝트에 복사해 사용할 수 있습니다. UI 프로토타이핑과 컴포넌트 생성에 특화되어 있습니다.",
    logo_url: "", website_url: "https://v0.dev", affiliate_url: "https://v0.dev",
    category: "coding", pricing: "무료 / $20/월 (Premium)",
    free_plan: true, api_support: false, web_search: false, file_upload: true,
    image_generation: false, voice_support: false, coding_support: true, mobile_app: false,
    context_window: "모델별 상이", recommended_for: "프론트엔드 개발자, UI 프로토타이핑",
    features: ["AI UI 컴포넌트 생성", "React/Next.js 코드 출력", "shadcn/ui 통합", "Tailwind CSS", "이미지-투-코드", "실시간 미리보기", "Vercel 배포 연동", "코드 편집"],
    alternatives: ["bolt", "lovable", "cursor"],
    rating: 4.4, review_count: 720, release_date: "2023-10-05",
    created_at: "2024-03-01T00:00:00Z", updated_at: "2024-11-10T00:00:00Z", featured: false,
  },
  {
    id: "29", name: "Continue", slug: "continue", company: "Continue.dev",
    description: "오픈소스 AI 코딩 어시스턴트. VS Code, JetBrains에서 어떤 LLM 모델이든 연결해 사용 가능합니다.",
    long_description: "Continue는 완전 오픈소스 AI 코딩 어시스턴트입니다. VS Code와 JetBrains IDE에서 플러그인으로 설치하며, OpenAI, Anthropic, Ollama 등 어떤 AI 모델이든 자유롭게 연결할 수 있습니다. 로컬 모델 실행을 지원해 코드를 외부로 전송하지 않아도 되므로 보안이 중요한 기업 환경에 적합합니다.",
    logo_url: "", website_url: "https://continue.dev", affiliate_url: "https://continue.dev",
    category: "coding", pricing: "완전 무료 (오픈소스)",
    free_plan: true, api_support: true, web_search: false, file_upload: false,
    image_generation: false, voice_support: false, coding_support: true, mobile_app: false,
    context_window: "모델별 상이", recommended_for: "보안 중시 개발자, 오픈소스 선호자",
    features: ["완전 오픈소스", "임의 LLM 연결", "로컬 모델 지원", "VS Code 플러그인", "JetBrains 플러그인", "코드 자동완성", "Chat 기능", "커스텀 설정"],
    alternatives: ["github-copilot", "cursor", "cline"],
    rating: 4.3, review_count: 420, release_date: "2023-05-01",
    created_at: "2024-04-01T00:00:00Z", updated_at: "2024-10-20T00:00:00Z", featured: false,
  },
  {
    id: "30", name: "Cline", slug: "cline", company: "Cline",
    description: "VS Code의 오픈소스 AI 코딩 에이전트. 파일 생성, 터미널 실행, 브라우저 제어를 자율적으로 수행합니다.",
    long_description: "Cline(구 Claude Dev)은 VS Code에서 동작하는 오픈소스 AI 코딩 에이전트입니다. 파일 생성·편집, 터미널 명령 실행, 브라우저 제어까지 자율적으로 수행하는 강력한 에이전트입니다. 모든 API 제공자(Anthropic, OpenAI, Gemini 등)를 지원하며, 각 액션에 대한 사용자 승인 시스템으로 안전성을 유지합니다.",
    logo_url: "", website_url: "https://cline.bot", affiliate_url: "https://cline.bot",
    category: "coding", pricing: "무료 (API 비용 별도)",
    free_plan: true, api_support: true, web_search: false, file_upload: true,
    image_generation: false, voice_support: false, coding_support: true, mobile_app: false,
    context_window: "모델별 상이", recommended_for: "고급 개발자, AI 에이전트 작업",
    features: ["완전 오픈소스", "파일 생성·편집 에이전트", "터미널 자율 실행", "브라우저 제어", "다중 API 제공자", "사용자 승인 시스템", "VS Code 확장", "MCP 서버 지원"],
    alternatives: ["cursor", "claude-code", "continue"],
    rating: 4.5, review_count: 560, release_date: "2024-07-01",
    created_at: "2024-07-01T00:00:00Z", updated_at: "2024-11-17T00:00:00Z", featured: false,
  },

  /* ═══════════════════════════════════════
     IMAGE (3)
  ═══════════════════════════════════════ */
  {
    id: "11", name: "Midjourney", slug: "midjourney", company: "Midjourney",
    description: "세계 최고 수준의 AI 이미지 생성 툴. 예술적 감각과 놀라운 품질로 크리에이터들의 선택.",
    long_description: "Midjourney는 텍스트 프롬프트로 예술적 품질의 이미지를 생성하는 AI 서비스입니다. v6.1 모델은 사실적 사진부터 추상 예술까지 다양한 스타일을 지원합니다. Discord와 웹 인터페이스 모두에서 사용 가능하며, Style 참조, 캐릭터 일관성 유지 등 고급 기능을 제공합니다.",
    logo_url: "", website_url: "https://midjourney.com", affiliate_url: "https://midjourney.com",
    category: "image", pricing: "$10/월 (Basic) / $30/월 (Standard) / $60/월 (Pro)",
    free_plan: false, api_support: false, web_search: false, file_upload: true,
    image_generation: true, voice_support: false, coding_support: false, mobile_app: false,
    context_window: "N/A", recommended_for: "아티스트, 디자이너, 크리에이터",
    features: ["Midjourney v6.1", "고품질 이미지 생성", "다양한 아트 스타일", "이미지 업스케일", "Style 참조", "캐릭터 일관성", "웹 갤러리", "빠른 생성 모드"],
    alternatives: ["leonardo-ai", "adobe-firefly"],
    rating: 4.8, review_count: 3200, release_date: "2022-07-12",
    created_at: "2024-01-05T00:00:00Z", updated_at: "2024-10-20T00:00:00Z", featured: true,
  },
  {
    id: "12", name: "Leonardo AI", slug: "leonardo-ai", company: "Leonardo AI",
    description: "게임·크리에이티브 특화 AI 이미지 생성 플랫폼. 다양한 모델과 강력한 API를 제공합니다.",
    long_description: "Leonardo AI는 게임 에셋, 컨셉 아트, 마케팅 소재 등 크리에이티브 작업에 특화된 AI 이미지 생성 플랫폼입니다. 다수의 파인튜닝 모델을 선택할 수 있으며, 자체 모델 훈련도 지원합니다. Motion 기능으로 이미지를 영상으로 변환하고, API를 통한 기업 통합도 가능합니다.",
    logo_url: "", website_url: "https://leonardo.ai", affiliate_url: "https://leonardo.ai",
    category: "image", pricing: "무료 / $12/월 (Apprentice) / $30/월 (Artisan)",
    free_plan: true, api_support: true, web_search: false, file_upload: true,
    image_generation: true, voice_support: false, coding_support: false, mobile_app: true,
    context_window: "N/A", recommended_for: "게임 개발자, 크리에이터, 기업",
    features: ["다양한 AI 모델", "모델 파인튜닝", "이미지-투-영상 (Motion)", "실시간 캔버스", "API 접근", "에셋 라이브러리", "배치 생성", "프롬프트 마법사"],
    alternatives: ["midjourney", "adobe-firefly"],
    rating: 4.5, review_count: 1680, release_date: "2022-11-01",
    created_at: "2024-01-10T00:00:00Z", updated_at: "2024-10-18T00:00:00Z", featured: false,
  },
  {
    id: "13", name: "Adobe Firefly", slug: "adobe-firefly", company: "Adobe",
    description: "Adobe의 AI 이미지 생성 툴. 상업적 이용이 안전하며 Creative Cloud와 완벽하게 통합됩니다.",
    long_description: "Adobe Firefly는 상업적으로 안전한(commercially safe) AI 이미지 생성을 제공하는 Adobe의 서비스입니다. 저작권 문제가 없는 데이터로 훈련되어 기업 환경에서 안전하게 사용할 수 있습니다. Photoshop의 Generative Fill, Illustrator의 벡터 생성 등 Creative Cloud 앱들과 깊이 통합되어 있습니다.",
    logo_url: "", website_url: "https://firefly.adobe.com", affiliate_url: "https://firefly.adobe.com",
    category: "image", pricing: "무료 / Creative Cloud 구독 포함",
    free_plan: true, api_support: true, web_search: false, file_upload: true,
    image_generation: true, voice_support: false, coding_support: false, mobile_app: true,
    context_window: "N/A", recommended_for: "Adobe 사용자, 기업, 상업적 이용",
    features: ["상업적 이용 안전", "Photoshop Generative Fill", "Illustrator 벡터 생성", "배경 제거", "이미지 확장", "텍스트 효과", "Creative Cloud 통합", "API 접근"],
    alternatives: ["midjourney", "leonardo-ai"],
    rating: 4.3, review_count: 1240, release_date: "2023-03-21",
    created_at: "2024-01-15T00:00:00Z", updated_at: "2024-10-15T00:00:00Z", featured: false,
  },

  /* ═══════════════════════════════════════
     VIDEO (4)
  ═══════════════════════════════════════ */
  {
    id: "14", name: "Runway", slug: "runway", company: "Runway",
    description: "할리우드도 사용하는 AI 비디오 생성·편집 플랫폼. Gen-3 Alpha로 놀라운 영상을 만드세요.",
    long_description: "Runway는 AI 기반 비디오 생성 및 편집의 선두주자입니다. Gen-3 Alpha Turbo 모델로 텍스트 또는 이미지에서 고품질 비디오를 생성합니다. 배경 제거, 인페인팅, 모션 브러시 등 전문적인 영상 편집 기능도 제공합니다.",
    logo_url: "", website_url: "https://runwayml.com", affiliate_url: "https://runwayml.com",
    category: "video", pricing: "무료 / $15/월 (Standard) / $35/월 (Pro)",
    free_plan: true, api_support: true, web_search: false, file_upload: true,
    image_generation: true, voice_support: false, coding_support: false, mobile_app: true,
    context_window: "N/A", recommended_for: "비디오 크리에이터, 영화 제작자, 마케터",
    features: ["Gen-3 Alpha 비디오 생성", "텍스트-투-비디오", "이미지-투-비디오", "배경 제거", "인페인팅", "모션 브러시", "오디오 생성", "API 접근"],
    alternatives: ["pika", "heygen"],
    rating: 4.6, review_count: 1450, release_date: "2023-06-12",
    created_at: "2024-02-01T00:00:00Z", updated_at: "2024-11-05T00:00:00Z", featured: true,
  },
  {
    id: "31", name: "Pika", slug: "pika", company: "Pika Labs",
    description: "간편한 AI 비디오 생성 툴. 텍스트와 이미지로 짧은 고품질 영상을 빠르게 만들 수 있습니다.",
    long_description: "Pika는 Pika Labs가 개발한 AI 비디오 생성 플랫폼입니다. 텍스트 프롬프트나 이미지에서 3-4초의 고품질 비디오를 생성하며, Pika 1.5 모델은 영화 같은 퀄리티를 제공합니다. Pikaffects 기능으로 독특한 시각 효과를 적용할 수 있으며, Discord와 웹 인터페이스를 모두 지원합니다.",
    logo_url: "", website_url: "https://pika.art", affiliate_url: "https://pika.art",
    category: "video", pricing: "무료 / $8/월 (Basic) / $28/월 (Standard)",
    free_plan: true, api_support: false, web_search: false, file_upload: true,
    image_generation: false, voice_support: false, coding_support: false, mobile_app: true,
    context_window: "N/A", recommended_for: "소셜 미디어 크리에이터, 비디오 생성",
    features: ["Pika 1.5 모델", "텍스트-투-비디오", "이미지-투-비디오", "Pikaffects 효과", "영상 편집", "음악 싱크", "모바일 앱", "빠른 생성"],
    alternatives: ["runway", "heygen"],
    rating: 4.3, review_count: 820, release_date: "2023-11-28",
    created_at: "2024-03-01T00:00:00Z", updated_at: "2024-11-01T00:00:00Z", featured: false,
  },
  {
    id: "32", name: "HeyGen", slug: "heygen", company: "HeyGen",
    description: "AI 아바타 비디오 생성 플랫폼. 텍스트만 입력하면 실사 AI 아바타가 영상을 만들어줍니다.",
    long_description: "HeyGen은 AI 아바타를 활용한 비디오 생성 플랫폼입니다. 100개 이상의 AI 아바타와 300개 이상의 목소리를 선택해 텍스트만으로 프레젠테이션, 마케팅 영상, 교육 콘텐츠를 제작할 수 있습니다. 자신의 모습을 클론해 아바타로 만드는 기능과 자동 더빙 기능도 제공합니다.",
    logo_url: "", website_url: "https://heygen.com", affiliate_url: "https://heygen.com",
    category: "video", pricing: "무료 (1분) / $29/월 (Creator) / $89/월 (Business)",
    free_plan: true, api_support: true, web_search: false, file_upload: true,
    image_generation: false, voice_support: true, coding_support: false, mobile_app: false,
    context_window: "N/A", recommended_for: "마케터, 기업 교육, 콘텐츠 제작자",
    features: ["AI 아바타 100+", "텍스트-투-비디오", "음성 클로닝", "자동 번역·더빙", "300+ 목소리", "아바타 생성", "API 접근", "팀 협업"],
    alternatives: ["runway", "synthesia"],
    rating: 4.5, review_count: 1120, release_date: "2022-08-01",
    created_at: "2024-02-15T00:00:00Z", updated_at: "2024-10-28T00:00:00Z", featured: false,
  },
  {
    id: "33", name: "Synthesia", slug: "synthesia", company: "Synthesia",
    description: "기업용 AI 비디오 생성 플랫폼. 160개 AI 아바타로 전문적인 교육·마케팅 영상을 제작합니다.",
    long_description: "Synthesia는 기업용 AI 비디오 생성 플랫폼으로 세계적인 기업들이 사용합니다. 160개 이상의 다양한 AI 아바타와 130개 언어를 지원하며, 텍스트 스크립트만으로 전문적인 교육 영상, 마케팅 콘텐츠, 사내 커뮤니케이션 영상을 제작합니다. ISO 27001 인증으로 기업 보안 요구사항도 충족합니다.",
    logo_url: "", website_url: "https://synthesia.io", affiliate_url: "https://synthesia.io",
    category: "video", pricing: "$29/월 (Starter) / $89/월 (Creator) / Enterprise",
    free_plan: false, api_support: true, web_search: false, file_upload: true,
    image_generation: false, voice_support: true, coding_support: false, mobile_app: false,
    context_window: "N/A", recommended_for: "기업 교육팀, HR, 마케팅 부서",
    features: ["160+ AI 아바타", "130개 언어 지원", "텍스트-투-비디오", "아바타 커스터마이징", "브랜드 템플릿", "SCORM 내보내기", "API 접근", "ISO 27001 인증"],
    alternatives: ["heygen", "runway"],
    rating: 4.4, review_count: 890, release_date: "2020-06-01",
    created_at: "2024-03-01T00:00:00Z", updated_at: "2024-10-25T00:00:00Z", featured: false,
  },

  /* ═══════════════════════════════════════
     VOICE (1)
  ═══════════════════════════════════════ */
  {
    id: "15", name: "ElevenLabs", slug: "elevenlabs", company: "ElevenLabs",
    description: "세계 최고 품질의 AI 음성 합성. 감정적이고 사실적인 음성을 29개 언어로 생성합니다.",
    long_description: "ElevenLabs는 텍스트를 가장 자연스러운 음성으로 변환하는 AI 서비스입니다. 3초의 샘플로 누구의 목소리도 클론할 수 있으며, 29개 이상의 언어를 지원합니다. AI 더빙 기능으로 영상의 언어를 바꾸면서 원래 화자의 목소리를 유지합니다.",
    logo_url: "", website_url: "https://elevenlabs.io", affiliate_url: "https://elevenlabs.io",
    category: "voice", pricing: "무료 / $5/월 (Starter) / $22/월 (Creator)",
    free_plan: true, api_support: true, web_search: false, file_upload: false,
    image_generation: false, voice_support: true, coding_support: false, mobile_app: true,
    context_window: "N/A", recommended_for: "콘텐츠 크리에이터, 팟캐스터, 게임 개발",
    features: ["고품질 음성 합성", "음성 클로닝", "29개 언어", "AI 더빙", "감정 제어", "Conversational AI API", "오디오북 생성", "음성-투-음성"],
    alternatives: ["murf", "play-ht"],
    rating: 4.7, review_count: 1890, release_date: "2022-01-01",
    created_at: "2024-01-10T00:00:00Z", updated_at: "2024-11-08T00:00:00Z", featured: true,
  },

  /* ═══════════════════════════════════════
     PRODUCTIVITY (3)
  ═══════════════════════════════════════ */
  {
    id: "16", name: "Notion AI", slug: "notion-ai", company: "Notion",
    description: "Notion에 내장된 AI 어시스턴트. 문서 작성, 요약, 번역, 데이터베이스 생성을 자동화합니다.",
    long_description: "Notion AI는 올인원 협업 툴 Notion에 통합된 AI 기능입니다. 문서 작성 보조, 콘텐츠 요약, 번역, Q&A 기능을 제공합니다. Notion AI Q&A는 워크스페이스 전체를 검색해 원하는 정보를 즉시 찾아줍니다.",
    logo_url: "", website_url: "https://notion.so/product/ai", affiliate_url: "https://notion.so/product/ai",
    category: "productivity", pricing: "$10/월 (AI 애드온, Notion 구독 별도)",
    free_plan: false, api_support: true, web_search: false, file_upload: true,
    image_generation: false, voice_support: false, coding_support: false, mobile_app: true,
    context_window: "N/A", recommended_for: "팀 협업, 지식 관리, 프로젝트 관리",
    features: ["문서 AI 작성", "콘텐츠 요약", "번역", "AI Q&A", "데이터베이스 자동화", "Notion 완벽 통합", "팀 협업", "모바일 지원"],
    alternatives: ["grammarly", "notebooklm"],
    rating: 4.4, review_count: 2840, release_date: "2023-02-22",
    created_at: "2024-01-20T00:00:00Z", updated_at: "2024-10-28T00:00:00Z", featured: false,
  },
  {
    id: "17", name: "Grammarly", slug: "grammarly", company: "Grammarly",
    description: "AI 기반 글쓰기 어시스턴트. 문법 교정부터 스타일 개선, 표절 검사까지 제공합니다.",
    long_description: "Grammarly는 AI 기반의 글쓰기 어시스턴트로 전 세계 3,000만 명 이상이 사용합니다. 문법·철자 교정뿐 아니라 글의 명확성, 톤, 스타일까지 분석하고 개선 제안을 제공합니다.",
    logo_url: "", website_url: "https://grammarly.com", affiliate_url: "https://grammarly.com",
    category: "productivity", pricing: "무료 / $12/월 (Premium) / $15/월 (Business)",
    free_plan: true, api_support: false, web_search: false, file_upload: false,
    image_generation: false, voice_support: false, coding_support: false, mobile_app: true,
    context_window: "N/A", recommended_for: "비즈니스 커뮤니케이션, 학생, 작가",
    features: ["문법·철자 교정", "스타일 개선", "톤 감지", "GrammarlyGO 생성 AI", "표절 검사", "브라우저 확장", "MS Office 통합", "팀 협업"],
    alternatives: ["notion-ai", "chatgpt"],
    rating: 4.5, review_count: 4500, release_date: "2009-07-01",
    created_at: "2024-01-01T00:00:00Z", updated_at: "2024-10-10T00:00:00Z", featured: false,
  },
  {
    id: "18", name: "NotebookLM", slug: "notebooklm", company: "Google",
    description: "Google의 AI 리서치 어시스턴트. 업로드한 문서를 기반으로 Q&A, 요약, 팟캐스트를 생성합니다.",
    long_description: "NotebookLM은 Google이 개발한 AI 기반 리서치 및 글쓰기 어시스턴트입니다. PDF, Google Docs, YouTube, 웹사이트 등 다양한 소스를 업로드하면, 해당 내용만을 기반으로 정확한 답변을 제공합니다. Audio Overview 기능은 업로드한 문서를 바탕으로 실제 팟캐스트처럼 생생한 오디오를 자동 생성합니다.",
    logo_url: "", website_url: "https://notebooklm.google.com", affiliate_url: "https://notebooklm.google.com",
    category: "productivity", pricing: "무료",
    free_plan: true, api_support: false, web_search: false, file_upload: true,
    image_generation: false, voice_support: true, coding_support: false, mobile_app: false,
    context_window: "소스별 상이", recommended_for: "학생, 리서처, 문서 분석",
    features: ["문서 기반 Q&A", "AI 요약", "Audio Overview 팟캐스트", "소스 인용", "마인드맵", "다양한 소스 지원", "공유 기능", "완전 무료"],
    alternatives: ["notion-ai", "perplexity"],
    rating: 4.6, review_count: 1350, release_date: "2023-07-12",
    created_at: "2024-02-10T00:00:00Z", updated_at: "2024-11-01T00:00:00Z", featured: false,
  },

  /* ═══════════════════════════════════════
     DESIGN (2)
  ═══════════════════════════════════════ */
  {
    id: "19", name: "Canva AI", slug: "canva-ai", company: "Canva",
    description: "Canva에 통합된 AI 디자인 기능. Magic Studio로 이미지 생성, 배경 제거, 프레젠테이션을 자동화합니다.",
    long_description: "Canva AI는 세계 최대 디자인 플랫폼 Canva에 통합된 AI 기능 모음인 Magic Studio입니다. Magic Media로 텍스트에서 이미지를 생성하고, Magic Eraser로 배경을 제거하며, Magic Design으로 프레젠테이션을 자동 생성합니다.",
    logo_url: "", website_url: "https://canva.com", affiliate_url: "https://canva.com",
    category: "design", pricing: "무료 / $15/월 (Pro) / $30/월 (Teams)",
    free_plan: true, api_support: false, web_search: false, file_upload: true,
    image_generation: true, voice_support: false, coding_support: false, mobile_app: true,
    context_window: "N/A", recommended_for: "마케터, 소셜 미디어, 비디자이너",
    features: ["Magic Media 이미지 생성", "Magic Eraser", "Magic Design", "AI 프레젠테이션", "배경 제거", "이미지 확장", "텍스트-투-비디오", "100만+ 템플릿"],
    alternatives: ["figma-ai", "adobe-firefly"],
    rating: 4.6, review_count: 5800, release_date: "2013-01-01",
    created_at: "2024-01-01T00:00:00Z", updated_at: "2024-11-06T00:00:00Z", featured: true,
  },
  {
    id: "20", name: "Figma AI", slug: "figma-ai", company: "Figma",
    description: "Figma에 통합된 AI 기능. 디자인 생성, 프로토타입 자동화, 코드 생성을 지원합니다.",
    long_description: "Figma AI는 업계 표준 디자인 협업 툴 Figma에 통합된 AI 기능들입니다. AI 레이아웃 생성, 콘텐츠 자동 채우기, 디자인에서 코드 생성, 시각적 검색 등의 기능을 제공합니다.",
    logo_url: "", website_url: "https://figma.com", affiliate_url: "https://figma.com",
    category: "design", pricing: "무료 / $15/월 (Professional) / $45/월 (Organization)",
    free_plan: true, api_support: true, web_search: false, file_upload: true,
    image_generation: false, voice_support: false, coding_support: true, mobile_app: true,
    context_window: "N/A", recommended_for: "UI/UX 디자이너, 개발자, 프로덕트 팀",
    features: ["AI 레이아웃 생성", "콘텐츠 자동 채우기", "Dev Mode AI 코드 생성", "시각적 검색", "프로토타입 자동화", "실시간 협업", "Figma 완벽 통합", "API 접근"],
    alternatives: ["canva-ai", "adobe-firefly"],
    rating: 4.5, review_count: 2100, release_date: "2016-09-26",
    created_at: "2024-02-15T00:00:00Z", updated_at: "2024-11-04T00:00:00Z", featured: false,
  },
];

/* ─── Helper functions ─────────────────────────────────── */

export function getToolBySlug(slug: string): Tool | undefined {
  return SAMPLE_TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  return SAMPLE_TOOLS.filter((t) => t.category === category);
}

export function getFeaturedTools(): Tool[] {
  return SAMPLE_TOOLS.filter((t) => t.featured);
}

export function getRecentTools(limit = 6): Tool[] {
  return [...SAMPLE_TOOLS]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, limit);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase();
  return SAMPLE_TOOLS.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.company.toLowerCase().includes(q)
  );
}

export function getToolSuggestions(query: string, limit = 6): Tool[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return SAMPLE_TOOLS.filter((t) => t.name.toLowerCase().startsWith(q)).slice(0, limit);
}

export function getRelatedTools(tool: Tool, limit = 4): Tool[] {
  return SAMPLE_TOOLS.filter(
    (t) =>
      t.slug !== tool.slug &&
      (tool.alternatives.includes(t.slug) || t.category === tool.category)
  ).slice(0, limit);
}

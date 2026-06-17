import type { Tool } from "@/lib/types";

export interface FAQ {
  question: string;
  answer: string;
}

const TOOL_FAQS: Record<string, FAQ[]> = {
  chatgpt: [
    { question: "ChatGPT 무료 플랜과 Plus 플랜의 차이는 무엇인가요?", answer: "무료 플랜은 GPT-4o mini 모델을 사용하며 일일 사용량 제한이 있습니다. Plus($20/월)는 GPT-4o 모델에 우선 접근이 가능하고, DALL-E 이미지 생성, 고급 데이터 분석, 파일 업로드 등 더 많은 기능을 제공합니다. 빠른 응답 속도와 높은 사용량 한도도 포함됩니다." },
    { question: "ChatGPT로 이미지를 생성할 수 있나요?", answer: "네, ChatGPT Plus 이상 플랜에서 DALL-E 3 모델을 통해 이미지를 생성할 수 있습니다. 텍스트로 원하는 이미지를 설명하면 고품질 이미지를 생성해줍니다. 무료 플랜에서는 이미지 생성 기능이 제한됩니다." },
    { question: "ChatGPT API와 ChatGPT 웹사이트는 같은 건가요?", answer: "아닙니다. ChatGPT 웹사이트는 일반 사용자를 위한 인터페이스이며, API는 개발자가 자신의 앱에 GPT 모델을 통합할 때 사용합니다. API는 사용량에 따라 요금이 부과되며, 모델과 파라미터를 더 세밀하게 제어할 수 있습니다." },
    { question: "ChatGPT는 한국어를 잘 지원하나요?", answer: "네, ChatGPT는 한국어를 포함한 100개 이상의 언어를 지원합니다. 한국어로 질문하면 한국어로 답변하며, 한국어 번역, 문서 작성, 교정 등도 능숙하게 처리합니다. 단, 영어에 비해 일부 전문 분야에서는 품질 차이가 있을 수 있습니다." },
    { question: "ChatGPT 대화 내용이 학습 데이터로 사용되나요?", answer: "기본 설정에서는 대화 내용이 모델 개선에 사용될 수 있습니다. 설정에서 'Data Controls'를 통해 이를 거부할 수 있으며, Plus/Enterprise 플랜에서는 데이터가 학습에 사용되지 않도록 설정할 수 있습니다. 민감한 정보는 입력하지 않는 것을 권장합니다." },
  ],
  claude: [
    { question: "Claude의 200K 토큰 컨텍스트는 어느 정도 분량인가요?", answer: "200K 토큰은 약 150만 단어 또는 책 약 600페이지 분량에 해당합니다. 이를 통해 긴 법률 문서, 코드베이스 전체, 여러 PDF를 한 번에 분석할 수 있습니다. 일반적인 AI 서비스(4K~8K 토큰)에 비해 훨씬 방대한 맥락을 이해합니다." },
    { question: "Claude와 ChatGPT 중 코딩에는 어떤 게 더 좋나요?", answer: "많은 개발자들이 코딩, 특히 복잡한 코드 리뷰와 긴 코드베이스 분석에서 Claude를 선호합니다. Claude 3.5 Sonnet은 코딩 벤치마크에서 높은 점수를 기록했으며, 긴 코드를 이해하는 200K 컨텍스트가 강점입니다. ChatGPT는 Code Interpreter로 코드 실행이 가능하다는 장점이 있습니다." },
    { question: "Claude는 웹 검색을 지원하나요?", answer: "현재 Claude 웹 인터페이스에서는 기본적으로 실시간 웹 검색을 지원하지 않습니다. 학습 데이터 기준 시점까지의 정보만 활용합니다. 단, Claude API를 활용한 일부 통합(Claude.ai 프로젝트 등)에서 웹 검색 도구를 추가할 수 있습니다." },
    { question: "Artifacts 기능은 무엇인가요?", answer: "Artifacts는 Claude가 생성한 코드, HTML, 마크다운 문서 등을 독립된 창에서 실시간으로 미리볼 수 있는 기능입니다. React 컴포넌트를 작성하면 즉시 렌더링되어 확인할 수 있고, 코드 수정도 대화 중에 바로 반영됩니다." },
    { question: "Claude API 가격은 어떻게 되나요?", answer: "Claude API는 토큰 사용량 기반으로 요금이 부과됩니다. Claude 3.5 Sonnet 기준 입력 $3/1M 토큰, 출력 $15/1M 토큰입니다. 더 빠른 Claude 3.5 Haiku는 저렴하며, 최고 성능의 Claude 3 Opus는 더 비쌉니다. Anthropic 웹사이트에서 최신 가격을 확인하세요." },
  ],
  gemini: [
    { question: "Gemini와 Google Bard의 차이는 무엇인가요?", answer: "Bard는 Gemini의 이전 이름입니다. Google은 2024년 2월 서비스명을 Bard에서 Gemini로 변경했으며, 동시에 더 강력한 Gemini 1.5 Pro 모델로 업그레이드했습니다. 현재 Bard는 더 이상 존재하지 않고 모두 Gemini로 통합되었습니다." },
    { question: "Gemini 1M 토큰 컨텍스트를 어떻게 활용할 수 있나요?", answer: "1M 토큰 컨텍스트(약 750만 단어)로 전체 코드베이스, 긴 영화 대본, 대용량 연구 논문 등을 한 번에 분석할 수 있습니다. 예를 들어, 수백 페이지의 계약서를 업로드해 특정 조항을 질의하거나, 동영상 1시간 분량을 분석하는 것도 가능합니다." },
    { question: "Gemini가 Google Workspace와 어떻게 연동되나요?", answer: "Google Workspace 사용자는 Gmail에서 이메일 초안 작성, Google Docs에서 문서 생성·요약, Sheets에서 데이터 분석, Slides에서 프레젠테이션 자동 생성 등을 Gemini로 할 수 있습니다. Google Meet에서는 실시간 번역과 회의 요약도 지원합니다." },
    { question: "Gemini Advanced가 필요한 이유는 무엇인가요?", answer: "기본 Gemini는 Gemini 1.5 Flash 모델을 사용하지만, Gemini Advanced($19.99/월)는 가장 강력한 Gemini 1.5 Pro 모델을 제공합니다. 더 복잡한 추론, 긴 문서 분석, 멀티모달 이해, Google One 2TB 저장공간 등 추가 혜택이 포함됩니다." },
    { question: "Gemini로 코딩을 할 수 있나요?", answer: "네, Gemini는 코드 작성, 디버깅, 코드 설명을 지원합니다. Google Colab과 통합되어 Python 코드를 직접 실행할 수 있으며, GitHub Copilot의 대안으로도 사용됩니다. Android Studio와의 통합으로 모바일 앱 개발도 지원합니다." },
  ],
  perplexity: [
    { question: "Perplexity AI는 일반 검색 엔진과 무엇이 다른가요?", answer: "일반 검색 엔진(Google, Bing)은 링크 목록을 보여주지만, Perplexity는 여러 소스를 종합해 직접적인 답변을 제공합니다. 모든 답변에 출처를 인용해 신뢰성을 확인할 수 있으며, 후속 질문을 이어갈 수 있는 대화형 인터페이스를 제공합니다." },
    { question: "Perplexity의 출처 인용은 얼마나 정확한가요?", answer: "Perplexity는 실시간 웹 검색을 기반으로 답변을 생성하고 출처를 명시합니다. 하지만 AI가 내용을 요약·해석하는 과정에서 오류가 발생할 수 있으므로, 중요한 정보는 원문 출처를 직접 확인하는 것을 권장합니다." },
    { question: "Perplexity Pro와 무료 버전의 차이는 무엇인가요?", answer: "무료 버전은 기본 검색 기능과 GPT-3.5 수준의 모델을 제공합니다. Pro($20/월)는 GPT-4o, Claude 3.5, Gemini 등 최신 모델 선택 가능, 파일 업로드, 이미지 생성, Spaces 기능, 더 많은 Pro 검색 횟수를 제공합니다." },
    { question: "Perplexity Spaces는 무엇인가요?", answer: "Spaces는 특정 주제나 프로젝트를 위한 전용 리서치 공간입니다. 관련 문서를 업로드하고, AI에게 역할을 부여하고, 팀원과 공유해 협업 리서치를 할 수 있습니다. Pro 플랜에서 사용 가능합니다." },
  ],
  grok: [
    { question: "Grok을 사용하려면 X Premium이 필요한가요?", answer: "네, Grok은 X(트위터) Premium 구독자($8/월 또는 $84/년)를 위한 기능입니다. X Premium+ 구독자는 Grok에 더 많은 접근 권한을 받습니다. 별도로 grok.com을 통해 구독할 수도 있습니다." },
    { question: "Grok의 X 실시간 데이터 접근이란 무엇인가요?", answer: "Grok은 X(트위터)의 실시간 포스트와 트렌드에 접근할 수 있습니다. 이를 통해 최신 뉴스, 소셜 미디어 반응, 실시간 이벤트에 대한 최신 정보를 제공받을 수 있습니다. 다른 AI가 학습 데이터 기준 시점의 정보만 제공하는 것과 달리 실시간 정보를 활용합니다." },
    { question: "Grok의 이미지 생성 기능은 어떤가요?", answer: "Grok 2는 Aurora 모델을 통해 이미지를 생성할 수 있습니다. X의 스레드에서 직접 이미지를 생성하고 공유할 수 있으며, 텍스트 설명에서 다양한 스타일의 이미지를 만들어줍니다." },
    { question: "Grok과 ChatGPT 중 무엇이 더 나은가요?", answer: "용도에 따라 다릅니다. Grok은 X 실시간 데이터 접근과 덜 검열된 답변이 특징입니다. ChatGPT는 더 광범위한 기능(DALL-E, Code Interpreter, 플러그인), 더 긴 역사, 더 넓은 생태계를 갖추고 있습니다. X를 많이 사용하는 경우 Grok이 유리할 수 있습니다." },
  ],
  deepseek: [
    { question: "DeepSeek은 무료로 사용할 수 있나요?", answer: "네, DeepSeek의 웹 인터페이스(chat.deepseek.com)는 무료로 사용할 수 있습니다. API도 매우 저렴한 가격에 제공되며, 오픈소스 모델은 로컬에서 직접 실행할 수 있습니다. 무료 사용 한도가 다른 서비스에 비해 매우 넉넉한 편입니다." },
    { question: "DeepSeek R1이란 무엇인가요?", answer: "DeepSeek R1은 수학적 추론과 복잡한 문제 해결에 특화된 추론 모델입니다. Chain-of-thought 방식으로 단계적으로 생각하며 답을 도출합니다. OpenAI의 o1 모델과 비교되며, 일부 벤치마크에서 비슷한 수준의 성능을 보입니다." },
    { question: "DeepSeek의 데이터 보안은 어떻게 되나요?", answer: "DeepSeek은 중국 기업으로, 중국 법률에 따라 데이터를 처리합니다. 민감한 비즈니스 정보나 개인 정보를 다룰 때는 주의가 필요합니다. 보안이 중요한 경우 로컬에서 직접 실행 가능한 오픈소스 모델 버전을 사용하는 것을 권장합니다." },
    { question: "DeepSeek을 Ollama로 로컬에서 실행할 수 있나요?", answer: "네, DeepSeek 모델은 오픈소스로 공개되어 있어 Ollama, LM Studio 등을 통해 로컬에서 실행할 수 있습니다. 단, 전체 모델은 수십~수백 GB의 용량이 필요하므로 고사양 GPU가 필요합니다. 소형 양자화 버전도 제공됩니다." },
  ],
  "microsoft-copilot": [
    { question: "Microsoft Copilot은 완전 무료인가요?", answer: "기본 Microsoft Copilot(copilot.microsoft.com)은 무료로 GPT-4를 사용할 수 있습니다. Microsoft 365 Copilot은 기업용으로 Microsoft 365 구독($6.99/월~)에 추가로 제공됩니다. Windows 11에는 기본 내장되어 있어 별도 설치가 필요 없습니다." },
    { question: "Microsoft Copilot과 ChatGPT는 같은 기술인가요?", answer: "Microsoft Copilot은 OpenAI의 GPT-4 모델을 기반으로 하므로 기술적으로 유사합니다. 차이점은 Copilot이 Bing 검색과 통합되어 실시간 웹 정보를 제공하고, Microsoft 365(Word, Excel, Teams 등)와 통합된다는 점입니다. 인터페이스와 생태계 통합이 다릅니다." },
    { question: "Excel에서 Copilot을 어떻게 사용하나요?", answer: "Microsoft 365 Copilot이 활성화된 경우 Excel에서 자연어로 수식 작성, 데이터 분석, 차트 생성, 인사이트 추출을 요청할 수 있습니다. 예: '이 데이터에서 월별 매출 트렌드를 분석해줘'라고 입력하면 자동으로 분석 결과를 제공합니다." },
    { question: "Microsoft Copilot으로 이미지를 생성할 수 있나요?", answer: "네, Microsoft Copilot은 DALL-E 3 기반의 이미지 생성 기능(Image Creator)을 무료로 제공합니다. 텍스트로 원하는 이미지를 설명하면 고품질 이미지를 생성해줍니다. Bing Image Creator와 동일한 기능입니다." },
  ],
  "meta-ai": [
    { question: "Meta AI는 어떤 앱에서 사용할 수 있나요?", answer: "Meta AI는 WhatsApp, Instagram, Facebook, Messenger에 통합되어 있습니다. 각 앱에서 채팅 화면에 '@Meta AI'를 태그하거나 전용 Meta AI 탭을 통해 접근할 수 있습니다. meta.ai 웹사이트에서도 직접 사용 가능합니다." },
    { question: "Meta AI의 Llama 모델은 오픈소스인가요?", answer: "네, Meta의 Llama 모델은 오픈소스로 공개되어 있습니다. 개발자들은 Llama 모델을 직접 다운로드해 로컬에서 실행하거나, 파인튜닝해 자신의 서비스에 적용할 수 있습니다. 단, 상업적 이용에는 라이선스 조건이 있으므로 확인이 필요합니다." },
    { question: "Meta AI로 이미지를 생성하는 방법은?", answer: "Meta AI에서 '/imagine [이미지 설명]'이라고 입력하거나, 'Imagine' 기능을 활성화해 이미지를 생성할 수 있습니다. Instagram, WhatsApp, Messenger에서 그룹 채팅에서도 사용 가능합니다. 완전 무료로 제공됩니다." },
    { question: "Meta AI는 개인 정보를 수집하나요?", answer: "Meta AI는 Meta의 플랫폼에서 운영되므로 Meta의 개인정보 처리 방침이 적용됩니다. 대화 내용이 Meta 서비스 개선에 사용될 수 있습니다. 민감한 개인 정보는 입력하지 않는 것을 권장하며, Meta 계정 설정에서 데이터 사용을 관리할 수 있습니다." },
  ],
  poe: [
    { question: "Poe에서 어떤 AI 모델들을 사용할 수 있나요?", answer: "Poe에서는 GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Llama 3 등 다양한 최신 AI 모델을 한 곳에서 사용할 수 있습니다. 무료 플랜에서는 각 모델을 제한적으로 사용할 수 있으며, Premium($19.99/월)에서는 더 많은 사용량을 제공합니다." },
    { question: "Poe의 커스텀 봇은 무엇인가요?", answer: "Poe에서는 특정 역할, 페르소나, 지식 베이스를 가진 AI 봇을 직접 만들 수 있습니다. 만든 봇을 다른 사용자와 공유하거나 공개할 수 있으며, 인기 봇은 크리에이터 수익화 프로그램을 통해 수익을 얻을 수도 있습니다." },
    { question: "Poe와 ChatGPT를 직접 비교하는 게 의미 있나요?", answer: "ChatGPT는 OpenAI의 단일 서비스이지만, Poe는 ChatGPT를 포함한 여러 AI를 사용할 수 있는 플랫폼입니다. 여러 AI를 비교하거나 특정 작업에 최적의 AI를 찾고 싶을 때 Poe가 유용합니다. 단, 각 AI의 직접 인터페이스보다 기능이 제한될 수 있습니다." },
    { question: "Poe는 모바일 앱이 있나요?", answer: "네, Poe는 iOS와 Android 모바일 앱을 모두 제공합니다. 앱에서도 웹 버전과 동일하게 다양한 AI 모델을 사용할 수 있으며, 오프라인 지원은 제공되지 않습니다." },
  ],
  "character-ai": [
    { question: "Character AI는 어떤 용도로 사용하나요?", answer: "Character AI는 주로 창작 글쓰기, 롤플레이, 언어 학습, 엔터테인먼트 목적으로 사용됩니다. 역사 인물과 대화를 통한 학습, 소설 속 캐릭터와의 상호작용, 외국어 연습 파트너로 활용할 수 있습니다. 특히 10-20대 창작 커뮤니티에서 인기가 높습니다." },
    { question: "Character AI에서 나만의 캐릭터를 만들 수 있나요?", answer: "네, 누구나 무료로 AI 캐릭터를 만들 수 있습니다. 이름, 성격, 배경 스토리, 인사말 등을 설정하고 공개 또는 비공개로 배포할 수 있습니다. 인기 캐릭터는 수백만 명이 대화를 나누기도 합니다." },
    { question: "Character AI의 c.ai+ 구독은 무엇인가요?", answer: "c.ai+($9.99/월)는 Character AI의 프리미엄 구독으로, 더 빠른 응답 속도, 우선 접속 권한, 음성 대화 기능을 제공합니다. 무료 플랜에서도 모든 기본 기능을 사용할 수 있지만 피크 시간대에는 대기 시간이 있을 수 있습니다." },
    { question: "Character AI는 안전한가요?", answer: "Character AI는 미성년자 보호를 위한 필터링 시스템을 운영하고 있습니다. 18세 미만 사용자에게는 성인 콘텐츠가 차단됩니다. 다만 부모님들이 자녀의 사용을 모니터링하는 것을 권장하며, 과도한 의존 방지를 위한 사용 시간 관리가 중요합니다." },
  ],
  cursor: [
    { question: "Cursor와 VS Code의 차이점은 무엇인가요?", answer: "Cursor는 VS Code를 포크해 만들었기 때문에 VS Code의 모든 확장 프로그램과 설정을 그대로 사용할 수 있습니다. 차이점은 Cursor에 AI(Tab 자동완성, Composer, Chat)가 깊이 통합되어 있다는 점입니다. VS Code에서 GitHub Copilot을 쓰는 것보다 더 강력한 AI 기능을 제공합니다." },
    { question: "Cursor의 Composer 기능이란 무엇인가요?", answer: "Composer(현재 Agent 모드)는 여러 파일에 걸친 복잡한 코딩 작업을 AI가 자율적으로 수행하는 기능입니다. '새 API 엔드포인트를 추가하고 테스트 코드도 작성해줘'처럼 복잡한 요청을 하면 관련 파일들을 한 번에 생성·수정합니다." },
    { question: "Cursor 무료 플랜으로도 충분히 사용할 수 있나요?", answer: "무료 플랜은 제한된 횟수의 Pro 기능 사용과 기본 자동완성을 제공합니다. 취미 프로젝트나 가벼운 사용에는 충분할 수 있지만, 전문 개발자에게는 Pro($20/월)를 권장합니다. Pro는 무제한 AI 자동완성과 더 많은 Composer 사용을 포함합니다." },
    { question: "Cursor에서 어떤 AI 모델을 사용하나요?", answer: "Cursor는 Claude 3.5 Sonnet, GPT-4o, Claude 3 Opus 등 다양한 모델을 지원합니다. 기본적으로 코딩에 최적화된 모델을 자동 선택하며, 사용자가 직접 모델을 변경할 수도 있습니다. 각 모델은 속도와 품질 면에서 트레이드오프가 있습니다." },
    { question: "Cursor를 기존 VS Code 프로젝트에서 바로 사용할 수 있나요?", answer: "네, Cursor는 VS Code와 100% 호환됩니다. 기존 VS Code 설정, 확장 프로그램, 키바인딩을 한 번에 가져올 수 있습니다. 설치 후 'Import from VS Code' 옵션으로 즉시 기존 환경을 그대로 유지하면서 AI 기능을 추가로 사용할 수 있습니다." },
  ],
  windsurf: [
    { question: "Windsurf의 Cascade 에이전트는 어떻게 동작하나요?", answer: "Cascade는 코드 컨텍스트를 이해하고 여러 파일에 걸친 복잡한 작업을 자율적으로 수행하는 AI 에이전트입니다. 파일 생성, 수정, 터미널 명령 실행 등을 순서대로 계획하고 실행합니다. 사용자는 각 단계를 승인하거나 자동으로 진행하게 설정할 수 있습니다." },
    { question: "Windsurf 무료 플랜에는 어떤 기능이 있나요?", answer: "Windsurf는 무료 플랜에서도 강력한 AI 기능을 무제한으로 제공합니다(단, 일부 고급 모델과 기능은 사용량 제한 있음). Cascade 에이전트, AI 자동완성, Chat 기능 등을 무료로 사용할 수 있어, Cursor의 유료 플랜에 비용을 쓰기 전에 시도해볼 만합니다." },
    { question: "Cursor와 Windsurf 중 무엇을 선택해야 하나요?", answer: "Cursor는 더 성숙하고 안정적인 경험을 제공하며 대규모 커뮤니티가 있습니다. Windsurf는 무료 플랜이 더 관대하고 Cascade 에이전트가 강력합니다. 비용을 중시한다면 Windsurf, 안정성과 커뮤니티를 중시한다면 Cursor가 나을 수 있습니다. 둘 다 무료로 체험해보는 것을 권장합니다." },
    { question: "Windsurf는 어떤 프로그래밍 언어를 지원하나요?", answer: "Windsurf는 Python, JavaScript/TypeScript, Java, C/C++, Go, Rust, Ruby, PHP 등 대부분의 주요 프로그래밍 언어를 지원합니다. VS Code 기반이므로 VS Code에서 지원하는 모든 언어의 확장 프로그램도 사용 가능합니다." },
  ],
  "github-copilot": [
    { question: "GitHub Copilot은 어떤 IDE에서 사용할 수 있나요?", answer: "GitHub Copilot은 VS Code, Visual Studio, JetBrains(IntelliJ, PyCharm, WebStorm 등), Vim/Neovim, Xcode 등 대부분의 주요 IDE에서 플러그인으로 사용 가능합니다. 가장 넓은 IDE 호환성을 갖춘 AI 코딩 어시스턴트입니다." },
    { question: "GitHub Copilot 무료 플랜이 생겼나요?", answer: "네, 2024년 말부터 GitHub Copilot 무료 플랜이 출시되었습니다. 무료 플랜에서는 월 2,000회 자동완성과 제한된 Copilot Chat 사용이 가능합니다. 개인 개발자에게는 충분할 수 있으며, Individual($10/월)은 무제한 사용을 제공합니다." },
    { question: "GitHub Copilot으로 생성된 코드의 저작권은 누구에게 있나요?", answer: "Microsoft/GitHub의 이용약관에 따르면 Copilot이 생성한 코드의 저작권은 사용자에게 있습니다. GitHub는 생성된 코드가 기존 오픈소스 코드와 유사할 경우 해당 라이선스를 참조하도록 코드 참조 필터를 제공합니다." },
    { question: "Copilot Chat과 일반 Copilot의 차이는 무엇인가요?", answer: "일반 Copilot은 코드 편집기에서 인라인 자동완성을 제공합니다. Copilot Chat은 대화형 인터페이스로 코드 설명, 리뷰, 디버깅, 테스트 작성 등 더 복잡한 작업을 처리합니다. 최신 버전에서는 두 기능이 모두 기본 포함됩니다." },
    { question: "GitHub Copilot은 보안적으로 안전한가요?", answer: "GitHub Copilot Business/Enterprise 플랜은 코드가 학습 데이터로 사용되지 않습니다. 개인 플랜은 기본적으로 AI 학습에 사용될 수 있지만 설정에서 거부할 수 있습니다. 민감한 기업 코드의 경우 Business 플랜 사용을 권장합니다." },
  ],
  "claude-code": [
    { question: "Claude Code는 어떻게 설치하나요?", answer: "터미널에서 'npm install -g @anthropic-ai/claude-code' 명령으로 설치할 수 있습니다. Node.js 18+ 환경이 필요하며, 설치 후 Anthropic API 키를 설정하면 바로 사용할 수 있습니다. Claude Pro 구독자는 추가 비용 없이 사용 가능합니다." },
    { question: "Claude Code는 어떤 작업을 자율적으로 할 수 있나요?", answer: "Claude Code는 파일 읽기/쓰기/생성, 터미널 명령 실행, Git 작업(commit, branch, PR 등), 웹 검색, 코드 테스트 실행 등을 자율적으로 수행합니다. 복잡한 버그 수정, 기능 구현, 리팩터링 등을 '~해줘'라고 지시만 하면 수행합니다." },
    { question: "Claude Code와 Cursor의 차이점은 무엇인가요?", answer: "Cursor는 GUI 기반 코드 에디터로 시각적 인터페이스가 중심입니다. Claude Code는 터미널 기반으로 GUI 없이 명령줄에서 동작합니다. Claude Code는 에이전트로서 더 자율적인 작업 수행이 가능하지만, 익숙한 에디터 환경을 선호한다면 Cursor가 더 편리합니다." },
    { question: "Claude Code 사용 비용은 어떻게 되나요?", answer: "Claude Code는 Anthropic API를 사용하므로 토큰 기반으로 비용이 발생합니다. Claude Pro 구독자는 claude.ai에서 추가 비용 없이 사용할 수 있습니다. 복잡한 작업에서는 많은 토큰을 사용할 수 있으므로 비용 모니터링이 중요합니다." },
  ],
  "replit-ai": [
    { question: "Replit AI는 초보자에게 적합한가요?", answer: "네, Replit AI는 코딩을 처음 배우는 초보자에게 특히 유용합니다. 설치 없이 브라우저에서 바로 코딩을 시작할 수 있고, AI가 코드 작성을 도와주며 오류 해결 방법을 설명해줍니다. 50개 이상의 언어를 지원하므로 원하는 언어로 시작할 수 있습니다." },
    { question: "Replit에서 만든 앱을 공개적으로 배포할 수 있나요?", answer: "네, Replit에서 개발한 앱을 Replit 서버에서 직접 배포할 수 있습니다. 무료 플랜에서도 기본 배포가 가능하지만, 상시 실행을 위해서는 Core 플랜이 필요합니다. 생성된 URL로 전 세계 어디서나 접근 가능한 앱을 만들 수 있습니다." },
    { question: "Replit AI로 어떤 종류의 앱을 만들 수 있나요?", answer: "웹 앱(HTML/CSS/JS, React, Vue), 백엔드 API(Node.js, Python Flask/Django), 게임, 스크립트, 챗봇 등 다양한 종류의 앱을 만들 수 있습니다. AI Ghostwriter가 아이디어를 설명하면 코드를 자동으로 생성해줍니다." },
  ],
  bolt: [
    { question: "Bolt.new로 실제 배포 가능한 앱을 만들 수 있나요?", answer: "네, Bolt.new로 생성된 앱은 Netlify나 Vercel에 즉시 배포할 수 있습니다. React, Next.js 등 프로덕션 수준의 프레임워크로 코드를 생성하며, npm 패키지도 직접 설치·사용 가능합니다. 생성된 코드를 GitHub에 내보내 지속적으로 개발할 수도 있습니다." },
    { question: "Bolt.new와 Lovable의 차이점은 무엇인가요?", answer: "두 서비스 모두 자연어로 웹 앱을 생성하지만, Bolt는 StackBlitz의 WebContainers 기술로 브라우저 내에서 완전한 Node.js 환경을 실행하는 게 특징입니다. Lovable은 Supabase 백엔드 통합이 더 쉽고 GitHub 연동이 간편합니다. 프론트엔드 중심이면 v0, 풀스택이면 Bolt 또는 Lovable을 권장합니다." },
    { question: "Bolt.new 무료 플랜에서 얼마나 사용할 수 있나요?", answer: "Bolt.new 무료 플랜은 월 제한된 크레딧을 제공합니다. 간단한 프로토타입을 만들기에는 충분하지만, 복잡한 앱 개발이나 대용량 프로젝트에는 Pro($20/월)가 필요합니다. 사용량이 많아질 경우 코드를 로컬로 내보내 계속 개발하는 방법도 있습니다." },
    { question: "Bolt.new가 생성한 코드의 품질은 어떤가요?", answer: "Bolt.new는 Claude AI를 활용해 React, TypeScript, Tailwind CSS 기반의 깔끔한 코드를 생성합니다. 단순한 UI나 CRUD 앱은 즉시 사용 가능한 수준으로 생성되지만, 복잡한 비즈니스 로직이나 대규모 앱은 개발자의 추가 수정이 필요할 수 있습니다." },
  ],
  lovable: [
    { question: "Lovable로 어떤 종류의 앱을 만들 수 있나요?", answer: "Lovable은 SaaS 대시보드, 랜딩 페이지, 마케팅 사이트, CRUD 앱, 관리자 패널 등 다양한 웹 앱을 만들 수 있습니다. Supabase와 통합되어 사용자 인증, 데이터베이스, 파일 저장도 자동으로 설정됩니다. 비개발자도 몇 시간 만에 완전한 웹 앱을 만들 수 있습니다." },
    { question: "Lovable과 no-code 툴(Webflow, Bubble)의 차이는 무엇인가요?", answer: "Webflow, Bubble은 드래그 앤 드롭 방식의 노코드 툴로 특정 기능이 제한됩니다. Lovable은 실제 React/TypeScript 코드를 생성하므로 개발자가 코드를 직접 수정하고 확장할 수 있습니다. GitHub 연동으로 코드를 완전히 소유하고 관리할 수 있다는 것이 큰 장점입니다." },
    { question: "Lovable 무료 플랜으로 완성된 앱을 배포할 수 있나요?", answer: "Lovable 무료 플랜에서도 제한된 메시지 크레딧으로 앱을 만들고 Lovable 도메인으로 배포할 수 있습니다. 커스텀 도메인 연결과 더 많은 크레딧은 Starter($20/월) 이상에서 제공됩니다." },
  ],
  v0: [
    { question: "v0는 무엇을 만드는 데 특화되어 있나요?", answer: "v0는 UI 컴포넌트와 웹 페이지 디자인에 특화되어 있습니다. 텍스트 설명이나 이미지로 React 기반 UI를 즉시 생성하며, shadcn/ui와 Tailwind CSS를 기반으로 합니다. 완성된 앱보다는 UI 컴포넌트나 페이지 디자인을 빠르게 프로토타이핑하는 데 최적입니다." },
    { question: "v0에서 생성한 코드를 Next.js 프로젝트에 어떻게 사용하나요?", answer: "v0에서 생성된 코드를 복사해 Next.js 프로젝트에 붙여넣으면 됩니다. v0는 shadcn/ui 기반의 코드를 생성하므로, 'npx shadcn-ui@latest init'으로 설정된 Next.js 프로젝트에 바로 통합됩니다. 필요한 패키지 설치 명령도 함께 제공됩니다." },
    { question: "v0는 이미지를 UI로 변환할 수 있나요?", answer: "네, v0는 이미지나 스크린샷을 업로드하면 해당 디자인을 React 코드로 변환하는 기능을 지원합니다. 피그마 디자인이나 손으로 그린 와이어프레임도 코드로 변환할 수 있어 디자이너-개발자 협업에 유용합니다." },
    { question: "v0 무료 플랜의 제한은 무엇인가요?", answer: "v0 무료 플랜은 월 제한된 메시지 크레딧을 제공합니다. 간단한 컴포넌트를 만드는 데는 충분하지만, 많은 이터레이션이 필요한 프로젝트에는 Premium($20/월)이 필요할 수 있습니다. 생성된 코드는 무료로 내보내고 사용할 수 있습니다." },
  ],
  continue: [
    { question: "Continue는 어떤 AI 모델을 지원하나요?", answer: "Continue는 OpenAI(GPT-4), Anthropic(Claude), Google(Gemini), Ollama(로컬 모델), Together AI, Mistral, Cohere 등 거의 모든 주요 AI 제공자를 지원합니다. 설정 파일(config.json)에서 사용할 모델과 API 키를 자유롭게 설정할 수 있습니다." },
    { question: "Continue로 로컬 AI 모델을 사용할 수 있나요?", answer: "네, Continue는 Ollama, LM Studio 등을 통한 로컬 모델 실행을 완벽히 지원합니다. 코드가 외부 서버로 전송되지 않아 기업 보안 정책을 준수할 수 있습니다. 다만 로컬 모델은 클라우드 모델보다 성능이 낮을 수 있습니다." },
    { question: "Continue는 완전히 무료인가요?", answer: "Continue 플러그인 자체는 완전 오픈소스·무료입니다. 단, AI 모델 API 사용 비용은 별도입니다. 로컬 모델(Ollama 등)을 사용하면 AI 사용 비용도 완전 무료로 사용할 수 있습니다. 오픈소스이므로 자체 서버에서 운영도 가능합니다." },
  ],
  cline: [
    { question: "Cline의 자율 에이전트 기능은 어디까지 할 수 있나요?", answer: "Cline은 파일 생성·수정·삭제, 터미널 명령 실행(npm install, git commit 등), 브라우저 제어(웹 스크래핑, 테스트), API 호출까지 자율적으로 수행합니다. 다만 각 중요한 액션 전에 사용자에게 승인을 요청하므로, 예상치 못한 동작을 방지할 수 있습니다." },
    { question: "Cline 사용 비용은 어떻게 되나요?", answer: "Cline 플러그인 자체는 무료이지만, AI API 비용이 발생합니다. Claude 3.5 Sonnet API를 사용하는 경우 복잡한 작업 시 $1~$5 정도의 비용이 발생할 수 있습니다. 비용 모니터링 기능이 내장되어 있어 사용량을 확인할 수 있습니다." },
    { question: "Cline과 Claude Code의 차이점은 무엇인가요?", answer: "Cline은 VS Code 플러그인으로 기존 에디터 환경에서 동작합니다. Claude Code는 터미널 기반 독립 도구입니다. Cline은 다양한 AI API를 선택할 수 있고 VS Code UI를 유지하는 게 장점이며, Claude Code는 Anthropic 공식 도구로 더 긴밀한 통합이 특징입니다." },
    { question: "Cline에서 MCP 서버란 무엇인가요?", answer: "MCP(Model Context Protocol)는 AI 에이전트가 외부 도구와 데이터 소스에 접근하는 표준 프로토콜입니다. Cline에서 MCP 서버를 연결하면 데이터베이스 조회, 웹 검색, 파일 시스템 접근 등 다양한 외부 기능을 AI 에이전트가 활용할 수 있습니다." },
  ],
  midjourney: [
    { question: "Midjourney를 사용하려면 Discord가 필요한가요?", answer: "초기에는 Discord가 필수였지만, 이제 Midjourney 웹사이트(midjourney.com)에서 직접 사용할 수 있습니다. 웹 인터페이스에서 이미지 생성, 갤러리 관리, 이미지 설정 등을 더 편리하게 이용할 수 있습니다." },
    { question: "Midjourney로 생성한 이미지를 상업적으로 사용할 수 있나요?", answer: "Standard($30/월) 이상 플랜 구독자는 상업적 이용이 가능합니다. Basic($10/월) 플랜은 개인 비상업적 용도에 한정됩니다. 생성된 이미지의 저작권은 구독자에게 있으며, 기업 사용은 Pro 플랜을 권장합니다." },
    { question: "Midjourney v6와 이전 버전의 차이는 무엇인가요?", answer: "Midjourney v6는 사진 사실성, 텍스트 렌더링, 프롬프트 이해 능력이 크게 향상되었습니다. 특히 이미지 내 텍스트 삽입이 v5까지는 불완전했지만 v6에서 크게 개선되었습니다. 자연어 프롬프트를 더 잘 이해하며 캐릭터 일관성도 향상되었습니다." },
    { question: "Midjourney 프롬프트를 잘 쓰는 방법은?", answer: "효과적인 프롬프트는 '주제 + 스타일 + 기술적 설정'으로 구성됩니다. 예: 'a futuristic city at night, cyberpunk style, neon lights, 8k resolution, cinematic lighting --ar 16:9 --style raw'. 부정어(--no)로 원하지 않는 요소를 제외하고, 비중(::)으로 요소의 중요도를 조절할 수 있습니다." },
    { question: "Midjourney에서 Remix 모드란 무엇인가요?", answer: "Remix 모드는 기존 이미지를 변형해 새로운 이미지를 만드는 기능입니다. 이미지를 Vary(변형)할 때 프롬프트를 수정해 원본 구조를 유지하면서 다른 스타일이나 요소를 추가할 수 있습니다. 일관된 캐릭터나 장면을 다양하게 변형할 때 유용합니다." },
  ],
  "leonardo-ai": [
    { question: "Leonardo AI가 게임 개발에 특화된 이유는 무엇인가요?", answer: "Leonardo AI는 처음부터 게임 에셋 생성을 목표로 개발되었습니다. 픽셀 아트, 아이소메트릭 뷰, 캐릭터 시트, 타일셋 등 게임에 특화된 모델을 제공합니다. 또한 일관된 캐릭터 생성, 에셋 패키지 묶음 생성, 배경 투명화 등 게임 개발에 필요한 기능들을 갖추고 있습니다." },
    { question: "Leonardo AI 무료 플랜으로 상업적 이용이 가능한가요?", answer: "Leonardo AI 무료 플랜(150 토큰/일)은 개인 비상업적 목적으로 사용할 수 있습니다. Apprentice($12/월) 이상 유료 플랜에서는 상업적 이용이 가능합니다. 생성된 이미지 소유권은 유료 플랜 사용자에게 있습니다." },
    { question: "Leonardo AI의 Motion 기능은 무엇인가요?", answer: "Motion은 Leonardo AI의 이미지-투-비디오 기능입니다. 생성한 이미지에 움직임을 추가해 짧은 애니메이션 영상을 만들 수 있습니다. 소셜 미디어 콘텐츠나 게임 프리뷰 영상 등에 활용할 수 있습니다." },
  ],
  "adobe-firefly": [
    { question: "Adobe Firefly가 '상업적으로 안전하다'는 의미는 무엇인가요?", answer: "Adobe Firefly는 저작권이 있는 이미지를 학습 데이터로 사용하지 않았습니다. Adobe Stock의 라이선스 이미지와 공개 도메인 콘텐츠로만 훈련되었기 때문에, 생성된 이미지를 상업적으로 사용해도 저작권 분쟁 위험이 낮습니다. 기업 마케팅, 광고 등에 안전하게 활용할 수 있습니다." },
    { question: "Adobe Creative Cloud 없이도 Firefly를 사용할 수 있나요?", answer: "네, firefly.adobe.com에서 Adobe 계정만 있으면 무료로 Firefly를 사용할 수 있습니다. 월 25개의 생성 크레딧이 무료 제공됩니다. Creative Cloud 구독자는 더 많은 크레딧과 Photoshop, Illustrator 등 앱 내 통합 기능을 사용할 수 있습니다." },
    { question: "Firefly의 Generative Fill은 어떻게 사용하나요?", answer: "Photoshop에서 이미지의 특정 부분을 선택 도구로 선택한 후, Generative Fill 버튼을 클릭하고 원하는 내용을 텍스트로 입력합니다. 빈 공간을 채우거나, 기존 요소를 다른 것으로 교체하거나, 이미지를 확장(Generative Expand)하는 데 사용할 수 있습니다." },
  ],
  runway: [
    { question: "Runway Gen-3 Alpha로 얼마나 긴 영상을 만들 수 있나요?", answer: "Runway Gen-3 Alpha로 최대 10초 길이의 영상을 생성할 수 있습니다. 짧은 클립들을 이어붙여 더 긴 영상을 만들 수 있으며, 영상 편집 도구로 이를 조합할 수 있습니다. 향후 더 긴 영상 지원이 계획되어 있습니다." },
    { question: "Runway는 할리우드에서도 사용하나요?", answer: "네, Runway는 영화 '에브리씽 에브리웨어 올 앳 원스' 등 여러 상업 영화의 시각 효과 작업에 사용되었습니다. 할리우드 스튜디오들이 VFX 파이프라인에 통합하고 있으며, 독립 영화 제작자부터 대형 스튜디오까지 폭넓게 활용됩니다." },
    { question: "Runway 무료 플랜은 어떤 기능을 제공하나요?", answer: "Runway 무료 플랜은 125 크레딧(영상 약 25초 분량)을 제공합니다. 기본적인 영상 생성을 체험해볼 수 있지만, 지속적인 사용에는 Standard($15/월) 이상이 필요합니다. 생성된 영상에는 Runway 워터마크가 포함됩니다." },
    { question: "텍스트로 영상을 만들 때 좋은 프롬프트 예시는?", answer: "효과적인 프롬프트 예시: 'A serene mountain lake at golden hour, camera slowly panning right, birds flying in the distance, cinematic 4K'. 구체적인 카메라 움직임(pan, zoom, tilt), 조명 조건, 분위기, 움직임을 묘사하면 더 원하는 결과를 얻을 수 있습니다." },
  ],
  pika: [
    { question: "Pika로 만든 영상의 길이는 얼마나 되나요?", answer: "Pika로 생성되는 영상은 기본 3초이며, 최대 10초까지 설정할 수 있습니다. Extend 기능으로 영상을 이어 붙여 더 긴 클립을 만들 수 있습니다. 짧지만 고품질의 클립을 빠르게 생성하는 데 최적화되어 있습니다." },
    { question: "Pika에서 Pikaffects는 무엇인가요?", answer: "Pikaffects는 Pika만의 독특한 시각 효과 기능입니다. '폭발', '녹아내리기', '눈보라', '불에 타기' 등 극적인 효과를 이미지에 적용해 독창적인 영상을 만들 수 있습니다. 소셜 미디어 콘텐츠나 창작 프로젝트에 특히 인기 있는 기능입니다." },
    { question: "Pika 무료 플랜에서 워터마크 없이 사용할 수 있나요?", answer: "Pika 무료 플랜에서 생성된 영상에는 Pika 워터마크가 포함됩니다. Basic($8/월) 이상 유료 플랜에서는 워터마크 없이 영상을 다운로드할 수 있습니다. 상업적 이용 목적이라면 유료 플랜 가입을 권장합니다." },
  ],
  heygen: [
    { question: "HeyGen에서 아바타 비디오를 만들려면 어떻게 하나요?", answer: "1) HeyGen 가입 후 아바타 선택(100+ AI 아바타 중 선택) → 2) 스크립트 텍스트 입력 또는 음성 업로드 → 3) 배경, 자막, 화면 레이아웃 설정 → 4) 생성 클릭 (보통 수 분 소요). 완성된 영상을 다운로드하거나 링크로 공유할 수 있습니다." },
    { question: "HeyGen의 자동 더빙 기능은 어떻게 동작하나요?", answer: "HeyGen Video Translation 기능은 영상 파일을 업로드하면 원본 화자의 목소리와 유사한 음성으로 다른 언어로 자동 더빙합니다. 130개 이상의 언어를 지원하며, 입술 움직임도 자동으로 동기화됩니다. 마케팅 영상이나 교육 콘텐츠를 다국어로 제작할 때 매우 효율적입니다." },
    { question: "HeyGen으로 내 얼굴을 아바타로 만들 수 있나요?", answer: "네, HeyGen의 Instant Avatar 기능으로 2분 분량의 영상을 촬영·업로드하면 자신의 디지털 아바타를 만들 수 있습니다. 이후 텍스트만 입력하면 자신의 모습과 목소리로 영상이 자동 생성됩니다. 고품질 커스텀 아바타는 Studio Avatar 생성 서비스를 이용할 수 있습니다." },
    { question: "HeyGen의 무료 플랜 혜택은 무엇인가요?", answer: "HeyGen 무료 플랜은 월 1분 분량의 영상 크레딧을 제공합니다. 기능을 체험해보기에는 적당하지만, 정기적인 영상 제작에는 Creator($29/월) 이상이 필요합니다. 무료 영상에는 HeyGen 워터마크가 포함됩니다." },
  ],
  synthesia: [
    { question: "Synthesia는 어떤 기업들이 사용하나요?", answer: "Synthesia는 Google, Reuters, Zoom, Heineken 등 세계 50,000개 이상의 기업이 사용합니다. 주로 기업 교육 콘텐츠, 내부 커뮤니케이션, 제품 설명 영상, 고객 서비스 영상 제작에 활용됩니다." },
    { question: "Synthesia의 SCORM 내보내기 기능은 무엇인가요?", answer: "SCORM은 e-learning 표준 포맷입니다. Synthesia에서 제작한 영상을 SCORM 파일로 내보내면 Moodle, Canvas, Cornerstone 등 주요 LMS(학습 관리 시스템)에 바로 업로드해 교육 과정으로 활용할 수 있습니다. 기업 e-learning 제작에 매우 유용합니다." },
    { question: "Synthesia와 HeyGen의 차이점은 무엇인가요?", answer: "두 서비스 모두 AI 아바타 비디오를 생성하지만, Synthesia는 기업 B2B 시장에 더 집중되어 있고 ISO 27001 보안 인증, SCORM 내보내기, 브랜드 키트 등 기업 기능이 더 강합니다. HeyGen은 가격이 낮고 음성 클로닝과 자동 더빙이 강점이며 개인 크리에이터도 많이 사용합니다." },
  ],
  elevenlabs: [
    { question: "ElevenLabs로 음성을 클론하려면 얼마나 많은 샘플이 필요한가요?", answer: "Instant Voice Clone은 1분 이상의 오디오 샘플(이상적으로는 3-5분)로 기본적인 음성 클론을 만들 수 있습니다. Professional Voice Clone은 더 많은 샘플(30분+)이 필요하지만 더 정확한 클론을 생성합니다. 노이즈가 없는 깨끗한 오디오 품질이 중요합니다." },
    { question: "ElevenLabs 무료 플랜에서 어느 정도 사용할 수 있나요?", answer: "무료 플랜은 월 10,000 문자(약 10분 분량의 오디오)를 제공합니다. 3개의 커스텀 음성 생성이 가능하며, 생성 속도는 느릴 수 있습니다. 더 많은 생성량과 빠른 속도, 고품질 음성이 필요하다면 Starter($5/월) 이상을 권장합니다." },
    { question: "ElevenLabs로 생성한 음성을 상업적으로 사용할 수 있나요?", answer: "Creator($22/월) 이상 플랜에서는 생성한 오디오를 상업적으로 활용할 수 있습니다. 무료 및 Starter 플랜의 음성은 개인/비상업 목적에 제한됩니다. 상업 프로젝트, 팟캐스트 수익화, 오디오북 판매 등에는 반드시 적합한 플랜을 사용하세요." },
    { question: "ElevenLabs의 AI 더빙은 어떻게 동작하나요?", answer: "영상 파일을 업로드하면 ElevenLabs가 자동으로 음성을 감지·분리하고 지정한 언어로 번역·합성합니다. 원본 화자의 목소리 특성을 최대한 유지하면서 29개 언어로 더빙합니다. 자막도 함께 생성되며, 다국어 콘텐츠 제작 시간을 90% 이상 단축할 수 있습니다." },
    { question: "ElevenLabs Conversational AI API는 무엇인가요?", answer: "실시간 음성 대화를 위한 API입니다. 텍스트를 음성으로 변환하는 TTS API와 달리, 대화의 응답을 실시간으로 음성으로 합성해 100ms 미만의 지연시간으로 자연스러운 음성 대화 봇을 만들 수 있습니다. 고객 서비스 봇, 언어 학습 앱 등에 활용됩니다." },
  ],
  "notion-ai": [
    { question: "Notion AI와 일반 ChatGPT의 차이는 무엇인가요?", answer: "Notion AI는 Notion 워크스페이스 내에서 직접 동작해 기존 문서, 데이터베이스, 페이지 내용을 맥락으로 활용합니다. ChatGPT는 외부 서비스이므로 Notion 콘텐츠를 직접 참조하지 못합니다. 업무와 콘텐츠가 Notion에 집중되어 있다면 Notion AI가 훨씬 효율적입니다." },
    { question: "Notion AI Q&A 기능은 어떻게 동작하나요?", answer: "Notion AI Q&A는 워크스페이스 전체의 페이지, 데이터베이스, 문서를 인덱싱해 자연어 질문에 답변합니다. 예를 들어 '작년 마케팅 예산이 얼마였나요?'라고 질문하면 관련 페이지를 찾아 답변하고 출처 링크를 제공합니다. 팀의 지식을 빠르게 검색할 때 매우 유용합니다." },
    { question: "Notion AI 비용은 어떻게 부과되나요?", answer: "Notion AI는 Notion 기본 구독과 별개로 $10/월 (연간 결제 시 $8/월)의 애드온 요금이 부과됩니다. 팀 플랜에서는 구성원 1인당 $10/월이므로, 팀 전체가 사용하면 비용이 상당할 수 있습니다. 자주 사용하는 팀원에게는 충분한 가치를 제공합니다." },
  ],
  grammarly: [
    { question: "Grammarly는 한국어를 지원하나요?", answer: "현재 Grammarly는 주로 영어 문서에 특화되어 있습니다. 한국어 문서에는 제한적인 지원만 제공됩니다. 한국어 글쓰기 보조가 필요하다면 ChatGPT, Claude, Notion AI 등 다국어를 지원하는 AI를 활용하는 것이 더 효과적입니다." },
    { question: "Grammarly와 Microsoft Editor의 차이는 무엇인가요?", answer: "Grammarly는 더 정교한 문법 교정, 스타일 제안, 표절 검사(Premium), GrammarlyGO 생성 AI를 제공합니다. Microsoft Editor는 Microsoft 365에 내장되어 무료로 사용 가능하지만 기능이 더 기본적입니다. 전문적인 글쓰기가 중요하다면 Grammarly가 더 뛰어납니다." },
    { question: "Grammarly Premium의 가장 유용한 기능은 무엇인가요?", answer: "Premium의 핵심 기능은 ① 명확성·간결성 제안(문장 구조 개선) ② 어조 감지 및 개선 ③ 어휘 다양성 제안 ④ 가독성 분석 ⑤ 표절 검사입니다. 학술 논문, 비즈니스 이메일, 블로그 포스팅 등 전문적인 글쓰기에서 특히 가치 있습니다." },
  ],
  notebooklm: [
    { question: "NotebookLM에 어떤 소스를 업로드할 수 있나요?", answer: "PDF 파일, Google Docs, Google Slides, YouTube URL, 웹사이트 URL, 텍스트 복사 붙여넣기를 지원합니다. 노트북당 최대 50개 소스, 각 소스당 최대 500,000 단어까지 지원합니다. 업로드된 소스만을 기반으로 답변하므로 정확성이 높습니다." },
    { question: "NotebookLM의 Audio Overview(팟캐스트) 기능은 어떻게 사용하나요?", answer: "소스를 업로드한 후 'Audio Overview' 버튼을 클릭하면 두 명의 AI 호스트가 업로드한 자료를 토론하는 팟캐스트 형식의 오디오가 자동 생성됩니다. 복잡한 연구 논문이나 긴 문서를 귀로 들으며 이해하고 싶을 때 매우 유용합니다." },
    { question: "NotebookLM은 완전히 무료인가요?", answer: "네, NotebookLM은 현재 완전 무료로 제공됩니다. Google 계정만 있으면 notebooklm.google.com에서 바로 사용할 수 있습니다. 유료 플랜(NotebookLM Plus)도 출시되어 더 많은 노트북과 소스, 오디오 생성 등을 제공합니다." },
    { question: "NotebookLM은 업로드한 문서 외의 정보를 사용하나요?", answer: "NotebookLM은 업로드된 소스만을 기반으로 답변합니다. 외부 인터넷 검색이나 AI 사전 학습 지식을 혼합하지 않아, 할루시네이션(AI 환각) 위험이 크게 낮아집니다. 모든 답변에는 해당 소스 내 인용 위치가 표시됩니다." },
  ],
  "canva-ai": [
    { question: "Canva AI를 사용하려면 디자인 경험이 필요한가요?", answer: "전혀 필요 없습니다. Canva는 '누구나 디자이너가 될 수 있다'는 철학으로 만들어졌습니다. Magic Design 기능은 내용을 설명하면 자동으로 전문적인 디자인을 생성해줍니다. 100만+ 템플릿 중 원하는 것을 선택해 텍스트만 수정해도 훌륭한 결과물을 얻을 수 있습니다." },
    { question: "Canva AI로 생성한 이미지를 상업적으로 사용할 수 있나요?", answer: "Canva Pro($15/월) 이상에서 생성한 이미지는 상업적으로 사용할 수 있습니다. 무료 플랜에서 사용 가능한 템플릿과 요소도 일부 상업적 이용이 가능하지만, 'Pro' 마크가 붙은 요소는 Pro 구독 없이는 상업적으로 사용할 수 없습니다." },
    { question: "Canva AI의 Magic Eraser는 어떻게 사용하나요?", answer: "이미지를 Canva에 업로드한 후 'Edit image' → 'Magic Eraser'를 선택하고, 제거하고 싶은 부분을 브러시로 칠하면 AI가 자동으로 해당 부분을 지우고 배경을 자연스럽게 채워줍니다. Pro 기능이며 배경 제거, 워터마크 제거 등에 활용됩니다." },
    { question: "Canva와 Adobe Express의 차이는 무엇인가요?", answer: "두 서비스 모두 비전문가용 디자인 툴이지만, Canva는 더 방대한 무료 콘텐츠, 더 직관적인 UI, 더 활성화된 커뮤니티를 갖추고 있습니다. Adobe Express는 Adobe 생태계(Photoshop, Illustrator 에셋) 통합이 강점입니다. 일반적으로 Canva가 더 사용하기 쉬운 편입니다." },
  ],
  "figma-ai": [
    { question: "Figma AI는 Figma를 모르는 사람도 사용할 수 있나요?", answer: "Figma AI는 Figma 플랫폼 내에 통합된 기능이므로 Figma를 기본적으로 알아야 합니다. 하지만 AI 기능이 복잡한 작업을 자동화해주므로 Figma 초보자도 더 쉽게 디자인을 시작할 수 있습니다. Figma 자체 학습 과정을 먼저 거치는 것을 권장합니다." },
    { question: "Figma Dev Mode에서 AI 코드 생성은 어떻게 사용하나요?", answer: "Dev Mode에서 디자인 요소를 선택하면 AI가 해당 컴포넌트의 CSS, React, Swift, Android XML 코드를 자동으로 생성합니다. 개발자는 디자인 파일을 직접 보며 정확한 구현 코드를 얻을 수 있어 디자이너-개발자 간 핸드오프가 크게 간소화됩니다." },
    { question: "Figma AI의 텍스트 콘텐츠 자동 채우기 기능은 무엇인가요?", answer: "디자인에 빈 텍스트 박스가 있을 때 'Fill with AI'를 선택하면 맥락에 맞는 더미 콘텐츠를 자동으로 채워줍니다. 예를 들어 사용자 프로필 카드의 이름, 직위, 회사 필드를 현실적인 데이터로 자동 채워 실제처럼 보이는 디자인 목업을 빠르게 만들 수 있습니다." },
    { question: "Figma AI는 실제 디자이너를 대체할 수 있나요?", answer: "아직은 아닙니다. Figma AI는 반복적인 작업을 자동화하고 생산성을 높이는 도구이지, 디자인 사고와 창의성, 사용자 리서치, 브랜드 전략 등 디자이너의 핵심 역량을 대체하지는 못합니다. 오히려 디자이너가 AI를 도구로 활용해 더 고차원적인 작업에 집중할 수 있게 해줍니다." },
  ],
};

function generateGenericFAQs(tool: Tool): FAQ[] {
  const faqs: FAQ[] = [];

  if (tool.free_plan) {
    faqs.push({
      question: `${tool.name} 무료 버전은 어디까지 사용할 수 있나요?`,
      answer: `${tool.name}은 무료 플랜을 제공합니다. 기본 기능은 무료로 사용할 수 있으며, 더 많은 사용량과 고급 기능이 필요한 경우 유료 플랜(${tool.pricing})으로 업그레이드할 수 있습니다.`,
    });
  }

  if (tool.api_support) {
    faqs.push({
      question: `${tool.name} API는 어떻게 사용할 수 있나요?`,
      answer: `${tool.name}은 공식 API를 제공합니다. ${tool.company}의 개발자 문서를 참조해 API 키를 발급받고 자신의 앱이나 서비스에 통합할 수 있습니다. API 사용량에 따라 별도 요금이 부과됩니다.`,
    });
  }

  if (tool.mobile_app) {
    faqs.push({
      question: `${tool.name} 모바일 앱은 어디서 다운로드할 수 있나요?`,
      answer: `${tool.name}은 iOS App Store와 Google Play Store에서 모바일 앱을 다운로드할 수 있습니다. 앱을 통해 언제 어디서든 편리하게 사용할 수 있습니다.`,
    });
  }

  faqs.push({
    question: `${tool.name}의 주요 대안은 무엇인가요?`,
    answer: `${tool.name}의 주요 대안으로는 ${tool.alternatives.slice(0, 3).join(", ")} 등이 있습니다. AIHub에서 이러한 도구들을 직접 비교해보세요.`,
  });

  return faqs.slice(0, 4);
}

export function getToolFAQs(tool: Tool): FAQ[] {
  const specific = TOOL_FAQS[tool.slug];
  if (specific && specific.length >= 3) return specific;
  return generateGenericFAQs(tool);
}

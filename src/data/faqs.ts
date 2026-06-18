import type { Tool } from "@/lib/types";
import type { Lang } from "@/lib/i18n";

export interface FAQ {
  question: string;
  answer: string;
}

type BilingualFAQs = { en: FAQ[]; ko: FAQ[] };

const TOOL_FAQS: Record<string, BilingualFAQs> = {
  chatgpt: {
    en: [
      { question: "What's the difference between ChatGPT Free and Plus?", answer: "The free plan uses GPT-4o mini with daily usage limits. Plus ($20/mo) gives priority access to GPT-4o, DALL-E image generation, advanced data analysis, file uploads, and higher usage limits with faster response speeds." },
      { question: "Can ChatGPT generate images?", answer: "Yes — ChatGPT Plus and above can generate images via DALL-E 3. Just describe what you want in text and it will produce a high-quality image. Image generation is limited on the free plan." },
      { question: "Is the ChatGPT API the same as the website?", answer: "No. The website is a consumer interface; the API lets developers integrate GPT models into their own apps. The API is usage-based and gives finer control over model parameters and settings." },
      { question: "Does ChatGPT store my conversations for training?", answer: "By default, conversations may be used to improve the model. You can opt out in Settings → Data Controls. Plus/Enterprise plans can disable training data usage entirely. Avoid sharing sensitive information in any case." },
    ],
    ko: [
      { question: "ChatGPT 무료 플랜과 Plus 플랜의 차이는 무엇인가요?", answer: "무료 플랜은 GPT-4o mini 모델을 사용하며 일일 사용량 제한이 있습니다. Plus($20/월)는 GPT-4o 모델에 우선 접근이 가능하고, DALL-E 이미지 생성, 고급 데이터 분석, 파일 업로드 등 더 많은 기능을 제공합니다." },
      { question: "ChatGPT로 이미지를 생성할 수 있나요?", answer: "네, ChatGPT Plus 이상 플랜에서 DALL-E 3 모델을 통해 이미지를 생성할 수 있습니다. 텍스트로 원하는 이미지를 설명하면 고품질 이미지를 생성해줍니다. 무료 플랜에서는 이미지 생성 기능이 제한됩니다." },
      { question: "ChatGPT API와 ChatGPT 웹사이트는 같은 건가요?", answer: "아닙니다. ChatGPT 웹사이트는 일반 사용자를 위한 인터페이스이며, API는 개발자가 자신의 앱에 GPT 모델을 통합할 때 사용합니다. API는 사용량에 따라 요금이 부과됩니다." },
      { question: "ChatGPT 대화 내용이 학습 데이터로 사용되나요?", answer: "기본 설정에서는 대화 내용이 모델 개선에 사용될 수 있습니다. 설정에서 'Data Controls'를 통해 이를 거부할 수 있으며, Plus/Enterprise 플랜에서는 데이터가 학습에 사용되지 않도록 설정할 수 있습니다." },
    ],
  },
  claude: {
    en: [
      { question: "How long is Claude's 200K token context in practice?", answer: "200K tokens is roughly 150,000 words — about 600 book pages. This lets you analyze entire legal documents, full codebases, or multiple PDFs in a single conversation, far exceeding most AI services (typically 4K–8K tokens)." },
      { question: "Is Claude better than ChatGPT for coding?", answer: "Many developers prefer Claude for complex code reviews and analyzing long codebases. Claude 3.5 Sonnet scores highly on coding benchmarks, and the 200K context is a major advantage for large files. ChatGPT has the edge with Code Interpreter for running code directly." },
      { question: "Does Claude support web search?", answer: "The standard Claude web interface does not include real-time web search by default — it relies on its training data. Some integrations via the Claude API can add web search as a tool, but it's not built in for regular chat users." },
      { question: "What is the Artifacts feature?", answer: "Artifacts displays Claude-generated code, HTML, or markdown in a side panel with a live preview. For example, a React component you request renders instantly in the panel, and edits reflect in real-time as you continue the conversation." },
    ],
    ko: [
      { question: "Claude의 200K 토큰 컨텍스트는 어느 정도 분량인가요?", answer: "200K 토큰은 약 150만 단어 또는 책 약 600페이지 분량에 해당합니다. 긴 법률 문서, 코드베이스 전체, 여러 PDF를 한 번에 분석할 수 있습니다." },
      { question: "Claude와 ChatGPT 중 코딩에는 어떤 게 더 좋나요?", answer: "많은 개발자들이 코딩, 특히 복잡한 코드 리뷰와 긴 코드베이스 분석에서 Claude를 선호합니다. Claude 3.5 Sonnet은 코딩 벤치마크에서 높은 점수를 기록했으며, 200K 컨텍스트가 강점입니다." },
      { question: "Claude는 웹 검색을 지원하나요?", answer: "현재 Claude 웹 인터페이스에서는 기본적으로 실시간 웹 검색을 지원하지 않습니다. 학습 데이터 기준 시점까지의 정보만 활용합니다." },
      { question: "Artifacts 기능은 무엇인가요?", answer: "Artifacts는 Claude가 생성한 코드, HTML, 마크다운 문서 등을 독립된 창에서 실시간으로 미리볼 수 있는 기능입니다. React 컴포넌트를 작성하면 즉시 렌더링되어 확인할 수 있습니다." },
    ],
  },
  gemini: {
    en: [
      { question: "What happened to Google Bard?", answer: "Bard was renamed Gemini in February 2024, when Google also upgraded the underlying model to Gemini 1.5 Pro. Bard no longer exists — everything is now Gemini." },
      { question: "How can I use Gemini's 1M token context?", answer: "1M tokens (roughly 750,000 words) lets you analyze entire codebases, feature-length movie scripts, or large research papers in one session. You can upload hundreds of pages of contracts or an hour of video and query them directly." },
      { question: "How does Gemini integrate with Google Workspace?", answer: "Workspace users can use Gemini to draft emails in Gmail, generate and summarize documents in Docs, analyze data in Sheets, and auto-create presentations in Slides. Google Meet offers real-time translation and meeting summaries." },
      { question: "Why upgrade to Gemini Advanced?", answer: "The free tier uses Gemini 1.5 Flash. Advanced ($19.99/mo) unlocks Gemini 1.5 Pro — significantly stronger reasoning, longer document analysis, better multimodal understanding — plus 2 TB of Google One storage." },
    ],
    ko: [
      { question: "Gemini와 Google Bard의 차이는 무엇인가요?", answer: "Bard는 Gemini의 이전 이름입니다. Google은 2024년 2월 서비스명을 Bard에서 Gemini로 변경했으며, 더 강력한 Gemini 1.5 Pro 모델로 업그레이드했습니다." },
      { question: "Gemini 1M 토큰 컨텍스트를 어떻게 활용할 수 있나요?", answer: "1M 토큰으로 전체 코드베이스, 긴 영화 대본, 대용량 연구 논문 등을 한 번에 분석할 수 있습니다. 수백 페이지의 계약서를 업로드해 특정 조항을 질의하는 것도 가능합니다." },
      { question: "Gemini가 Google Workspace와 어떻게 연동되나요?", answer: "Gmail에서 이메일 초안 작성, Google Docs에서 문서 생성·요약, Sheets에서 데이터 분석, Slides에서 프레젠테이션 자동 생성 등을 Gemini로 할 수 있습니다." },
      { question: "Gemini Advanced가 필요한 이유는 무엇인가요?", answer: "기본 Gemini는 Gemini 1.5 Flash를 사용하지만, Gemini Advanced($19.99/월)는 가장 강력한 Gemini 1.5 Pro 모델을 제공합니다. 더 복잡한 추론, 긴 문서 분석, Google One 2TB 저장공간 등이 포함됩니다." },
    ],
  },
  perplexity: {
    en: [
      { question: "How is Perplexity different from Google Search?", answer: "Google returns a list of links; Perplexity synthesizes multiple sources into a direct answer with cited references. You can follow up with questions in a conversational thread, and every answer shows exactly which sources were used." },
      { question: "How accurate are Perplexity's source citations?", answer: "Perplexity cites real-time web sources for every answer. However, AI summarization can introduce errors, so for critical information always verify the original source directly." },
      { question: "What does Perplexity Pro add over the free version?", answer: "The free tier uses a basic model with limited daily Pro searches. Pro ($20/mo) lets you choose GPT-4o, Claude 3.5, or Gemini; adds file uploads, image generation, Spaces collaboration, and a much higher daily search quota." },
      { question: "What are Perplexity Spaces?", answer: "Spaces are dedicated research hubs where you can upload documents, assign the AI a role, and collaborate with teammates. They're great for ongoing research projects and are available on the Pro plan." },
    ],
    ko: [
      { question: "Perplexity AI는 일반 검색 엔진과 무엇이 다른가요?", answer: "일반 검색 엔진은 링크 목록을 보여주지만, Perplexity는 여러 소스를 종합해 직접적인 답변을 제공합니다. 모든 답변에 출처를 명시하며 대화형 인터페이스를 제공합니다." },
      { question: "Perplexity의 출처 인용은 얼마나 정확한가요?", answer: "Perplexity는 실시간 웹 검색을 기반으로 답변을 생성하고 출처를 명시합니다. 하지만 AI가 내용을 요약하는 과정에서 오류가 발생할 수 있으므로, 중요한 정보는 원문 출처를 직접 확인하는 것을 권장합니다." },
      { question: "Perplexity Pro와 무료 버전의 차이는 무엇인가요?", answer: "무료 버전은 기본 검색 기능을 제공합니다. Pro($20/월)는 GPT-4o, Claude 3.5, Gemini 등 최신 모델 선택 가능, 파일 업로드, 이미지 생성, Spaces 기능을 제공합니다." },
      { question: "Perplexity Spaces는 무엇인가요?", answer: "Spaces는 특정 주제나 프로젝트를 위한 전용 리서치 공간입니다. 관련 문서를 업로드하고 팀원과 공유해 협업 리서치를 할 수 있습니다. Pro 플랜에서 사용 가능합니다." },
    ],
  },
  grok: {
    en: [
      { question: "Do I need X Premium to use Grok?", answer: "Yes, Grok is bundled with X (Twitter) Premium ($8/mo or $84/yr). X Premium+ subscribers get higher Grok access. You can also subscribe directly via grok.com." },
      { question: "What does 'real-time X data access' mean?", answer: "Grok can read live X posts and trending topics, giving it up-to-date information on breaking news and social media sentiment — something other AI chatbots can't do with their training-data cutoffs." },
      { question: "How is Grok's image generation?", answer: "Grok 2 uses the Aurora model to generate images. You can create and share images directly in X threads from text descriptions, in a variety of styles." },
    ],
    ko: [
      { question: "Grok을 사용하려면 X Premium이 필요한가요?", answer: "네, Grok은 X Premium 구독자($8/월)를 위한 기능입니다. grok.com을 통해 별도로 구독할 수도 있습니다." },
      { question: "Grok의 X 실시간 데이터 접근이란 무엇인가요?", answer: "Grok은 X의 실시간 포스트와 트렌드에 접근할 수 있어 최신 뉴스와 소셜 미디어 반응을 반영한 답변을 제공합니다." },
      { question: "Grok의 이미지 생성 기능은 어떤가요?", answer: "Grok 2는 Aurora 모델을 통해 이미지를 생성합니다. X 스레드에서 직접 이미지를 생성하고 공유할 수 있습니다." },
    ],
  },
  deepseek: {
    en: [
      { question: "Is DeepSeek free to use?", answer: "Yes — the web chat at chat.deepseek.com is free with generous limits. The API is very affordable compared to OpenAI, and the open-source models can be run locally at no cost." },
      { question: "What is DeepSeek R1?", answer: "DeepSeek R1 is a reasoning model specialized for math and complex problem-solving. It uses chain-of-thought processing to reason step-by-step, comparable to OpenAI's o1 model on several benchmarks." },
      { question: "Are there data privacy concerns with DeepSeek?", answer: "DeepSeek is a Chinese company and processes data under Chinese law. Exercise caution with sensitive business or personal information. For maximum privacy, use the open-source model version and run it locally." },
    ],
    ko: [
      { question: "DeepSeek은 무료로 사용할 수 있나요?", answer: "네, DeepSeek 웹 인터페이스는 무료로 사용할 수 있습니다. API도 매우 저렴하며, 오픈소스 모델은 로컬에서 직접 실행할 수 있습니다." },
      { question: "DeepSeek R1이란 무엇인가요?", answer: "DeepSeek R1은 수학적 추론과 복잡한 문제 해결에 특화된 추론 모델입니다. OpenAI의 o1 모델과 비교되며, 일부 벤치마크에서 비슷한 수준의 성능을 보입니다." },
      { question: "DeepSeek의 데이터 보안은 어떻게 되나요?", answer: "DeepSeek은 중국 기업으로 중국 법률에 따라 데이터를 처리합니다. 보안이 중요한 경우 오픈소스 모델을 로컬에서 실행하는 것을 권장합니다." },
    ],
  },
  "microsoft-copilot": {
    en: [
      { question: "Is Microsoft Copilot completely free?", answer: "The consumer Copilot at copilot.microsoft.com is free and includes GPT-4. Microsoft 365 Copilot is an enterprise add-on billed per user per month. Copilot is also built into Windows 11 at no extra cost." },
      { question: "Is Microsoft Copilot the same technology as ChatGPT?", answer: "Both use OpenAI's GPT-4, so the underlying model is similar. Copilot's differences: it integrates Bing Search for real-time information and connects deeply with Microsoft 365 (Word, Excel, Teams, etc.)." },
      { question: "Can Microsoft Copilot generate images?", answer: "Yes — Copilot includes DALL-E 3 image generation (Image Creator) for free. Describe what you want and it produces a high-quality image, same as Bing Image Creator." },
    ],
    ko: [
      { question: "Microsoft Copilot은 완전 무료인가요?", answer: "기본 Microsoft Copilot은 무료로 GPT-4를 사용할 수 있습니다. Microsoft 365 Copilot은 기업용으로 추가 요금이 부과됩니다. Windows 11에는 기본 내장되어 있습니다." },
      { question: "Microsoft Copilot과 ChatGPT는 같은 기술인가요?", answer: "두 서비스 모두 OpenAI의 GPT-4를 기반으로 합니다. 차이점은 Copilot이 Bing 검색과 통합되어 실시간 정보를 제공하고 Microsoft 365와 통합된다는 점입니다." },
      { question: "Microsoft Copilot으로 이미지를 생성할 수 있나요?", answer: "네, Microsoft Copilot은 DALL-E 3 기반의 이미지 생성 기능을 무료로 제공합니다. Bing Image Creator와 동일한 기능입니다." },
    ],
  },
  "meta-ai": {
    en: [
      { question: "Which apps can I use Meta AI in?", answer: "Meta AI is integrated into WhatsApp, Instagram, Facebook, and Messenger. Tag @Meta AI in any chat or use the dedicated Meta AI tab. You can also use it directly at meta.ai." },
      { question: "Is Llama open source?", answer: "Yes, Meta's Llama models are open source. Developers can download and run them locally or fine-tune them for their own services. Commercial use requires checking the license terms." },
      { question: "How do I generate images with Meta AI?", answer: "Type '/imagine [description]' or activate the Imagine feature in Meta AI chats. It works inside WhatsApp, Instagram, Facebook, and Messenger group chats, completely free." },
    ],
    ko: [
      { question: "Meta AI는 어떤 앱에서 사용할 수 있나요?", answer: "Meta AI는 WhatsApp, Instagram, Facebook, Messenger에 통합되어 있습니다. '@Meta AI'를 태그하거나 전용 Meta AI 탭에서 접근할 수 있습니다." },
      { question: "Meta AI의 Llama 모델은 오픈소스인가요?", answer: "네, Meta의 Llama 모델은 오픈소스로 공개되어 있습니다. 개발자들은 직접 다운로드해 로컬에서 실행하거나 파인튜닝해 사용할 수 있습니다." },
      { question: "Meta AI로 이미지를 생성하는 방법은?", answer: "'/imagine [이미지 설명]'이라고 입력하거나 Imagine 기능을 활성화해 이미지를 생성할 수 있습니다. 완전 무료로 제공됩니다." },
    ],
  },
  poe: {
    en: [
      { question: "Which AI models are available on Poe?", answer: "Poe provides GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Llama 3, and many more — all in one app. The free plan lets you try each model with limited daily messages; Premium ($19.99/mo) gives much higher quotas." },
      { question: "What are Poe custom bots?", answer: "Anyone can build an AI bot with a specific persona, role, or knowledge base and share it on Poe. Popular bots can earn creators revenue through Poe's monetization program." },
    ],
    ko: [
      { question: "Poe에서 어떤 AI 모델들을 사용할 수 있나요?", answer: "Poe에서는 GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Llama 3 등 다양한 AI 모델을 한 곳에서 사용할 수 있습니다. 무료 플랜에서는 제한적으로 체험할 수 있습니다." },
      { question: "Poe의 커스텀 봇은 무엇인가요?", answer: "Poe에서는 특정 역할과 지식 베이스를 가진 AI 봇을 직접 만들고 공유할 수 있습니다. 인기 봇은 크리에이터 수익화 프로그램을 통해 수익을 얻을 수도 있습니다." },
    ],
  },
  "character-ai": {
    en: [
      { question: "What is Character AI used for?", answer: "Character AI is popular for creative writing, roleplay, language learning, and entertainment. Users chat with AI versions of historical figures, fictional characters, or custom personas. It's especially popular with teens and young adults." },
      { question: "Can I create my own character?", answer: "Yes — anyone can build an AI character with a custom name, personality, backstory, and greeting for free. You can keep it private or publish it publicly. Popular characters attract millions of conversations." },
    ],
    ko: [
      { question: "Character AI는 어떤 용도로 사용하나요?", answer: "창작 글쓰기, 롤플레이, 언어 학습, 엔터테인먼트 목적으로 사용됩니다. 역사 인물, 가상 캐릭터와 대화를 통해 학습하거나 창작에 활용할 수 있습니다." },
      { question: "Character AI에서 나만의 캐릭터를 만들 수 있나요?", answer: "네, 누구나 무료로 AI 캐릭터를 만들 수 있습니다. 이름, 성격, 배경 스토리 등을 설정하고 공개 또는 비공개로 배포할 수 있습니다." },
    ],
  },
  cursor: {
    en: [
      { question: "What's the difference between Cursor and VS Code?", answer: "Cursor is a fork of VS Code with deep AI integration (Tab autocomplete, Composer multi-file editing, Chat). All VS Code extensions and settings work in Cursor, so migration is seamless." },
      { question: "What is Cursor's Composer/Agent mode?", answer: "Composer (now Agent mode) lets AI autonomously handle complex, multi-file tasks. Ask it to 'add a new API endpoint with tests' and it will create and modify all the relevant files in one go." },
      { question: "Is the free Cursor plan enough?", answer: "The free plan includes limited Pro feature usage and basic autocomplete — fine for hobby projects. Professional developers will likely want Pro ($20/mo) for unlimited AI autocomplete and more Agent uses." },
      { question: "Which AI models does Cursor use?", answer: "Cursor supports Claude 3.5 Sonnet, GPT-4o, and Claude 3 Opus among others. It auto-selects a model optimized for coding but you can switch manually. Each model has different speed/quality trade-offs." },
    ],
    ko: [
      { question: "Cursor와 VS Code의 차이점은 무엇인가요?", answer: "Cursor는 VS Code를 포크해 AI를 깊이 통합한 에디터입니다. VS Code의 모든 확장 프로그램과 설정을 그대로 사용할 수 있으며, AI Tab 자동완성, Composer, Chat 기능이 추가됩니다." },
      { question: "Cursor의 Composer 기능이란 무엇인가요?", answer: "Composer(현재 Agent 모드)는 여러 파일에 걸친 복잡한 코딩 작업을 AI가 자율적으로 수행하는 기능입니다. 관련 파일들을 한 번에 생성·수정합니다." },
      { question: "Cursor 무료 플랜으로도 충분히 사용할 수 있나요?", answer: "무료 플랜은 제한된 횟수의 Pro 기능과 기본 자동완성을 제공합니다. 전문 개발자에게는 Pro($20/월)를 권장합니다." },
      { question: "Cursor에서 어떤 AI 모델을 사용하나요?", answer: "Cursor는 Claude 3.5 Sonnet, GPT-4o, Claude 3 Opus 등을 지원합니다. 기본적으로 코딩에 최적화된 모델을 자동 선택하며, 사용자가 직접 변경할 수도 있습니다." },
    ],
  },
  windsurf: {
    en: [
      { question: "How does Windsurf's Cascade agent work?", answer: "Cascade understands your codebase context and autonomously plans and executes multi-step tasks — creating files, making edits, running terminal commands in sequence. You can review and approve each step or let it run automatically." },
      { question: "What's included in the Windsurf free plan?", answer: "Windsurf's free plan provides unlimited basic AI completions plus limited Cascade agent uses. It's more generous than Cursor's free tier, making it worth trying before committing to any paid plan." },
      { question: "Cursor vs Windsurf — which should I choose?", answer: "Cursor is more mature with a larger community. Windsurf offers a more generous free plan and a powerful Cascade agent. Try both free tiers before deciding — they import VS Code settings instantly." },
    ],
    ko: [
      { question: "Windsurf의 Cascade 에이전트는 어떻게 동작하나요?", answer: "Cascade는 코드 컨텍스트를 이해하고 파일 생성, 수정, 터미널 명령 실행을 자율적으로 수행합니다. 각 단계를 승인하거나 자동으로 진행할 수 있습니다." },
      { question: "Windsurf 무료 플랜에는 어떤 기능이 있나요?", answer: "Windsurf는 무료 플랜에서도 강력한 AI 기능을 제공합니다. Cascade 에이전트, AI 자동완성, Chat 기능 등을 무료로 사용할 수 있습니다." },
      { question: "Cursor와 Windsurf 중 무엇을 선택해야 하나요?", answer: "Cursor는 더 성숙하고 안정적인 경험을 제공합니다. Windsurf는 무료 플랜이 더 관대하고 Cascade 에이전트가 강력합니다. 둘 다 무료로 체험해보는 것을 권장합니다." },
    ],
  },
  "github-copilot": {
    en: [
      { question: "Which IDEs does GitHub Copilot support?", answer: "Copilot works in VS Code, Visual Studio, JetBrains IDEs (IntelliJ, PyCharm, WebStorm, etc.), Vim/Neovim, and Xcode — the broadest IDE coverage of any AI coding assistant." },
      { question: "Is there a free GitHub Copilot plan?", answer: "Yes — since late 2024 there's a free tier with 2,000 monthly completions and limited Chat. Individual ($10/mo) adds unlimited completions. Students and open-source maintainers can apply for free access." },
      { question: "Who owns the copyright on Copilot-generated code?", answer: "Per GitHub's Terms of Service, you own the output. GitHub provides a code referencing filter to flag when generated code closely resembles existing open-source code, so you can review relevant licenses." },
    ],
    ko: [
      { question: "GitHub Copilot은 어떤 IDE에서 사용할 수 있나요?", answer: "GitHub Copilot은 VS Code, Visual Studio, JetBrains, Vim/Neovim, Xcode 등 대부분의 주요 IDE에서 사용 가능합니다." },
      { question: "GitHub Copilot 무료 플랜이 생겼나요?", answer: "네, 2024년 말부터 무료 플랜이 출시되었습니다. 월 2,000회 자동완성과 제한된 Chat이 제공됩니다. Individual($10/월)은 무제한 사용을 제공합니다." },
      { question: "GitHub Copilot으로 생성된 코드의 저작권은 누구에게 있나요?", answer: "GitHub 이용약관에 따르면 생성된 코드의 저작권은 사용자에게 있습니다. 코드 참조 필터로 기존 오픈소스 코드와의 유사성을 확인할 수 있습니다." },
    ],
  },
  "claude-code": {
    en: [
      { question: "How do I install Claude Code?", answer: "Run `npm install -g @anthropic-ai/claude-code` in your terminal. Node.js 18+ is required. After installation, set your Anthropic API key and you're ready to go. Claude Pro subscribers can use it at no extra API cost." },
      { question: "What can Claude Code do autonomously?", answer: "Claude Code can read/write/create files, run terminal commands, perform Git operations (commit, branch, PR), run tests, and search the web — all autonomously. Just describe the task in plain English." },
      { question: "How is Claude Code different from Cursor?", answer: "Cursor is a GUI-based code editor. Claude Code is terminal-based with no graphical interface. Claude Code behaves more like an autonomous agent — ideal for those who prefer CLI workflows or need deep agentic automation." },
    ],
    ko: [
      { question: "Claude Code는 어떻게 설치하나요?", answer: "터미널에서 'npm install -g @anthropic-ai/claude-code'로 설치합니다. Node.js 18+가 필요하며, Anthropic API 키를 설정하면 바로 사용할 수 있습니다." },
      { question: "Claude Code는 어떤 작업을 자율적으로 할 수 있나요?", answer: "파일 읽기·쓰기, 터미널 명령 실행, Git 작업, 웹 검색 등을 자율적으로 수행합니다. 복잡한 버그 수정, 기능 구현, 리팩터링을 지시만 하면 수행합니다." },
      { question: "Claude Code와 Cursor의 차이점은 무엇인가요?", answer: "Cursor는 GUI 기반 코드 에디터이며, Claude Code는 터미널 기반으로 동작합니다. Claude Code는 에이전트로서 더 자율적인 작업 수행이 가능합니다." },
    ],
  },
  "replit-ai": {
    en: [
      { question: "Is Replit AI good for beginners?", answer: "Yes — Replit requires no local setup. Open the browser, pick a language, and start coding with AI assistance. It supports 50+ languages and is especially popular in education." },
      { question: "Can I deploy apps from Replit?", answer: "Yes — Replit can deploy apps directly to the cloud. The free plan allows basic deployments; the Core plan ($25/mo) keeps apps running 24/7. You get a public URL for instant access." },
    ],
    ko: [
      { question: "Replit AI는 초보자에게 적합한가요?", answer: "네, Replit은 설치 없이 브라우저에서 바로 코딩을 시작할 수 있습니다. 50개 이상의 언어를 지원하며 학생과 초보자에게 특히 인기입니다." },
      { question: "Replit에서 만든 앱을 공개적으로 배포할 수 있나요?", answer: "네, Replit에서 직접 배포할 수 있습니다. 상시 실행을 위해서는 Core 플랜이 필요합니다." },
    ],
  },
  bolt: {
    en: [
      { question: "Can Bolt.new build a production-deployable app?", answer: "Yes — Bolt generates production-quality code (React, Next.js, etc.) and deploys directly to Netlify or Vercel. You can also export the code to GitHub for continued development." },
      { question: "How does Bolt differ from Lovable?", answer: "Both generate full-stack web apps from natural language, but Bolt uses StackBlitz WebContainers to run a full Node.js environment in the browser. Lovable has easier Supabase backend integration and cleaner GitHub sync." },
    ],
    ko: [
      { question: "Bolt.new로 실제 배포 가능한 앱을 만들 수 있나요?", answer: "네, Bolt.new로 생성된 앱은 Netlify나 Vercel에 즉시 배포할 수 있습니다. 생성된 코드를 GitHub에 내보내 계속 개발할 수도 있습니다." },
      { question: "Bolt.new와 Lovable의 차이점은 무엇인가요?", answer: "두 서비스 모두 자연어로 웹 앱을 생성하지만, Bolt는 WebContainers 기술로 브라우저 내 Node.js 환경을 실행하는 게 특징입니다. Lovable은 Supabase 통합이 더 쉽습니다." },
    ],
  },
  lovable: {
    en: [
      { question: "What kinds of apps can Lovable build?", answer: "Lovable handles SaaS dashboards, landing pages, CRUD apps, and admin panels. With Supabase integration, user auth, databases, and file storage are configured automatically — no backend coding required." },
      { question: "How is Lovable different from no-code tools like Webflow?", answer: "Webflow and Bubble use drag-and-drop with limited extensibility. Lovable generates real React/TypeScript code that developers can modify and own via GitHub. This makes it a true 'low-code' tool, not no-code." },
    ],
    ko: [
      { question: "Lovable로 어떤 종류의 앱을 만들 수 있나요?", answer: "SaaS 대시보드, 랜딩 페이지, CRUD 앱, 관리자 패널 등을 만들 수 있습니다. Supabase와 통합되어 사용자 인증, 데이터베이스가 자동으로 설정됩니다." },
      { question: "Lovable과 no-code 툴의 차이는 무엇인가요?", answer: "Lovable은 실제 React/TypeScript 코드를 생성하므로 개발자가 코드를 수정하고 확장할 수 있습니다. GitHub 연동으로 코드를 완전히 소유할 수 있습니다." },
    ],
  },
  v0: {
    en: [
      { question: "What is v0 best at?", answer: "v0 specializes in UI components and web page layouts. Give it a text description or upload an image and it instantly generates React components using shadcn/ui and Tailwind CSS — perfect for rapid UI prototyping." },
      { question: "How do I use v0-generated code in my Next.js project?", answer: "Copy the generated code and paste it into your project. Since v0 uses shadcn/ui, make sure to run `npx shadcn-ui@latest init` first. Required package install commands are shown alongside the code." },
    ],
    ko: [
      { question: "v0는 무엇을 만드는 데 특화되어 있나요?", answer: "v0는 UI 컴포넌트와 웹 페이지 디자인에 특화되어 있습니다. 텍스트 설명이나 이미지로 React 기반 UI를 즉시 생성하며, shadcn/ui와 Tailwind CSS를 기반으로 합니다." },
      { question: "v0에서 생성한 코드를 Next.js 프로젝트에 어떻게 사용하나요?", answer: "v0에서 생성된 코드를 복사해 Next.js 프로젝트에 붙여넣으면 됩니다. shadcn-ui가 설치된 프로젝트에 바로 통합됩니다." },
    ],
  },
  continue: {
    en: [
      { question: "Which AI models does Continue support?", answer: "Continue supports OpenAI (GPT-4), Anthropic (Claude), Google (Gemini), Ollama (local), Mistral, Cohere, and more — configurable via a simple JSON config file." },
      { question: "Can Continue run local AI models?", answer: "Yes — Continue integrates with Ollama and LM Studio for fully local model execution. Your code never leaves your machine, making it ideal for security-sensitive enterprise environments." },
    ],
    ko: [
      { question: "Continue는 어떤 AI 모델을 지원하나요?", answer: "OpenAI(GPT-4), Anthropic(Claude), Google(Gemini), Ollama(로컬 모델) 등 거의 모든 주요 AI 제공자를 지원합니다. 설정 파일에서 자유롭게 설정할 수 있습니다." },
      { question: "Continue로 로컬 AI 모델을 사용할 수 있나요?", answer: "네, Ollama, LM Studio 등을 통한 로컬 모델 실행을 지원합니다. 코드가 외부 서버로 전송되지 않아 보안에 민감한 기업에 적합합니다." },
    ],
  },
  cline: {
    en: [
      { question: "How far can Cline's autonomous agent go?", answer: "Cline can create/edit/delete files, execute terminal commands (npm, git, etc.), control the browser for scraping and testing, and make API calls — all autonomously. It requests user approval before each significant action." },
      { question: "How much does Cline cost to use?", answer: "The Cline plugin is free, but you pay for the AI API (e.g., Claude 3.5 Sonnet). A complex task may cost $1–$5. Cline has a built-in usage monitor so you can track spend." },
    ],
    ko: [
      { question: "Cline의 자율 에이전트 기능은 어디까지 할 수 있나요?", answer: "파일 생성·수정·삭제, 터미널 명령 실행, 브라우저 제어까지 자율적으로 수행합니다. 각 중요한 액션 전에 사용자에게 승인을 요청합니다." },
      { question: "Cline 사용 비용은 어떻게 되나요?", answer: "Cline 플러그인 자체는 무료이지만 AI API 비용이 발생합니다. Claude 3.5 Sonnet 사용 시 복잡한 작업은 $1~$5 정도의 비용이 발생할 수 있습니다." },
    ],
  },
  midjourney: {
    en: [
      { question: "Do I still need Discord to use Midjourney?", answer: "No — Midjourney now has a full web interface at midjourney.com where you can generate images, manage your gallery, and adjust settings without Discord." },
      { question: "Can I use Midjourney images commercially?", answer: "Standard ($30/mo) and above plans allow commercial use. The Basic ($10/mo) plan is for personal non-commercial use. Subscribers own the copyright to their generated images." },
      { question: "What changed in Midjourney v6?", answer: "v6 brought major improvements to photorealism, in-image text rendering, and natural-language prompt understanding. Character consistency also improved significantly over v5." },
    ],
    ko: [
      { question: "Midjourney를 사용하려면 Discord가 필요한가요?", answer: "이제 Midjourney 웹사이트에서 직접 사용할 수 있습니다. 이미지 생성, 갤러리 관리 등을 웹에서 편리하게 이용할 수 있습니다." },
      { question: "Midjourney로 생성한 이미지를 상업적으로 사용할 수 있나요?", answer: "Standard($30/월) 이상 플랜 구독자는 상업적 이용이 가능합니다. Basic 플랜은 개인 비상업적 용도에 한정됩니다." },
      { question: "Midjourney v6와 이전 버전의 차이는 무엇인가요?", answer: "Midjourney v6는 사진 사실성, 텍스트 렌더링, 프롬프트 이해 능력이 크게 향상되었습니다. 캐릭터 일관성도 향상되었습니다." },
    ],
  },
  "leonardo-ai": {
    en: [
      { question: "Why is Leonardo AI specialized for games?", answer: "Leonardo was built from the ground up for game asset creation, offering models fine-tuned for pixel art, isometric views, character sheets, and tilesets. It also supports consistent character generation and transparent-background exports." },
      { question: "Can I use the free plan for commercial work?", answer: "The free plan (150 daily tokens) is for personal, non-commercial use. Apprentice ($12/mo) and above plans include commercial usage rights." },
    ],
    ko: [
      { question: "Leonardo AI가 게임 개발에 특화된 이유는 무엇인가요?", answer: "Leonardo AI는 처음부터 게임 에셋 생성을 목표로 개발되었습니다. 픽셀 아트, 아이소메트릭 뷰 등 게임에 특화된 모델과 일관된 캐릭터 생성 기능을 제공합니다." },
      { question: "Leonardo AI 무료 플랜으로 상업적 이용이 가능한가요?", answer: "무료 플랜은 개인 비상업적 목적으로 사용할 수 있습니다. Apprentice($12/월) 이상 유료 플랜에서는 상업적 이용이 가능합니다." },
    ],
  },
  "adobe-firefly": {
    en: [
      { question: "What does 'commercially safe' mean for Adobe Firefly?", answer: "Firefly was trained exclusively on Adobe Stock licensed images and public-domain content — no copyrighted material scraped from the web. This means generated images carry very low copyright infringement risk for commercial projects." },
      { question: "Can I use Firefly without a Creative Cloud subscription?", answer: "Yes — a free Adobe account at firefly.adobe.com gives you 25 monthly generation credits. Creative Cloud subscribers get more credits and deep in-app integration with Photoshop, Illustrator, and more." },
    ],
    ko: [
      { question: "Adobe Firefly가 '상업적으로 안전하다'는 의미는 무엇인가요?", answer: "Adobe Firefly는 저작권이 있는 이미지를 학습 데이터로 사용하지 않았습니다. 생성된 이미지를 상업적으로 사용해도 저작권 분쟁 위험이 낮습니다." },
      { question: "Adobe Creative Cloud 없이도 Firefly를 사용할 수 있나요?", answer: "네, Adobe 계정만 있으면 무료로 월 25개의 생성 크레딧을 사용할 수 있습니다. Creative Cloud 구독자는 더 많은 크레딧과 앱 내 통합 기능을 사용할 수 있습니다." },
    ],
  },
  runway: {
    en: [
      { question: "How long can Runway Gen-3 Alpha videos be?", answer: "Gen-3 Alpha generates clips up to 10 seconds. Stitch multiple clips together in Runway's editor or any video editor to create longer sequences." },
      { question: "Does Hollywood actually use Runway?", answer: "Yes — Runway has been used in VFX work for films including 'Everything Everywhere All at Once'. Hollywood studios are integrating it into production pipelines alongside traditional VFX tools." },
    ],
    ko: [
      { question: "Runway Gen-3 Alpha로 얼마나 긴 영상을 만들 수 있나요?", answer: "Runway Gen-3 Alpha로 최대 10초 길이의 영상을 생성할 수 있습니다. 짧은 클립들을 이어붙여 더 긴 영상을 만들 수 있습니다." },
      { question: "Runway는 할리우드에서도 사용하나요?", answer: "네, '에브리씽 에브리웨어 올 앳 원스' 등 여러 상업 영화의 VFX 작업에 사용되었습니다. 할리우드 스튜디오들이 VFX 파이프라인에 통합하고 있습니다." },
    ],
  },
  pika: {
    en: [
      { question: "How long are Pika videos?", answer: "Pika generates clips of 3 seconds by default, up to 10 seconds. Use the Extend feature to chain clips together for longer sequences. The tool is optimized for fast, high-quality short clips." },
      { question: "What are Pikaffects?", answer: "Pikaffects are Pika's unique visual effect presets — 'explode', 'melt', 'deflate', 'crush', and more. Apply dramatic transformations to any image to create eye-catching short-form content." },
    ],
    ko: [
      { question: "Pika로 만든 영상의 길이는 얼마나 되나요?", answer: "기본 3초이며 최대 10초까지 설정할 수 있습니다. Extend 기능으로 영상을 이어 붙여 더 긴 클립을 만들 수 있습니다." },
      { question: "Pika에서 Pikaffects는 무엇인가요?", answer: "'폭발', '녹아내리기', '눈보라' 등 Pika만의 독특한 시각 효과 기능입니다. 이미지에 극적인 효과를 적용해 독창적인 영상을 만들 수 있습니다." },
    ],
  },
  heygen: {
    en: [
      { question: "How do I create an avatar video in HeyGen?", answer: "1) Choose an AI avatar from 100+ options → 2) Enter your script text or upload audio → 3) Set background, captions, and layout → 4) Click Generate (takes a few minutes). Download or share the finished video via link." },
      { question: "How does HeyGen's auto-dubbing work?", answer: "Upload a video file and HeyGen transcribes and translates the speech, then re-synthesizes the audio in the target language in a voice similar to the original speaker. Lip-sync is automatically adjusted. Supports 130+ languages." },
    ],
    ko: [
      { question: "HeyGen에서 아바타 비디오를 만들려면 어떻게 하나요?", answer: "1) 아바타 선택 → 2) 스크립트 입력 또는 음성 업로드 → 3) 배경 및 레이아웃 설정 → 4) 생성 클릭. 완성된 영상을 다운로드하거나 링크로 공유할 수 있습니다." },
      { question: "HeyGen의 자동 더빙 기능은 어떻게 동작하나요?", answer: "영상을 업로드하면 원본 화자의 목소리와 유사한 음성으로 다른 언어로 자동 더빙합니다. 130개 이상의 언어를 지원하며 입술 움직임도 자동으로 동기화됩니다." },
    ],
  },
  synthesia: {
    en: [
      { question: "Which companies use Synthesia?", answer: "Google, Reuters, Zoom, Heineken, and 50,000+ businesses use Synthesia for corporate training, internal communications, product explainer videos, and customer service content." },
      { question: "What is SCORM export and why does it matter?", answer: "SCORM is the standard format for e-learning content. Exporting to SCORM lets you upload Synthesia videos directly into LMS platforms like Moodle, Canvas, or Cornerstone — essential for corporate training workflows." },
    ],
    ko: [
      { question: "Synthesia는 어떤 기업들이 사용하나요?", answer: "Google, Reuters, Zoom, Heineken 등 세계 50,000개 이상의 기업이 사용합니다. 기업 교육, 마케팅 영상, 내부 커뮤니케이션에 활용됩니다." },
      { question: "Synthesia의 SCORM 내보내기 기능은 무엇인가요?", answer: "SCORM은 e-learning 표준 포맷입니다. Synthesia에서 SCORM으로 내보내면 Moodle, Canvas 등 LMS에 바로 업로드해 교육 과정으로 활용할 수 있습니다." },
    ],
  },
  elevenlabs: {
    en: [
      { question: "How much audio do I need to clone a voice?", answer: "Instant Voice Clone works with 1+ minutes of clean audio (3–5 min is ideal). Professional Voice Clone requires 30+ minutes but produces a more accurate result. Low-noise, high-quality recordings give the best outcome." },
      { question: "Can I use ElevenLabs audio commercially?", answer: "The Creator plan ($22/mo) and above allow commercial use. Free and Starter plan audio is restricted to personal/non-commercial use. Always use an appropriate paid plan for podcasts, audiobooks, or any monetized content." },
      { question: "How does ElevenLabs AI dubbing work?", answer: "Upload a video and ElevenLabs automatically detects, separates, translates, and re-synthesizes the speech in your target language — preserving the original speaker's voice characteristics. Subtitles are generated too. Supports 29 languages." },
    ],
    ko: [
      { question: "ElevenLabs로 음성을 클론하려면 얼마나 많은 샘플이 필요한가요?", answer: "Instant Voice Clone은 1분 이상의 오디오 샘플로 기본적인 클론을 만들 수 있습니다. Professional Voice Clone은 30분 이상 필요하지만 더 정확한 클론을 생성합니다." },
      { question: "ElevenLabs로 생성한 음성을 상업적으로 사용할 수 있나요?", answer: "Creator($22/월) 이상 플랜에서 상업적 활용이 가능합니다. 무료 및 Starter 플랜의 음성은 개인/비상업 목적에 제한됩니다." },
      { question: "ElevenLabs의 AI 더빙은 어떻게 동작하나요?", answer: "영상을 업로드하면 자동으로 음성을 감지·분리하고 지정한 언어로 번역·합성합니다. 원본 화자의 목소리 특성을 유지하면서 29개 언어로 더빙합니다." },
    ],
  },
  "notion-ai": {
    en: [
      { question: "How is Notion AI different from ChatGPT?", answer: "Notion AI lives inside your workspace and can reference your existing pages, databases, and notes as context. ChatGPT is a separate service with no access to your Notion content. If your work is in Notion, AI works far better there." },
      { question: "How does Notion AI Q&A work?", answer: "Notion AI Q&A indexes your entire workspace and answers natural-language questions with citations to the source pages. For example, 'What was the marketing budget last quarter?' finds and summarizes the relevant page." },
    ],
    ko: [
      { question: "Notion AI와 일반 ChatGPT의 차이는 무엇인가요?", answer: "Notion AI는 워크스페이스 내에서 기존 문서와 데이터베이스를 맥락으로 활용합니다. ChatGPT는 Notion 콘텐츠를 직접 참조하지 못합니다." },
      { question: "Notion AI Q&A 기능은 어떻게 동작하나요?", answer: "워크스페이스 전체를 인덱싱해 자연어 질문에 답변하고 출처 링크를 제공합니다. 팀의 지식을 빠르게 검색할 때 매우 유용합니다." },
    ],
  },
  grammarly: {
    en: [
      { question: "Does Grammarly support languages other than English?", answer: "Grammarly is primarily optimized for English. Support for other languages is limited. For non-English writing assistance, general-purpose AI tools like ChatGPT or Claude are more effective." },
      { question: "What does Grammarly Premium add over the free version?", answer: "Premium adds clarity and conciseness suggestions, tone detection, vocabulary enhancement, readability scores, and plagiarism detection. It's most valuable for professional emails, academic writing, and blog content." },
    ],
    ko: [
      { question: "Grammarly는 한국어를 지원하나요?", answer: "현재 Grammarly는 주로 영어 문서에 특화되어 있습니다. 한국어 글쓰기 보조가 필요하다면 ChatGPT, Claude 등 다국어를 지원하는 AI를 활용하는 것이 더 효과적입니다." },
      { question: "Grammarly Premium의 가장 유용한 기능은 무엇인가요?", answer: "Premium의 핵심 기능은 명확성 제안, 어조 감지, 어휘 다양성 제안, 가독성 분석, 표절 검사입니다. 학술 논문, 비즈니스 이메일 등 전문적인 글쓰기에서 특히 가치 있습니다." },
    ],
  },
  notebooklm: {
    en: [
      { question: "What source types can I upload to NotebookLM?", answer: "PDF files, Google Docs, Google Slides, YouTube URLs, website URLs, and plain text. Each notebook supports up to 50 sources, 500,000 words per source. Answers are grounded exclusively in what you've uploaded." },
      { question: "How do I use the Audio Overview (podcast) feature?", answer: "After uploading sources, click 'Audio Overview'. Two AI hosts generate a podcast-style discussion of your material — great for digesting long research papers while commuting or exercising." },
      { question: "Is NotebookLM free?", answer: "Yes, NotebookLM is free at notebooklm.google.com with just a Google account. A paid NotebookLM Plus tier adds more notebooks, sources, and audio generations for power users." },
    ],
    ko: [
      { question: "NotebookLM에 어떤 소스를 업로드할 수 있나요?", answer: "PDF, Google Docs, Google Slides, YouTube URL, 웹사이트 URL을 지원합니다. 노트북당 최대 50개 소스까지 지원합니다." },
      { question: "NotebookLM의 Audio Overview 기능은 어떻게 사용하나요?", answer: "소스를 업로드한 후 'Audio Overview' 버튼을 클릭하면 두 명의 AI 호스트가 토론하는 팟캐스트 형식의 오디오가 자동 생성됩니다." },
      { question: "NotebookLM은 완전히 무료인가요?", answer: "네, Google 계정만 있으면 완전 무료로 사용할 수 있습니다." },
    ],
  },
  "canva-ai": {
    en: [
      { question: "Do I need design experience to use Canva AI?", answer: "None at all. Canva's philosophy is 'everyone can be a designer'. Magic Design generates professional layouts from a description, and 1M+ templates mean you can start from something polished and just swap your content." },
      { question: "Can I use Canva AI-generated images commercially?", answer: "Images created on Canva Pro ($15/mo) can be used commercially. Some free-plan elements are also commercially licensed, but any element marked 'Pro' requires a paid plan for commercial use." },
    ],
    ko: [
      { question: "Canva AI를 사용하려면 디자인 경험이 필요한가요?", answer: "전혀 필요 없습니다. Magic Design 기능은 내용을 설명하면 자동으로 전문적인 디자인을 생성해줍니다. 100만+ 템플릿 중 원하는 것을 선택해 텍스트만 수정해도 훌륭한 결과물을 얻을 수 있습니다." },
      { question: "Canva AI로 생성한 이미지를 상업적으로 사용할 수 있나요?", answer: "Canva Pro($15/월) 이상에서 생성한 이미지는 상업적으로 사용할 수 있습니다. 'Pro' 마크가 붙은 요소는 Pro 구독 없이 상업적으로 사용할 수 없습니다." },
    ],
  },
  "figma-ai": {
    en: [
      { question: "Do I need to know Figma to use Figma AI?", answer: "Figma AI is built into Figma, so basic Figma knowledge is required. However, AI features automate many complex tasks, making it easier for beginners to get started. Taking Figma's own tutorials first is recommended." },
      { question: "How does AI code generation work in Dev Mode?", answer: "Select any design element in Dev Mode and AI generates accurate CSS, React, Swift, or Android XML code for it. Developers get precise implementation code directly from the design file, greatly streamlining handoff." },
    ],
    ko: [
      { question: "Figma AI는 Figma를 모르는 사람도 사용할 수 있나요?", answer: "Figma AI는 Figma 내에 통합된 기능이므로 기본적인 Figma 사용법을 알아야 합니다. 하지만 AI 기능이 복잡한 작업을 자동화해주므로 초보자도 더 쉽게 시작할 수 있습니다." },
      { question: "Figma Dev Mode에서 AI 코드 생성은 어떻게 사용하나요?", answer: "Dev Mode에서 디자인 요소를 선택하면 CSS, React, Swift, Android XML 코드를 자동으로 생성합니다. 디자이너-개발자 간 핸드오프가 크게 간소화됩니다." },
    ],
  },
};

/* ─── Generic fallback ─────────────────────────────────── */
function generateGenericFAQs(tool: Tool, lang: Lang): FAQ[] {
  if (lang === "ko") {
    const faqs: FAQ[] = [];
    if (tool.free_plan) {
      faqs.push({ question: `${tool.name} 무료 버전은 어디까지 사용할 수 있나요?`, answer: `${tool.name}은 무료 플랜을 제공합니다. 기본 기능은 무료로 사용할 수 있으며, 더 많은 기능이 필요한 경우 유료 플랜(${tool.pricing})으로 업그레이드할 수 있습니다.` });
    }
    if (tool.api_support) {
      faqs.push({ question: `${tool.name} API는 어떻게 사용할 수 있나요?`, answer: `${tool.name}은 공식 API를 제공합니다. ${tool.company}의 개발자 문서를 참조해 API 키를 발급받고 자신의 앱에 통합할 수 있습니다.` });
    }
    if (tool.mobile_app) {
      faqs.push({ question: `${tool.name} 모바일 앱은 어디서 다운로드할 수 있나요?`, answer: `${tool.name}은 iOS App Store와 Google Play Store에서 모바일 앱을 다운로드할 수 있습니다.` });
    }
    faqs.push({ question: `${tool.name}의 주요 대안은 무엇인가요?`, answer: `${tool.name}의 주요 대안으로는 ${tool.alternatives.slice(0, 3).join(", ")} 등이 있습니다.` });
    return faqs.slice(0, 4);
  }

  const faqs: FAQ[] = [];
  if (tool.free_plan) {
    faqs.push({ question: `What can I do with ${tool.name}'s free plan?`, answer: `${tool.name} offers a free plan for getting started. For higher usage and advanced features, paid plans are available starting from ${tool.pricing}.` });
  }
  if (tool.api_support) {
    faqs.push({ question: `How do I access the ${tool.name} API?`, answer: `${tool.name} provides an official API. Check ${tool.company}'s developer documentation to generate an API key and integrate it into your application.` });
  }
  if (tool.mobile_app) {
    faqs.push({ question: `Is there a ${tool.name} mobile app?`, answer: `Yes — ${tool.name} has mobile apps available on the iOS App Store and Google Play Store.` });
  }
  faqs.push({ question: `What are the main alternatives to ${tool.name}?`, answer: `Top alternatives include ${tool.alternatives.slice(0, 3).join(", ")}. Compare them side-by-side on AIHub.` });
  return faqs.slice(0, 4);
}

/* ─── Public API ─────────────────────────────────────── */
export function getToolFAQs(tool: Tool, lang: Lang = "en"): FAQ[] {
  const entry = TOOL_FAQS[tool.slug];
  if (entry) {
    const list = entry[lang];
    if (list && list.length >= 2) return list;
    // fallback to English if Korean not available
    if (lang === "ko" && entry.en.length >= 2) return entry.en;
  }
  return generateGenericFAQs(tool, lang);
}

-- AI Tools Hub v2 — Supabase Schema
-- Supabase Dashboard → SQL Editor에서 실행하세요

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ──────────────────────────────────────
-- TOOLS TABLE
-- ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS tools (
  id                UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name              TEXT NOT NULL,
  slug              TEXT NOT NULL UNIQUE,
  company           TEXT NOT NULL,
  description       TEXT NOT NULL,
  long_description  TEXT,
  logo_url          TEXT,
  website_url       TEXT NOT NULL,
  affiliate_url     TEXT NOT NULL,
  category          TEXT NOT NULL CHECK (category IN ('chat','coding','image','video','voice','productivity','design')),
  pricing           TEXT NOT NULL,
  free_plan         BOOLEAN DEFAULT false,
  api_support       BOOLEAN DEFAULT false,
  web_search        BOOLEAN DEFAULT false,
  file_upload       BOOLEAN DEFAULT false,
  image_generation  BOOLEAN DEFAULT false,
  voice_support     BOOLEAN DEFAULT false,
  coding_support    BOOLEAN DEFAULT false,
  mobile_app        BOOLEAN DEFAULT false,
  context_window    TEXT,
  recommended_for   TEXT,
  features          TEXT[] DEFAULT '{}',
  alternatives      TEXT[] DEFAULT '{}',
  rating            DECIMAL(3,1),
  review_count      INTEGER DEFAULT 0,
  release_date      DATE,
  featured          BOOLEAN DEFAULT false,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ──────────────────────────────────────
-- REVIEWS TABLE
-- ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tool_id     UUID REFERENCES tools(id) ON DELETE CASCADE,
  author      TEXT NOT NULL,
  content     TEXT NOT NULL,
  rating      INTEGER CHECK (rating BETWEEN 1 AND 5),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS tools_slug_idx      ON tools(slug);
CREATE INDEX IF NOT EXISTS tools_category_idx  ON tools(category);
CREATE INDEX IF NOT EXISTS tools_featured_idx  ON tools(featured);
CREATE INDEX IF NOT EXISTS reviews_tool_id_idx ON reviews(tool_id);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tools_updated_at ON tools;
CREATE TRIGGER tools_updated_at
  BEFORE UPDATE ON tools FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE tools   ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read tools"   ON tools   FOR SELECT USING (true);
CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (true);

-- ──────────────────────────────────────
-- SEED DATA — 20 AI Tools
-- ──────────────────────────────────────
INSERT INTO tools (name,slug,company,description,website_url,affiliate_url,category,pricing,
  free_plan,api_support,web_search,file_upload,image_generation,voice_support,coding_support,
  mobile_app,context_window,recommended_for,features,alternatives,rating,review_count,release_date,featured)
VALUES
-- CHAT
('ChatGPT','chatgpt','OpenAI','OpenAI가 만든 세계에서 가장 인기 있는 AI 챗봇.','https://chatgpt.com','https://chatgpt.com',
  'chat','무료 / $20/월 (Plus) / $200/월 (Pro)',true,true,true,true,true,true,true,true,
  '128K tokens','일반 사용자, 개발자, 비즈니스',
  ARRAY['GPT-4o 모델','웹 브라우징','DALL-E 이미지 생성','Code Interpreter','파일 분석','커스텀 GPTs','음성 대화','멀티모달'],
  ARRAY['claude','gemini','perplexity'],4.7,4280,'2022-11-30',true),

('Claude','claude','Anthropic','Anthropic의 안전 중심 AI. 200K 토큰과 뛰어난 코딩·분석 능력.','https://claude.ai','https://claude.ai',
  'chat','무료 / $20/월 (Pro) / $100/월 (Team)',true,true,false,true,false,false,true,true,
  '200K tokens','코딩, 문서 분석, 비즈니스',
  ARRAY['Claude 3.5 Sonnet','200K 컨텍스트','Artifacts','Projects','파일 분석','API 접근','안전성 설계'],
  ARRAY['chatgpt','gemini','perplexity'],4.8,2910,'2023-03-14',true),

('Gemini','gemini','Google','Google의 멀티모달 AI. 1M 토큰과 Google Workspace 통합.','https://gemini.google.com','https://gemini.google.com',
  'chat','무료 / $19.99/월 (Advanced)',true,true,true,true,true,true,true,true,
  '1M tokens','Google 서비스 사용자, 멀티모달',
  ARRAY['Gemini 1.5 Pro','1M 컨텍스트','Google Workspace 통합','실시간 웹 검색','Imagen 3','코드 실행'],
  ARRAY['chatgpt','claude','perplexity'],4.4,1820,'2023-12-06',true),

('Perplexity','perplexity','Perplexity AI','실시간 웹 검색+AI 결합 검색 엔진. 출처 인용 답변.','https://perplexity.ai','https://perplexity.ai',
  'chat','무료 / $20/월 (Pro)',true,true,true,true,true,false,false,true,
  '모델별 상이','리서치, 정보 검색, 팩트체크',
  ARRAY['실시간 웹 검색','출처 인용','다중 AI 모델','Spaces 협업','파일 업로드','이미지 생성'],
  ARRAY['chatgpt','claude','gemini'],4.6,1540,'2022-12-07',true),

('Grok','grok','xAI','xAI의 AI. X 실시간 데이터 연동, 위트 있는 답변.','https://grok.com','https://grok.com',
  'chat','X Premium ($8/월) 포함',false,true,true,true,true,false,true,true,
  '131K tokens','X 사용자, 실시간 정보',
  ARRAY['Grok 2 모델','X 실시간 데이터','이미지 생성 (Aurora)','웹 검색','코딩 지원'],
  ARRAY['chatgpt','claude','gemini'],4.2,890,'2023-11-04',false),

-- CODING
('Cursor','cursor','Anysphere','AI 기반 차세대 코드 에디터. VS Code 호환, Composer 멀티파일 편집.','https://cursor.com','https://cursor.com',
  'coding','무료 / $20/월 (Pro) / $40/월 (Business)',true,false,false,false,false,false,true,false,
  '모델별 상이','전문 개발자, 풀스택 개발',
  ARRAY['AI Tab 자동완성','Composer 멀티파일','Chat','VS Code 호환','코드베이스 인덱싱','터미널 AI','Git 통합'],
  ARRAY['windsurf','github-copilot','claude-code'],4.9,3850,'2023-03-01',true),

('Windsurf','windsurf','Codeium','Codeium의 AI 에디터. Cascade 에이전트로 자율 코딩.','https://windsurf.com','https://windsurf.com',
  'coding','무료 / $15/월 (Pro) / $35/월 (Teams)',true,false,true,false,false,false,true,false,
  '모델별 상이','개발자, AI 에이전트 코딩',
  ARRAY['Cascade AI 에이전트','AI 자동완성','멀티파일 편집','웹 검색 통합','무제한 AI (무료)'],
  ARRAY['cursor','github-copilot','claude-code'],4.7,1120,'2024-11-13',true),

('GitHub Copilot','github-copilot','GitHub / Microsoft','모든 주요 IDE에서 동작하는 AI 코딩 어시스턴트.','https://github.com/features/copilot','https://github.com/features/copilot',
  'coding','무료 / $10/월 (Individual) / $19/월 (Business)',true,true,false,false,false,false,true,false,
  '모델별 상이','개발자, 기업, 오픈소스',
  ARRAY['멀티 IDE 지원','Copilot Chat','코드 자동완성','GitHub Actions 통합','PR 자동 리뷰'],
  ARRAY['cursor','windsurf','claude-code'],4.5,5200,'2021-06-29',false),

('Claude Code','claude-code','Anthropic','터미널 기반 AI 코딩 에이전트. 코드베이스 전체 이해.','https://claude.ai/code','https://claude.ai/code',
  'coding','API 사용량 기반',false,true,false,true,false,false,true,false,
  '200K tokens','시니어 개발자, 터미널 작업',
  ARRAY['터미널 기반 에이전트','전체 코드베이스 이해','멀티파일 편집','Git 작업','터미널 명령 실행'],
  ARRAY['cursor','windsurf','github-copilot'],4.6,680,'2025-02-24',false),

('Replit AI','replit-ai','Replit','브라우저 기반 AI 개발 환경. 설치 없이 코딩·즉시 배포.','https://replit.com','https://replit.com',
  'coding','무료 / $25/월 (Core)',true,false,false,true,false,false,true,true,
  '모델별 상이','학생, 초보자, 프로토타이핑',
  ARRAY['브라우저 기반 IDE','50+ 언어 지원','AI 코드 완성','즉시 배포','협업 기능'],
  ARRAY['cursor','windsurf','github-copilot'],4.3,2100,'2023-05-01',false),

-- IMAGE
('Midjourney','midjourney','Midjourney','세계 최고 품질의 AI 이미지 생성. 예술적 감각.','https://midjourney.com','https://midjourney.com',
  'image','$10/월 (Basic) / $30/월 (Standard) / $60/월 (Pro)',false,false,false,true,true,false,false,false,
  'N/A','아티스트, 디자이너, 크리에이터',
  ARRAY['Midjourney v6.1','고품질 이미지','다양한 스타일','이미지 업스케일','Style 참조','캐릭터 일관성'],
  ARRAY['leonardo-ai','adobe-firefly'],4.8,3200,'2022-07-12',true),

('Leonardo AI','leonardo-ai','Leonardo AI','게임·크리에이티브 특화 AI 이미지 플랫폼. 강력한 API.','https://leonardo.ai','https://leonardo.ai',
  'image','무료 / $12/월 (Apprentice) / $30/월 (Artisan)',true,true,false,true,true,false,false,true,
  'N/A','게임 개발자, 크리에이터, 기업',
  ARRAY['다양한 AI 모델','모델 파인튜닝','이미지-투-영상','실시간 캔버스','API 접근','배치 생성'],
  ARRAY['midjourney','adobe-firefly'],4.5,1680,'2022-11-01',false),

('Adobe Firefly','adobe-firefly','Adobe','상업적 이용 안전한 AI 이미지. Creative Cloud 통합.','https://firefly.adobe.com','https://firefly.adobe.com',
  'image','무료 / Creative Cloud 포함',true,true,false,true,true,false,false,true,
  'N/A','Adobe 사용자, 기업, 상업적 이용',
  ARRAY['상업적 이용 안전','Photoshop Generative Fill','Illustrator 벡터','배경 제거','이미지 확장'],
  ARRAY['midjourney','leonardo-ai'],4.3,1240,'2023-03-21',false),

-- VIDEO
('Runway','runway','Runway','할리우드도 사용하는 AI 비디오 생성·편집. Gen-3 Alpha.','https://runwayml.com','https://runwayml.com',
  'video','무료 / $15/월 (Standard) / $35/월 (Pro)',true,true,false,true,true,false,false,true,
  'N/A','비디오 크리에이터, 영화 제작자',
  ARRAY['Gen-3 Alpha 비디오','텍스트-투-비디오','이미지-투-비디오','배경 제거','모션 브러시','오디오 생성'],
  ARRAY['kling-ai','pika'],4.6,1450,'2023-06-12',true),

-- VOICE
('ElevenLabs','elevenlabs','ElevenLabs','세계 최고 품질 AI 음성 합성. 29개 언어 지원.','https://elevenlabs.io','https://elevenlabs.io',
  'voice','무료 / $5/월 (Starter) / $22/월 (Creator)',true,true,false,false,false,true,false,true,
  'N/A','크리에이터, 팟캐스터, 게임 개발',
  ARRAY['고품질 음성 합성','음성 클로닝','29개 언어','AI 더빙','감정 제어','Conversational AI API'],
  ARRAY['murf','play-ht'],4.7,1890,'2022-01-01',true),

-- PRODUCTIVITY
('Notion AI','notion-ai','Notion','Notion 내장 AI. 문서 작성, 요약, Q&A 자동화.','https://notion.so/product/ai','https://notion.so/product/ai',
  'productivity','$10/월 (AI 애드온)',false,true,false,true,false,false,false,true,
  'N/A','팀 협업, 지식 관리',
  ARRAY['문서 AI 작성','콘텐츠 요약','번역','AI Q&A','데이터베이스 자동화','팀 협업'],
  ARRAY['grammarly','notebooklm'],4.4,2840,'2023-02-22',false),

('Grammarly','grammarly','Grammarly','AI 글쓰기 어시스턴트. 문법 교정·스타일 개선·생성 AI.','https://grammarly.com','https://grammarly.com',
  'productivity','무료 / $12/월 (Premium) / $15/월 (Business)',true,false,false,false,false,false,false,true,
  'N/A','비즈니스 커뮤니케이션, 학생, 작가',
  ARRAY['문법·철자 교정','스타일 개선','GrammarlyGO 생성 AI','표절 검사','브라우저 확장','MS Office 통합'],
  ARRAY['notion-ai','chatgpt'],4.5,4500,'2009-07-01',false),

('NotebookLM','notebooklm','Google','Google AI 리서치 어시스턴트. 문서 기반 Q&A·팟캐스트.','https://notebooklm.google.com','https://notebooklm.google.com',
  'productivity','무료',true,false,false,true,false,true,false,false,
  '소스별 상이','학생, 리서처, 문서 분석',
  ARRAY['문서 기반 Q&A','AI 요약','Audio Overview 팟캐스트','소스 인용','마인드맵','완전 무료'],
  ARRAY['notion-ai','perplexity'],4.6,1350,'2023-07-12',false),

-- DESIGN
('Canva AI','canva-ai','Canva','Canva Magic Studio. 이미지 생성, 배경 제거, 프레젠테이션 자동화.','https://canva.com','https://canva.com',
  'design','무료 / $15/월 (Pro) / $30/월 (Teams)',true,false,false,true,true,false,false,true,
  'N/A','마케터, 소셜 미디어, 비디자이너',
  ARRAY['Magic Media 이미지 생성','Magic Eraser','Magic Design','AI 프레젠테이션','배경 제거','100만+ 템플릿'],
  ARRAY['figma-ai','adobe-firefly'],4.6,5800,'2013-01-01',true),

('Figma AI','figma-ai','Figma','Figma 내장 AI. 디자인 생성, 프로토타입 자동화, 코드 생성.','https://figma.com','https://figma.com',
  'design','무료 / $15/월 (Professional) / $45/월 (Organization)',true,true,false,true,false,false,true,true,
  'N/A','UI/UX 디자이너, 개발자, 프로덕트 팀',
  ARRAY['AI 레이아웃 생성','Dev Mode AI 코드 생성','콘텐츠 자동 채우기','시각적 검색','실시간 협업'],
  ARRAY['canva-ai','adobe-firefly'],4.5,2100,'2016-09-26',false)

ON CONFLICT (slug) DO UPDATE SET
  company=EXCLUDED.company, description=EXCLUDED.description,
  pricing=EXCLUDED.pricing, free_plan=EXCLUDED.free_plan,
  api_support=EXCLUDED.api_support, web_search=EXCLUDED.web_search,
  features=EXCLUDED.features, rating=EXCLUDED.rating,
  updated_at=NOW();

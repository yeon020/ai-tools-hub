export type Category =
  | "chat"
  | "coding"
  | "image"
  | "video"
  | "voice"
  | "productivity"
  | "design";

export interface Tool {
  id: string;
  name: string;
  slug: string;
  company: string;
  description: string;          // English (base)
  description_ko?: string;      // Korean override
  long_description?: string;    // English (base)
  long_description_ko?: string; // Korean override
  logo_url: string;
  website_url: string;
  affiliate_url: string;
  category: Category;
  pricing: string;
  free_plan: boolean;
  api_support: boolean;
  web_search: boolean;
  file_upload: boolean;
  image_generation: boolean;
  voice_support: boolean;
  coding_support: boolean;
  mobile_app: boolean;
  context_window: string;
  recommended_for: string;
  features: string[];           // English (base)
  features_ko?: string[];       // Korean override
  alternatives: string[];
  rating?: number;
  review_count?: number;
  release_date: string;
  created_at: string;
  updated_at: string;
  featured?: boolean;
}

export interface Review {
  id: string;
  tool_id: string;
  author: string;
  content: string;
  rating: number;
  created_at: string;
}

export interface CategoryInfo {
  slug: Category;
  label: string;
  description: string;
  icon: string;
}

export interface ComparisonFeature {
  key: keyof Tool;
  label: string;
  type: "boolean" | "text" | "rating";
}

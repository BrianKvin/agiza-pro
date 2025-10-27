// Type definitions for API data models

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number | null;
  campaign_price?: number | null;
  image?: string | null;
  image_url?: string | null;
  stock?: number | null;
  in_stock?: boolean | null;
  discount_percentage?: number | null;
  category?: string | null;
}

export interface Merchant {
  id: string;
  slug: string;
  name: string;
  brand_color?: string | null;
  whatsapp_number?: string | null;
  location?: string | null;
  logo_url?: string | null;
  description?: string | null;
  website_url?: string | null;
}

export interface Campaign {
  id: string;
  slug: string;
  merchant_id: string;
  merchant_slug: string;
  title: string;
  description: string;
  hero_image?: string | null;
  template_type: string;
  template?: string | null;
  products: Product[];
  merchant: Merchant;
  start_date?: string | null;
  end_date?: string | null;
  is_active: boolean;
  background_color?: string | null;
  text_color?: string | null;
  primary_color?: string | null;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface CampaignResponse {
  success: boolean;
  data: Campaign;
  message?: string | null;
}

export interface CampaignsListResponse {
  success: boolean;
  data: Campaign[];
  total: number;
  message?: string | null;
}

export interface ViewResponse {
  success: boolean;
  campaign_id: string;
  views: number;
  message: string;
}


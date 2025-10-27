from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from datetime import datetime


class Product(BaseModel):
    id: str
    name: str
    description: str
    price: float  # discounted/campaign price
    original_price: Optional[float] = None
    campaign_price: Optional[float] = None  # explicit campaign price naming
    image: Optional[HttpUrl] = None  # requirement: image
    image_url: Optional[HttpUrl] = None  # keep for backward compatibility
    stock: Optional[int] = None  # requirement: stock (count)
    in_stock: Optional[bool] = True  # keep for backward compatibility
    discount_percentage: Optional[int] = None
    category: Optional[str] = None

    def __init__(self, **data):
        # Auto-fill campaign_price and image if not provided
        if 'campaign_price' not in data and 'price' in data:
            data['campaign_price'] = data['price']
        if 'image' not in data and 'image_url' in data:
            data['image'] = data['image_url']
        super().__init__(**data)


class Merchant(BaseModel):
    id: str
    slug: str  # requirement: merchant slug
    name: str
    brand_color: Optional[str] = None  # requirement: brand color (for social media)
    whatsapp_number: Optional[str] = None  # requirement: whatsapp number
    location: Optional[str] = None  # requirement: location
    logo_url: Optional[HttpUrl] = None
    description: Optional[str] = None
    website_url: Optional[HttpUrl] = None


class Campaign(BaseModel):
    id: str
    slug: str  # requirement: campaign slug
    merchant_id: str
    merchant_slug: str  # requirement: for routing
    title: str
    description: str
    hero_image: Optional[HttpUrl] = None  # requirement: hero_image (for social media)
    template_type: str  # requirement: template_type (renamed from template)
    template: Optional[str] = None  # keep for backward compatibility
    products: List[Product]
    merchant: Merchant
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    is_active: bool = True
    background_color: Optional[str] = "#ffffff"
    text_color: Optional[str] = "#000000"
    primary_color: Optional[str] = "#007bff"
    views: int = 0  # requirement: view count tracking
    created_at: datetime
    updated_at: datetime

    def __init__(self, **data):
        # Auto-fill slug if not provided
        if 'slug' not in data and 'id' in data:
            data['slug'] = data['id'].replace('_', '-')
        # Auto-fill template_type from template if not provided
        if 'template_type' not in data and 'template' in data:
            data['template_type'] = data['template']
        super().__init__(**data)


class CampaignResponse(BaseModel):
    success: bool
    data: Optional[Campaign] = None
    message: Optional[str] = None


class CampaignsListResponse(BaseModel):
    success: bool
    data: List[Campaign]
    total: int
    message: Optional[str] = None


class ViewResponse(BaseModel):
    success: bool
    campaign_id: str
    views: int
    message: str

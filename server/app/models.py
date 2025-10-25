from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from datetime import datetime


class Product(BaseModel):
    id: str
    name: str
    description: str
    price: float
    original_price: Optional[float] = None
    image_url: HttpUrl
    discount_percentage: Optional[int] = None
    in_stock: bool = True
    category: Optional[str] = None


class Merchant(BaseModel):
    id: str
    name: str
    logo_url: Optional[HttpUrl] = None
    description: Optional[str] = None
    website_url: Optional[HttpUrl] = None
    whatsapp_number: Optional[str] = None


class Campaign(BaseModel):
    id: str
    merchant_id: str
    title: str
    description: str
    template: str  # "productgrid", "minimal", "storystyle"
    products: List[Product]
    merchant: Merchant
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    is_active: bool = True
    background_color: Optional[str] = "#ffffff"
    text_color: Optional[str] = "#000000"
    primary_color: Optional[str] = "#007bff"
    created_at: datetime
    updated_at: datetime


class CampaignResponse(BaseModel):
    success: bool
    data: Optional[Campaign] = None
    message: Optional[str] = None


class CampaignsListResponse(BaseModel):
    success: bool
    data: List[Campaign]
    total: int
    message: Optional[str] = None
from datetime import datetime
from app.models import Campaign, Product, Merchant

# Mock Merchants with all required fields
merchants = [
    Merchant(
        id="merchant_1",
        slug="techstore-pro",
        name="TechStore Pro",
        brand_color="#007bff",
        whatsapp_number="+254712345678",
        location="Nairobi, Kenya",
        logo_url="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
        description="Your one-stop shop for the latest technology and gadgets",
        website_url="https://techstorepro.com"
    ),
    Merchant(
        id="merchant_2",
        slug="fashion-forward",
        name="Fashion Forward",
        brand_color="#e91e63",
        whatsapp_number="+254723456789",
        location="Mombasa, Kenya",
        logo_url="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop",
        description="Trendy fashion for the modern lifestyle",
        website_url="https://fashionforward.com"
    ),
    Merchant(
        id="merchant_3",
        slug="home-garden",
        name="Home & Garden",
        brand_color="#27ae60",
        whatsapp_number="+254734567890",
        location="Kisumu, Kenya",
        logo_url="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop",
        description="Everything you need for your home and garden",
        website_url="https://homeandgarden.com"
    )
]

# Mock Products - Tech Store
products_tech = [
    Product(
        id="product_1",
        name="Wireless Bluetooth Headphones",
        description="High-quality wireless headphones with noise cancellation",
        price=99.99,
        campaign_price=99.99,
        original_price=149.99,
        image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        image_url="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        stock=15,
        in_stock=True,
        discount_percentage=33,
        category="Electronics"
    ),
    Product(
        id="product_2",
        name="Smart Watch Series 5",
        description="Advanced smartwatch with health monitoring features",
        price=299.99,
        campaign_price=299.99,
        original_price=399.99,
        image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        image_url="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        stock=8,
        in_stock=True,
        discount_percentage=25,
        category="Electronics"
    ),
    Product(
        id="是否正确",
        name="Portable Power Bank",
        description="10000mAh portable charger for all your devices",
        price=29.99,
        campaign_price=29.99,
        original_price=39.99,
        image="https://images.unsplash.com/photo-1609592807901-0a4a4b4a4b4a?w=400&h=400&fit=crop",
        image_url="https://images.unsplash.com/photo-1609592807901-0a4a4b4a4b4a?w=400&h=400&fit=crop",
        stock=25,
        in_stock=True,
        discount_percentage=25,
        category="Accessories"
    )
]

# Mock Products - Fashion
products_fashion = [
    Product(
        id="product_4",
        name="Designer Jeans",
        description="Premium denim jeans with perfect fit",
        price=89.99,
        campaign_price=89.99,
        original_price=129.99,
        image="https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
        image_url="https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
        stock=12,
        in_stock=True,
        discount_percentage=31,
        category="Clothing"
    ),
    Product(
        id="product_5",
        name="Leather Jacket",
        description="Genuine leather jacket for all seasons",
        price=199.99,
        campaign_price=199.99,
        original_price=299.99,
        image="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
        image_url="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
        stock=6,
        in_stock=True,
        discount_percentage=33,
        category="Outerwear"
    ),
    Product(
        id="product_6",
        name="Running Shoes",
        description="Comfortable running shoes for athletes",
        price=79.99,
        campaign_price=79.99,
        original_price=119.99,
        image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        image_url="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        stock=18,
        in_stock=True,
        discount_percentage=33,
        category="Footwear"
    )
]

# Mock Products - Home & Garden
products_home = [
    Product(
        id="product_7",
        name="Indoor Plant Set",
        description="Beautiful indoor plants to brighten your space",
        price=49.99,
        campaign_price=49.99,
        original_price=69.99,
        image="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
        image_url="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
        stock=10,
        in_stock=True,
        discount_percentage=29,
        category="Plants"
    ),
    Product(
        id="product_8",
        name="Ceramic Dinnerware Set",
        description="Elegant ceramic plates and bowls for your dining table",
        price=89.99,
        campaign_price=89.99,
        original_price=129.99,
        image="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
        image_url="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
        stock=7,
        in_stock=True,
        discount_percentage=31,
        category="Kitchen"
    ),
    Product(
        id="product_9",
        name="LED Desk Lamp",
        description="Modern LED desk lamp with adjustable brightness",
        price=39.99,
        campaign_price=39.99,
        original_price=59.99,
        image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        image_url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        stock=14,
        in_stock=True,
        discount_percentage=33,
        category="Lighting"
    )
]

# Mock Campaigns with all required fields including hero images
campaigns = [
    Campaign(
        id="campaign_1",
        slug="tech-black-friday-sale",
        merchant_id="merchant_1",
        merchant_slug="techstore-pro",
        title="Tech Black Friday Sale",
        description="Get up to 50% off on all tech gadgets! Limited time offer. Shop now and save on wireless headphones, smartwatches, and more.",
        hero_image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=630&fit=crop",
        template_type="productgrid",
        template="productgrid",
        products=products_tech,
        merchant=merchants[0],
        start_date=datetime(2024, 1, 1),
        end_date=datetime(2024, 12, 31),
        is_active=True,
        background_color="#f8f9fa",
        text_color="#212529",
        primary_color="#007bff",
        views=0,
        created_at=datetime.now(),
        updated_at=datetime.now()
    ),
    Campaign(
        id="campaign_2",
        slug="summer-fashion-collection",
        merchant_id="merchant_2",
        merchant_slug="fashion-forward",
        title="Summer Fashion Collection",
        description="Discover the latest summer trends with amazing discounts! From designer jeans to leather jackets, find your perfect style.",
        hero_image="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=630&fit=crop",
        template_type="minimal",
        template="minimal",
        products=products_fashion,
        merchant=merchants[1],
        start_date=datetime(2024, 6, 1),
        end_date=datetime(2024, 8, 31),
        is_active=True,
        background_color="#ffffff",
        text_color="#000000",
        primary_color="#e91e63",
        views=0,
        created_at=datetime.now(),
        updated_at=datetime.now()
    ),
    Campaign(
        id="campaign_3",
        slug="home-makeover-special",
        merchant_id="merchant_3",
        merchant_slug="home-garden",
        title="Home Makeover Special",
        description="Transform your home with our curated collection of home essentials. From indoor plants to elegant dinnerware, create the perfect space.",
        hero_image="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=630&fit=crop",
        template_type="storystyle",
        template="storystyle",
        products=products_home,
        merchant=merchants[2],
        start_date=datetime(2024, 1, 1),
        end_date=datetime(2024, 12, 31),
        is_active=True,
        background_color="#f0f8ff",
        text_color="#2c3e50",
        primary_color="#27ae60",
        views=0,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
]

# In-memory storage for view counts
view_counts = {
    "campaign_1": 0,
    "campaign_2": 0,
    "campaign_3": 0
}

def get_campaign_by_id(campaign_id: str) -> Campaign | None:
    """Get a campaign by its ID"""
    for campaign in campaigns:
        if campaign.id == campaign_id:
            return campaign
    return None

def get_campaign_by_slug(merchant_slug: str, campaign_slug: str) -> Campaign | None:
    """Get a campaign by merchant slug and campaign slug"""
    for campaign in campaigns:
        if campaign.merchant_slug == merchant_slug and campaign.slug == campaign_slug:
            return campaign
    return None

def get_campaigns_by_merchant(merchant_id: str) -> list[Campaign]:
    """Get all campaigns for a specific merchant"""
    return [campaign for campaign in campaigns if campaign.merchant_id == merchant_id]

def get_all_campaigns() -> list[Campaign]:
    """Get all active campaigns"""
    return [campaign for campaign in campaigns if campaign.is_active]

def increment_view_count(campaign_id: str) -> int:
    """Increment and return view count for a campaign"""
    if campaign_id in view_counts:
        view_counts[campaign_id] += 1
        # Update the campaign object as well
        campaign = get_campaign_by_id(campaign_id)
        if campaign:
            campaign.views = view_counts[campaign_id]
        return view_counts[campaign_id]
    return 0

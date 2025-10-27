import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from app.main import app


@pytest_asyncio.fixture
async def client():
    """Create async client for testing"""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://testserver") as ac:
        yield ac


@pytest.mark.asyncio
async def test_root_endpoint(client):
    """Test the root endpoint"""
    response = await client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "version" in data
    assert data["message"] == "Welcome to AgizaPro Campaign API"


@pytest.mark.asyncio
async def test_health_check(client):
    """Test the health check endpoint"""
    response = await client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["message"] == "API is running"


@pytest.mark.asyncio
async def test_get_campaigns(client):
    """Test getting all campaigns"""
    response = await client.get("/campaigns")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "data" in data
    assert "total" in data
    assert isinstance(data["data"], list)
    assert len(data["data"]) > 0  # Should have at least 3 campaigns


@pytest.mark.asyncio
async def test_get_campaign_by_id(client):
    """Test getting a specific campaign by ID"""
    response = await client.get("/campaigns/campaign_1")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["id"] == "campaign_1"
    assert "slug" in data["data"]  # New required field
    assert "merchant_slug" in data["data"]  # New required field
    assert "hero_image" in data["data"]  # New required field


@pytest.mark.asyncio
async def test_get_campaign_by_slug(client):
    """Test getting a campaign using merchant_slug and campaign_slug"""
    response = await client.get("/campaigns/techstore-pro/tech-black-friday-sale")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["slug"] == "tech-black-friday-sale"
    assert data["data"]["merchant_slug"] == "techstore-pro"


@pytest.mark.asyncio
async def test_get_nonexistent_campaign_by_id(client):
    """Test getting a non-existent campaign by ID"""
    response = await client.get("/campaigns/nonexistent")
    assert response.status_code == 404
    data = response.json()
    assert "detail" in data
    assert "not found" in data["detail"].lower()


@pytest.mark.asyncio
async def test_get_nonexistent_campaign_by_slug(client):
    """Test getting a non-existent campaign by slug"""
    response = await client.get("/campaigns/invalid-merchant/invalid-campaign")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_get_merchant_campaigns(client):
    """Test getting all campaigns for a specific merchant"""
    response = await client.get("/merchants/merchant_1/campaigns")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert isinstance(data["data"], list)
    # Should have at least 1 campaign for merchant_1


@pytest.mark.asyncio
async def test_campaign_has_required_fields(client):
    """Test that campaign data includes all required fields"""
    response = await client.get("/campaigns/campaign_1")
    assert response.status_code == 200
    data = response.json()["data"]
    
    # Required campaign fields
    assert "id" in data
    assert "slug" in data
    assert "title" in data
    assert "description" in data
    assert "hero_image" in data
    assert "template_type" in data
    assert "products" in data
    assert "merchant" in data
    assert "start_date" in data
    assert "end_date" in data


@pytest.mark.asyncio
async def test_campaign_merchant_has_required_fields(client):
    """Test that campaign's merchant includes all required fields"""
    response = await client.get("/campaigns/campaign_1")
    assert response.status_code == 200
    merchant = response.json()["data"]["merchant"]
    
    # Required merchant fields
    assert "id" in merchant
    assert "slug" in merchant  # New required field
    assert "name" in merchant
    assert "brand_color" in merchant  # New required field
    assert "whatsapp_number" in merchant  # New required field
    assert "location" in merchant  # New required field


@pytest.mark.asyncio
async def test_campaign_product_has_required_fields(client):
    """Test that campaign products include all required fields"""
    response = await client.get("/campaigns/campaign_1")
    assert response.status_code == 200
    products = response.json()["data"]["products"]
    assert len(products) > 0
    
    product = products[0]
    # Required product fields
    assert "id" in product
    assert "name" in product
    assert "price" in product
    assert "image" in product  # New required field
    assert "stock" in product  # New required field


@pytest.mark.asyncio
async def test_post_campaign_view(client):
    """Test POST /campaigns/{campaign_id}/view endpoint (analytics)"""
    # Get initial view count
    response = await client.get("/campaigns/campaign_2")
    initial_campaign = response.json()["data"]
    
    # Post a view
    response = await client.post("/campaigns/campaign_2/view")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["campaign_id"] == "campaign_2"
    assert "views" in data
    assert isinstance(data["views"], int)
    assert data["views"] > 0


@pytest.mark.asyncio
async def test_post_view_increments_count(client):
    """Test that posting view increments the view count"""
    # Clear any previous views by checking current count
    response = await client.get("/campaigns/campaign_3")
    current_views = response.json()["data"]["views"] or 0
    
    # Post view and check increment
    response = await client.post("/campaigns/campaign_3/view")
    new_views = response.json()["views"]
    assert new_views == current_views + 1


@pytest.mark.asyncio
async def test_post_view_invalid_campaign(client):
    """Test posting view for non-existent campaign"""
    response = await client.post("/campaigns/invalid_campaign/view")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_campaign_template_types(client):
    """Test that different campaign templates work"""
    # Test productgrid template
    response = await client.get("/campaigns/campaign_1")
    assert response.status_code == 200
    assert response.json()["data"]["template_type"] == "productgrid"
    
    # Test minimal template
    response = await client.get("/campaigns/campaign_2")
    assert response.status_code == 200
    assert response.json()["data"]["template_type"] == "minimal"
    
    # Test storystyle template
    response = await client.get("/campaigns/campaign_3")
    assert response.status_code == 200
    assert response.json()["data"]["template_type"] == "storystyle"


@pytest.mark.asyncio
async def test_product_pricing_structure(client):
    """Test that products have proper pricing fields"""
    response = await client.get("/campaigns/campaign_1")
    products = response.json()["data"]["products"]
    
    for product in products:
        assert "price" in product  # campaign price
        assert "original_price" in product  # original price
        # If discounted, original price should be higher
        if product.get("original_price"):
            assert product["price"] <= product["original_price"]


@pytest.mark.asyncio
async def test_hero_image_url(client):
    """Test that hero_image is a valid URL"""
    response = await client.get("/campaigns/campaign_1")
    hero_image = response.json()["data"]["hero_image"]
    assert hero_image is not None
    assert hero_image.startswith("http://") or hero_image.startswith("https://")

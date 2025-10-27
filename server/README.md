# AgizaPro Campaign API - Server

FastAPI backend providing campaign data for the AgizaPro campaign page generator.

## Tech Stack

- **FastAPI** - Modern Python web framework
- **Python 3.11+** - Runtime
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

## Features

- ✅ RESTful API for campaign data
- ✅ CORS support for cross-origin requests
- ✅ Static mock data for development
- ✅ View tracking (analytics)
- ✅ Comprehensive API documentation (Swagger/ReDoc)

## Getting Started

### Prerequisites

- Python 3.11+
- pip or poetry

### Installation

```bash
# Using pip
pip install -r requirements.txt

# Using poetry (if available)
poetry install
```

### Development

```bash
# Run with auto-reload
python run.py

# Or using uvicorn directly
uvicorn app.main:app --reload
```

API will be available at `http://localhost:8000`

### Production

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

## API Endpoints

### Root

- **GET /** - API information
- **GET /health** - Health check

### Campaigns

- **GET /campaigns** - List all active campaigns
- **GET /campaigns/{campaign_id}** - Get campaign by ID
- **GET /campaigns/{merchant_slug}/{campaign_slug}** - Get campaign by slugs
- **POST /campaigns/{campaign_id}/view** - Increment view count (analytics)

### Merchants

- **GET /merchants/{merchant_id}/campaigns** - Get all campaigns for a merchant

## API Documentation

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## Data Models

### Campaign

```python
class Campaign(BaseModel):
    id: str
    slug: str
    merchant_id: str
    merchant_slug: str
    title: str
    description: str
    hero_image: Optional[HttpUrl]  # For social media previews
    template_type: str  # productgrid, minimal, storystyle
    products: List[Product]
    merchant: Merchant
    start_date: Optional[datetime]
    end_date: Optional[datetime]
    is_active: bool
    background_color: Optional[str]
    text_color: Optional[str]
    primary_color: Optional[str]
    views: int  # View count for analytics
```

### Merchant

```python
class Merchant(BaseModel):
    id: str
    slug: str
    name: str
    brand_color: Optional[str]
    whatsapp_number: Optional[str]
    location: Optional[str]
    logo_url: Optional[HttpUrl]
    description: Optional[str]
    website_url: Optional[HttpUrl]
```

### Product

```python
class Product(BaseModel):
    id: str
    name: str
    description: str
    price: float  # Discounted/campaign price
    original_price: Optional[float]
    image: Optional[HttpUrl]
    stock: Optional[int]
    in_stock: Optional[bool]
    discount_percentage: Optional[int]
    category: Optional[str]
```

## Mock Data

The server includes realistic mock data with 3 merchants and 3 campaigns:

1. **TechStore Pro** - Tech gadgets (Product Grid template)
2. **Fashion Forward** - Summer collection (Minimal template)
3. **Home & Garden** - Home essentials (Story Style template)

Products use Unsplash images for reliable image URLs.

## Environment Variables

### CORS Configuration

Set `CORS_ORIGINS` to allow specific origins (comma-separated):

```env
CORS_ORIGINS=https://agiza-pro.onrender.com,https://www.agizapro.com
```

If not set or empty, CORS allows all origins (`*`).

### Server Configuration

```env
HOST=0.0.0.0        # Server host (default: 0.0.0.0)
PORT=8000            # Server port (default: 8000)
RELOAD=false         # Auto-reload (default: false)
```

## Project Structure

```
server/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── config.py            # Settings and CORS configuration
│   ├── models.py            # Pydantic models
│   └── data.py              # Mock data and data access functions
├── tests/
│   ├── __init__.py
│   └── test_api.py          # API tests
├── requirements.txt         # Python dependencies
├── run.py                   # Development server entry point
└── README.md
```

## Data Access Functions

All data access is handled in `app/data.py`:

```python
def get_all_campaigns() -> list[Campaign]
def get_campaign_by_id(campaign_id: str) -> Campaign | None
def get_campaign_by_slug(merchant_slug: str, campaign_slug: str) -> Campaign | None
def get_campaigns_by_merchant(merchant_id: str) -> list[Campaign]
def increment_view_count(campaign_id: str) -> int
```

## Testing

```bash
# Run tests
pytest

# Run with coverage
pytest --cov=app
```

## Deployment

### Render

- **Service Type**: Web Service
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- **Environment Variables**: See above

### Other Platforms

Any platform that supports Python 3.11+ and ASGI apps:

- Railway
- Heroku
- DigitalOcean App Platform
- AWS Lambda (with Mangum)

## CORS Configuration

CORS is configured in `app/config.py`:

```python
cors_origins: List[str] = []

def __init__(self):
    cors_env = os.getenv("CORS_ORIGINS")
    if cors_env:
        self.cors_origins = [origin.strip() for origin in cors_env.split(',')]
```

If `CORS_ORIGINS` is empty or not set, all origins are allowed (`*`).

## Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Success message"
}
```

Error responses:

```json
{
  "detail": "Error message"
}
```

## License

Part of the AgizaPro Campaign Pages project.

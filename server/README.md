# AgizaPro Campaign API Backend

A FastAPI-based backend service for managing campaign pages and merchant data.

## Features

- **Campaign Management**: Create and manage campaign pages
- **Merchant Support**: Multiple merchants with their own campaigns
- **Template System**: Support for different campaign templates (ProductGrid, Minimal, StoryStyle)
- **RESTful API**: Clean API endpoints for frontend integration
- **CORS Support**: Configured for frontend communication
- **Mock Data**: Pre-loaded sample data for testing

## Quick Start

### Prerequisites

- Python 3.10+
- pip (Python package manager)

### Installation

1. **Clone and navigate to the server directory**:

   ```bash
   cd server
   ```

2. **Create and activate virtual environment**:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the server**:

   ```bash
   python run.py
   ```

   Or alternatively:

   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

5. **Access the API**:
   - API: http://localhost:8000
   - Interactive docs: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

## API Endpoints

### Core Endpoints

- `GET /` - Root endpoint with API information
- `GET /health` - Health check endpoint

### Campaign Endpoints

- `GET /campaigns` - Get all active campaigns
- `GET /campaigns/{campaign_id}` - Get a specific campaign
- `GET /merchants/{merchant_id}/campaigns` - Get campaigns for a merchant
- `GET /campaigns/{merchant_id}/{campaign_id}` - Get campaign by merchant and ID

### Example API Calls

```bash
# Get all campaigns
curl http://localhost:8000/campaigns

# Get a specific campaign
curl http://localhost:8000/campaigns/campaign_1

# Get merchant campaigns
curl http://localhost:8000/merchants/merchant_1/campaigns
```

## Project Structure

```
server/
├── app/
│   ├── __init__.py
│   ├── main.py          # FastAPI application
│   ├── models.py        # Pydantic models
│   ├── data.py          # Mock data
│   └── config.py        # Configuration settings
├── tests/
│   ├── __init__.py
│   └── test_api.py      # API tests
├── requirements.txt     # Python dependencies
├── run.py              # Server startup script
├── .env.example        # Environment variables template
└── README.md           # This file
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=8000
HOST=0.0.0.0
RELOAD=True
CORS_ORIGINS=http://localhost:3000,https://yourdomain.vercel.app
```

## Testing

Run the test suite:

```bash
pytest tests/
```

## Development

The server runs with auto-reload enabled by default, so changes to the code will automatically restart the server.

## Mock Data

The API comes with pre-loaded mock data including:

- 3 merchants (TechStore Pro, Fashion Forward, Home & Garden)
- 9 products across different categories
- 3 sample campaigns with different templates

## Next Steps

1. **Database Integration**: Replace mock data with a real database
2. **Authentication**: Add merchant authentication
3. **Campaign Management**: Add CRUD operations for campaigns
4. **Image Upload**: Add image upload functionality
5. **Analytics**: Add campaign analytics tracking

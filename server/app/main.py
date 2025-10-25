from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.config import settings
from app.models import CampaignResponse, CampaignsListResponse
from app.data import get_campaign_by_id, get_campaigns_by_merchant, get_all_campaigns
import uvicorn

# Create FastAPI app
app = FastAPI(
    title=settings.api_title,
    description=settings.api_description,
    version=settings.api_version,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Welcome to AgizaPro Campaign API",
        "version": settings.api_version,
        "docs": "/docs",
        "redoc": "/redoc"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "API is running"}


@app.get("/campaigns", response_model=CampaignsListResponse)
async def get_campaigns():
    """Get all active campaigns"""
    try:
        campaigns = get_all_campaigns()
        return CampaignsListResponse(
            success=True,
            data=campaigns,
            total=len(campaigns),
            message=f"Found {len(campaigns)} active campaigns"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/campaigns/{campaign_id}", response_model=CampaignResponse)
async def get_campaign(campaign_id: str):
    """Get a specific campaign by ID"""
    try:
        campaign = get_campaign_by_id(campaign_id)
        if not campaign:
            raise HTTPException(status_code=404, detail="Campaign not found")
        
        return CampaignResponse(
            success=True,
            data=campaign,
            message="Campaign retrieved successfully"
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/merchants/{merchant_id}/campaigns", response_model=CampaignsListResponse)
async def get_merchant_campaigns(merchant_id: str):
    """Get all campaigns for a specific merchant"""
    try:
        campaigns = get_campaigns_by_merchant(merchant_id)
        return CampaignsListResponse(
            success=True,
            data=campaigns,
            total=len(campaigns),
            message=f"Found {len(campaigns)} campaigns for merchant {merchant_id}"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/campaigns/{merchant_id}/{campaign_id}", response_model=CampaignResponse)
async def get_campaign_by_merchant_and_id(merchant_id: str, campaign_id: str):
    """Get a specific campaign by merchant ID and campaign ID"""
    try:
        campaign = get_campaign_by_id(campaign_id)
        if not campaign:
            raise HTTPException(status_code=404, detail="Campaign not found")
        
        if campaign.merchant_id != merchant_id:
            raise HTTPException(status_code=404, detail="Campaign not found for this merchant")
        
        return CampaignResponse(
            success=True,
            data=campaign,
            message="Campaign retrieved successfully"
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.reload
    )

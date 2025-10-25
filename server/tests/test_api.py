import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_root_endpoint():
    """Test the root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "version" in data


def test_health_check():
    """Test the health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"


def test_get_campaigns():
    """Test getting all campaigns"""
    response = client.get("/campaigns")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "data" in data
    assert "total" in data


def test_get_campaign_by_id():
    """Test getting a specific campaign"""
    response = client.get("/campaigns/campaign_1")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["id"] == "campaign_1"


def test_get_nonexistent_campaign():
    """Test getting a non-existent campaign"""
    response = client.get("/campaigns/nonexistent")
    assert response.status_code == 404

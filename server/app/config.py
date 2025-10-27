import os
from pydantic_settings import BaseSettings
from pydantic import field_validator
from typing import List

class Settings(BaseSettings):
    # Server Configuration
    host: str = os.getenv("HOST", "0.0.0.0")
    port: int = int(os.getenv("PORT", 8000))  # Render sets PORT dynamically
    reload: bool = os.getenv("RELOAD", "False").lower() == "true"
    
    # CORS Configuration - handle both env var (comma-separated) and default list
    cors_origins: List[str] = [
        "http://localhost:3000",
        "https://yourdomain.vercel.app"
    ]
    
    @field_validator('cors_origins', mode='before')
    @classmethod
    def parse_cors_origins(cls, v):
        if isinstance(v, str):
            # Split comma-separated string and strip whitespace
            return [origin.strip() for origin in v.split(',')]
        return v
    
    # API Configuration
    api_title: str = "AgizaPro Campaign API"
    api_description: str = "API for managing campaign pages and merchant data"
    api_version: str = "1.0.0"
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()

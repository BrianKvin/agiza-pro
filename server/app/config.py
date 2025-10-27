import os
from typing import List

class Settings:
    """Simple settings class without pydantic for CORS configuration"""
    
    # Server Configuration
    host: str = os.getenv("HOST", "0.0.0.0")
    port: int = int(os.getenv("PORT", "8000"))
    reload: bool = os.getenv("RELOAD", "False").lower() == "true"
    
    # CORS Configuration - allow all origins by default (empty list = allow all)
    cors_origins: List[str] = []
    
    # API Configuration
    api_title: str = "AgizaPro Campaign API"
    api_description: str = "API for managing campaign pages and merchant data"
    api_version: str = "1.0.0"
    
    def __init__(self):
        # Override CORS if CORS_ORIGINS environment variable is set
        cors_env = os.getenv("CORS_ORIGINS")
        if cors_env:
            self.cors_origins = [origin.strip() for origin in cors_env.split(',')]


settings = Settings()

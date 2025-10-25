from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # Server Configuration
    host: str = "0.0.0.0"
    port: int = 8000
    reload: bool = True
    
    # CORS Configuration
    cors_origins: List[str] = [
        "http://localhost:3000",
        "https://yourdomain.vercel.app"
    ]
    
    # API Configuration
    api_title: str = "AgizaPro Campaign API"
    api_description: str = "API for managing campaign pages and merchant data"
    api_version: str = "1.0.0"
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()

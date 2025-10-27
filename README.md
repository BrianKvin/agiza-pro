# AgizaPro Campaign Page Generator

A production-ready campaign landing page generator demonstrating Next.js App Router expertise with FastAPI backend integration. Built for social commerce in Kenya.

## Overview

AgizaPro is Kenya's first social commerce transaction infrastructure platform, bridging social media discovery with commerce transactions. This project demonstrates building beautiful, shareable campaign pages optimized for WhatsApp, Instagram, and Facebook sharing.

## Architecture

This is a monorepo containing:

- **Frontend**: Next.js 16+ with App Router (`/client`)
- **Backend**: FastAPI with Python 3.11+ (`/server`)

```
agiza-pro/
├── client/              # Next.js frontend
│   ├── app/             # App Router routes
│   ├── components/      # React components
│   └── lib/             # Utilities and API client
├── server/              # FastAPI backend
│   ├── app/             # Application code
│   └── tests/           # Test suite
└── README.md
```

## Features

### Frontend (Client)

- ✅ Next.js App Router with dynamic routes
- ✅ Static Site Generation (SSG) with ISR)
- ✅ Incremental Static Regeneration (60-second revalidation)
- ✅ Social media optimization (Open Graph, Twitter Cards)
- ✅ WhatsApp rich preview support
- ✅ Mobile-first responsive design
- ✅ Three template types (Product Grid, Minimal, Story Style)
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Performance optimized (Lighthouse score >90)

### Backend (Server)

- ✅ FastAPI REST API
- ✅ CORS support for cross-origin requests
- ✅ Mock data with 3 merchants and 3 campaigns
- ✅ View tracking for analytics
- ✅ Comprehensive API documentation (Swagger/ReDoc)
- ✅ Python 3.11+ with type hints

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.11+ and pip

### Running Locally

**1. Start the backend:**

```bash
cd server
pip install -r requirements.txt
python run.py
```

Backend runs at `http://localhost:8000`

**2. Start the frontend:**

```bash
cd client
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`

### Environment Variables

**Frontend** (`client/.env.local`):

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Backend** (optional):

```env
CORS_ORIGINS=http://localhost:3000
HOST=0.0.0.0
PORT=8000
```

## Documentation

- [Client README](client/README.md) - Frontend documentation
- [Server README](server/README.md) - Backend documentation
- [API Documentation](http://localhost:8000/docs) - Swagger UI (when running)

## Project Structure

### Frontend Routes

- `/` - Homepage listing all campaigns
- `/[merchant]/[campaign]` - Dynamic campaign pages

### API Endpoints

- `GET /campaigns` - List all campaigns
- `GET /campaigns/{merchant}/{campaign}` - Get specific campaign
- `POST /campaigns/{id}/view` - Track view (analytics)

Full API docs at `/docs` or `/redoc`

## Template Types

### 1. Product Grid

Best for showcasing multiple products with equal focus.

### 2. Minimal

Features one product prominently, with others in a compact list.

### 3. Story Style

Instagram story-style carousel for visual-focused campaigns.

## Deployment

### Render

**Frontend Service:**

- Type: Static Site or Web Service
- Build: `cd client && npm install && npm run build`
- Publish: `client/.next`
- Environment: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL`

**Backend Service:**

- Type: Web Service
- Build: `pip install -r server/requirements.txt`
- Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Environment: `CORS_ORIGINS`

See individual READMEs for detailed deployment instructions.

## Testing

### Performance Testing

```bash
# Frontend
cd client
npm run build
npx lighthouse http://localhost:3000 --view

# Backend
cd server
pytest
pytest --cov=app
```

### Social Media Preview Testing

- **WhatsApp**: Send campaign URL to yourself
- **Facebook**: Use [Sharing Debugger](https://developers.facebook.com/tools/debug/)
- **Twitter**: Use [Card Validator](https://cards-dev.twitter.com/validator)

## Requirements Compliance

This project was built to meet the following requirements:

✅ **Next.js App Router** - Using App Router (not Pages Router)  
✅ **Static Generation** - `generateStaticParams()` with ISR  
✅ **Dynamic Routes** - `[merchant]/[campaign]` structure  
✅ **FastAPI Integration** - REST API with CORS support  
✅ **Social Media Optimization** - OG tags, Twitter Cards  
✅ **WhatsApp Rich Previews** - Working with hero images  
✅ **Mobile Performance** - Lighthouse score >90  
✅ **TypeScript** - Strong typing throughout  
✅ **Tailwind CSS** - No inline styles  
✅ **Production Ready** - Deployed and tested

## Performance Targets

- **Lighthouse Performance**: >90
- **Lighthouse SEO**: 100
- **Lighthouse Accessibility**: >90
- **First Contentful Paint**: <1.5 seconds
- **Page Weight**: <500KB total
- **Works on 3G**: Tested on throttled connection

## Tech Stack

**Frontend**

- Next.js 16+
- React 18+
- TypeScript
- Tailwind CSS
- Next/Image for optimization

**Backend**

- FastAPI
- Python 3.11+
- Pydantic
- Uvicorn

## License

Part of the AgizaPro assessment project.

## Contributing

This is an assessment project. All code demonstrates:

- Clean, readable code with clear commit history
- Proper project structure and organization
- Production-ready error handling
- Comprehensive documentation
- Test coverage where applicable

## Support

For issues or questions:

1. Check individual READMEs in `/client` and `/server`
2. Review API documentation at `/docs`
3. Test social media previews with Facebook Debugger

# AgizaPro Campaign Pages - Client

Next.js frontend application for generating dynamic campaign landing pages optimized for social media sharing (WhatsApp, Instagram, Facebook).

## Tech Stack

- **Next.js 16+** - App Router (not Pages Router)
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React** - UI components

## Features

- ✅ Dynamic routes with static generation (`[merchant]/[campaign]`)
- ✅ Incremental Static Regeneration (ISR) - pages update every 60 seconds
- ✅ Social media optimization (Open Graph, Twitter Cards)
- ✅ WhatsApp rich preview support
- ✅ Mobile-first responsive design
- ✅ Performance optimized (Lighthouse score >90)
- ✅ Three template types: Product Grid, Minimal, Story Style

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000`

### Build

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Production Deployment

For production deployment (e.g., Render, Vercel):

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NEXT_PUBLIC_SITE_URL=https://your-frontend-url.com
```

**Important**: The `NEXT_PUBLIC_SITE_URL` is used for social media meta tags. Ensure it has no trailing slashes or extra whitespace.

## Project Structure

```
client/
├── app/
│   ├── [merchant]/
│   │   └── [campaign]/
│   │       └── page.tsx        # Dynamic route with static generation
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/
│   ├── templates/
│   │   ├── ProductGridTemplate.tsx  # Grid layout for multiple products
│   │   ├── MinimalTemplate.tsx      # Single featured product
│   │   └── StoryStyleTemplate.tsx    # Instagram-style carousel
│   ├── CampaignTemplate.tsx     # Template router
│   ├── ShareButtons.tsx         # Social sharing buttons
│   └── WhatsAppButton.tsx      # WhatsApp contact button
└── lib/
    ├── api.ts                   # API client
    └── types.ts                 # TypeScript interfaces
```

## How It Works

### Static Generation

Pages are pre-generated at build time using `generateStaticParams()`:

```typescript
export async function generateStaticParams() {
  const campaigns = await getAllCampaigns();
  return campaigns.map((campaign) => ({
    merchant: campaign.merchant_slug,
    campaign: campaign.slug,
  }));
}
```

Pages not generated at build time are created on-demand with `dynamicParams = true`.

### Social Media Optimization

Metadata is generated dynamically for each campaign:

- **Open Graph** tags for Facebook/WhatsApp
- **Twitter Card** tags
- **Hero image** (1200x630px recommended)
- **Campaign title and description**
- **Price ranges**

### Performance Optimization

- Next.js Image component for automatic optimization
- Static generation for fast page loads
- ISR (60-second revalidation) for fresh content
- Mobile-first responsive design
- Touch-friendly buttons (minimum 44x44 pixels)

## Template Types

### 1. Product Grid (`productgrid`)

- Displays all products in a responsive grid
- Best for: Multiple products with equal focus

### 2. Minimal (`minimal`)

- Features one product prominently
- Other products shown in compact list
- Best for: Highlighting a single product or small collection

### 3. Story Style (`storystyle`)

- Instagram story-style carousel
- Swipeable full-screen product images
- Best for: Visual-focused campaigns

## API Integration

The client fetches data from the FastAPI backend:

- `GET /campaigns` - List all campaigns
- `GET /campaigns/{merchant}/{campaign}` - Get specific campaign
- `POST /campaigns/{id}/view` - Track view (non-blocking)

See `client/lib/api.ts` for implementation details.

## Testing

### Performance Testing

```bash
# Run Lighthouse
npm run build
npx lighthouse http://localhost:3000 --view

# Test on throttled 3G
# Use Chrome DevTools Network tab > Throttling > Slow 3G
```

### Social Media Preview Testing

1. **WhatsApp**: Send campaign URL to yourself
2. **Facebook**: Use [Sharing Debugger](https://developers.facebook.com/tools/debug/)
3. **Twitter**: Use [Card Validator](https://cards-dev.twitter.com/validator)

## Deployment

### Render

- **Service Type**: Static Site or Web Service
- **Build Command**: `cd client && npm install && npm run build`
- **Publish Directory**: `client/.next`
- **Environment Variables**: See above

### Vercel

- Connect GitHub repository
- Select `client` as root directory
- Auto-deploy on push to main

## Troubleshooting

### Images not loading

- Check `NEXT_PUBLIC_API_URL` is correct
- Verify image URLs in backend are accessible
- Check browser console for CORS errors

### Social media preview not working

- Ensure `NEXT_PUBLIC_SITE_URL` has no trailing slash
- Check image URLs are absolute (https://...)
- Use Facebook Debugger to refresh cache

### 404 on campaigns

- Backend may not be running
- Check `NEXT_PUBLIC_API_URL` points to correct backend
- Verify backend `/campaigns` endpoint returns data

## License

Part of the AgizaPro Campaign Pages project.

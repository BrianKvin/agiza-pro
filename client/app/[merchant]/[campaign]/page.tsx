import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCampaignBySlug, getAllCampaigns, getPriceRange, trackCampaignView } from '@/lib/api';
import CampaignTemplate from '@/components/CampaignTemplate';

// Generate static params for all campaigns at build time
export async function generateStaticParams() {
  try {
    const campaigns = await getAllCampaigns();
    
    return campaigns.map((campaign) => ({
      merchant: campaign.merchant_slug,
      campaign: campaign.slug,
    }));
  } catch (error) {
    // If backend is not available during build, return empty array
    // Pages will be generated on-demand
    console.warn('Could not fetch campaigns during build:', error);
    return [];
  }
}

// Generate metadata for each campaign (critical for WhatsApp previews)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ merchant: string; campaign: string }>;
}): Promise<Metadata> {
  const { merchant, campaign } = await params;
  const campaignData = await getCampaignBySlug(merchant, campaign);

  if (!campaignData) {
    return {
      title: 'Campaign Not Found',
    };
  }

  const priceRange = getPriceRange(campaignData);
  const title = campaignData.title;
  const description = campaignData.description;
  const heroImage = campaignData.hero_image || '';
  // Trim any whitespace/newlines from environment variable
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.vercel.app').trim();
  const url = `${siteUrl}/${merchant}/${campaign}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: heroImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      url,
      type: 'website',
      siteName: 'AgizaPro',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [heroImage],
    },
    // WhatsApp/Social Media meta tags
    other: {
      'og:image': heroImage,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': title,
      ...(priceRange && { 'product:price:amount': priceRange }),
    },
  };
}

// Revalidate pages every 60 seconds to pick up data changes
export const revalidate = 60;

// During build, handle cases where backend might not be available
export const dynamicParams = true;

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ merchant: string; campaign: string }>;
}) {
  const { merchant, campaign } = await params;
  const campaignData = await getCampaignBySlug(merchant, campaign);

  if (!campaignData) {
    notFound();
  }

  // Track view in background (non-blocking)
  trackCampaignView(campaignData.id);

  return <CampaignTemplate campaign={campaignData} />;
}




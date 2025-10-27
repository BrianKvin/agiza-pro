import { Campaign, CampaignResponse, CampaignsListResponse } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'APIError';
  }
}

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new APIError(response.status, `API Error: ${response.statusText}`);
  }

  return response.json();
}

export async function getAllCampaigns(): Promise<Campaign[]> {
  const data = await fetchAPI<CampaignsListResponse>('/campaigns');
  return data.data;
}

export async function getCampaignBySlug(
  merchantSlug: string,
  campaignSlug: string
): Promise<Campaign | null> {
  try {
    const data = await fetchAPI<CampaignResponse>(
      `/campaigns/${merchantSlug}/${campaignSlug}`
    );
    return data.data;
  } catch (error) {
    if (error instanceof APIError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function trackCampaignView(campaignId: string): Promise<void> {
  try {
    await fetch(`${API_BASE_URL}/campaigns/${campaignId}/view`, {
      method: 'POST',
    });
  } catch (error) {
    console.error('Failed to track view:', error);
  }
}

export function getPriceRange(campaign: Campaign): string {
  const prices = campaign.products
    .map((p) => p.price || p.campaign_price || 0)
    .filter((p) => p > 0);

  if (prices.length === 0) return '';

  const min = Math.min(...prices);
  const max = Math.max(...prices);

  if (min === max) {
    return `KES ${min}`;
  }

  return `From KES ${min}`;
}




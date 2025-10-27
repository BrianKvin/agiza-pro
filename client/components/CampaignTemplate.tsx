import { Campaign } from '@/lib/types';
import ProductGridTemplate from './templates/ProductGridTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import StoryStyleTemplate from './templates/StoryStyleTemplate';

interface CampaignTemplateProps {
  campaign: Campaign;
}

export default function CampaignTemplate({ campaign }: CampaignTemplateProps) {
  // Switch based on template_type
  const template = campaign.template_type?.toLowerCase() || 'productgrid';

  switch (template) {
    case 'minimal':
      return <MinimalTemplate campaign={campaign} />;
    
    case 'storystyle':
      return <StoryStyleTemplate campaign={campaign} />;
    
    case 'productgrid':
    default:
      return <ProductGridTemplate campaign={campaign} />;
  }
}



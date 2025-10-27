import Link from 'next/link';

export default function Home() {
  // You can add a list of featured campaigns here
  const featuredCampaigns = [
    { merchant: 'techstore-pro', campaign: 'tech-black-friday-sale' },
    { merchant: 'fashion-forward', campaign: 'summer-fashion-collection' },
    { merchant: 'home-garden', campaign: 'home-makeover-special' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            AgizaPro
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Social Commerce Campaign Pages
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Discover amazing campaigns from Kenyan merchants. Shop directly from
            social media with seamless transactions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featuredCampaigns.map((item) => (
            <Link
              key={`${item.merchant}-${item.campaign}`}
              href={`/${item.merchant}/${item.campaign}`}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6"
            >
              <h3 className="text-xl font-semibold mb-2 capitalize">
                {item.campaign.replace(/-/g, ' ')}
              </h3>
              <p className="text-gray-600 capitalize">{item.merchant.replace(/-/g, ' ')}</p>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">Sample Campaign URLs:</p>
          <div className="space-y-2 text-sm text-gray-600 font-mono">
            <div>/techstore-pro/tech-black-friday-sale</div>
            <div>/fashion-forward/summer-fashion-collection</div>
            <div>/home-garden/home-makeover-special</div>
          </div>
        </div>
      </div>
    </div>
  );
}

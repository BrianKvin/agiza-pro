import Link from 'next/link';

export default function Home() {
  const featuredCampaigns = [
    { 
      merchant: 'techstore-pro', 
      campaign: 'tech-black-friday-sale',
      merchantName: 'TechStore Pro',
      campaignName: 'Tech Black Friday Sale'
    },
    { 
      merchant: 'fashion-forward', 
      campaign: 'summer-fashion-collection',
      merchantName: 'Fashion Forward',
      campaignName: 'Summer Fashion Collection'
    },
    { 
      merchant: 'home-garden', 
      campaign: 'home-makeover-special',
      merchantName: 'Home & Garden',
      campaignName: 'Home Makeover Special'
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="w-full">
        {/* Top bar with Sign In and Register buttons */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-2 max-w-6xl flex justify-end gap-2">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 text-sm font-medium rounded transition-colors">
              Sign In
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1 text-sm font-medium rounded transition-colors">
              Register
            </button>
          </div>
        </div>

        {/* Logo */}
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <h1 className="text-4xl font-bold text-orange-600">Agiza Pro</h1>
        </div>

        {/* Navigation bar */}
        <nav>
          <div className="container mx-auto max-w-6xl">
            <div className="bg-green-700 mx-4">
              <ul className="flex items-center gap-6 py-3 px-4">
                <li>
                  <Link href="/" className="text-white hover:text-green-200 transition-colors flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-white hover:text-green-200 transition-colors">How It Works</Link>
                </li>
                <li>
                  <Link href="/" className="text-white hover:text-green-200 transition-colors bg-green-800 px-2 py-1 rounded">Get Started</Link>
                </li>
                <li>
                  <Link href="/" className="text-white hover:text-green-200 transition-colors">About Us</Link>
                </li>
                <li>
                  <Link href="/" className="text-white hover:text-green-200 transition-colors">FAQ</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Get started!</h2>
            <p className="text-gray-700 mb-3">
              We build long lasting relationship with our merchants and want to ensure all our campaigns reach their target audience effectively. As we expand our platform, we continue to provide seamless social commerce solutions for Kenyan businesses.
            </p>
            <p className="text-gray-700">
              If you wish to create a campaign with Agiza Pro, follow <Link href="/" className="text-blue-600 hover:underline">THIS LINK</Link> and fill in the form. Once we review your application, you will receive an email to proceed with campaign creation. Start engaging with your customers through social media today.
            </p>
          </div>

          {/* Campaign Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {featuredCampaigns.map((item) => (
              <Link
                key={`${item.merchant}-${item.campaign}`}
                href={`/${item.merchant}/${item.campaign}`}
                className="bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {item.campaignName}
                </h3>
                <p className="text-gray-600 font-medium">{item.merchantName}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-300 mt-12">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              © 2025 Agiza Pro. Use of this Web site constitutes acceptance of Agiza Pro <Link href="/" className="text-blue-600 hover:underline">Terms and conditions</Link>.
            </p>
            <p>
              No legal relationship is defined between the two parties by using the terms "Merchant" and "Platform".
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

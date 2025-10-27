import { Campaign } from '@/lib/types';
import Image from 'next/image';
import ShareButtons from '../ShareButtons';
import WhatsAppButton from '../WhatsAppButton';

interface MinimalTemplateProps {
  campaign: Campaign;
}

export default function MinimalTemplate({ campaign }: MinimalTemplateProps) {
  const { merchant, products, primary_color, background_color, text_color } = campaign;
  const featuredProduct = products[0];
  
  return (
    <div 
      className="min-h-screen" 
      style={{ 
        backgroundColor: background_color || '#ffffff',
        color: text_color || '#000000'
      }}
    >
      {/* Minimal Hero */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">{campaign.title}</h1>
        <p className="text-xl text-center mb-12 opacity-80">{campaign.description}</p>

        {/* Featured Product */}
        {featuredProduct && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="md:flex">
              {/* Product Image */}
              <div className="relative w-full md:w-1/2 aspect-square">
                {(featuredProduct.image || featuredProduct.image_url) && (
                  <Image
                    src={featuredProduct.image || featuredProduct.image_url || ''}
                    alt={featuredProduct.name}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>
              
              {/* Product Info */}
              <div className="p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">{featuredProduct.name}</h2>
                <p className="text-gray-600 mb-6">{featuredProduct.description}</p>
                <div className="flex items-center gap-3 mb-4">
                  <span 
                    className="text-4xl font-bold"
                    style={{ color: primary_color || '#000' }}
                  >
                    KES {featuredProduct.price}
                  </span>
                  {featuredProduct.original_price && featuredProduct.original_price > featuredProduct.price && (
                    <span className="text-lg text-gray-500 line-through">
                      KES {featuredProduct.original_price}
                    </span>
                  )}
                </div>
                {featuredProduct.stock !== null && featuredProduct.stock !== undefined && (
                  <p className="text-sm text-gray-500 mb-6">
                    {featuredProduct.stock > 0 ? `${featuredProduct.stock} available` : 'Out of stock'}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* All Products - Compact List */}
        {products.length > 1 && (
          <div className="space-y-4 mb-8">
            <h3 className="text-2xl font-semibold mb-4">All Products</h3>
            {products.slice(1).map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex gap-4">
                {(product.image || product.image_url) && (
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={product.image || product.image_url || ''}
                      alt={product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="font-semibold">{product.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  <span className="text-xl font-bold" style={{ color: primary_color || '#000' }}>
                    KES {product.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Merchant Info */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {merchant.logo_url && (
            <Image
              src={merchant.logo_url}
              alt={merchant.name}
              width={50}
              height={50}
              className="rounded-full"
            />
          )}
          <div className="text-center">
            <h3 className="font-semibold">{merchant.name}</h3>
            {merchant.location && (
              <p className="text-sm opacity-70">{merchant.location}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <WhatsAppButton merchant={merchant} campaign={campaign} />
          <ShareButtons merchant={campaign.merchant_slug} campaign={campaign.slug} />
        </div>
      </div>
    </div>
  );
}


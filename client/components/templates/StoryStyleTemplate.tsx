'use client';

import { Campaign } from '@/lib/types';
import Image from 'next/image';
import { useState } from 'react';
import ShareButtons from '../ShareButtons';
import WhatsAppButton from '../WhatsAppButton';

interface StoryStyleTemplateProps {
  campaign: Campaign;
}

export default function StoryStyleTemplate({ campaign }: StoryStyleTemplateProps) {
  const { merchant, products, primary_color, background_color } = campaign;
  const [selectedProduct, setSelectedProduct] = useState(0);
  
  return (
    <div 
      className="min-h-screen" 
      style={{ 
        backgroundColor: background_color || '#ffffff'
      }}
    >
      {/* Story-Style Product Swiper */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="flex-shrink-0 w-full snap-center"
            >
              <div className="relative w-full h-[80vh]">
                {(product.image || product.image_url) && (
                  <Image
                    src={product.image || product.image_url || ''}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6 text-white">
                  <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
                  <p className="text-lg mb-3">{product.description}</p>
                  <div className="flex items-center gap-3">
                    <span 
                      className="text-4xl font-bold"
                      style={{ color: primary_color || '#fff' }}
                    >
                      KES {product.price}
                    </span>
                    {product.original_price && product.original_price > product.price && (
                      <span className="text-xl line-through opacity-70">
                        KES {product.original_price}
                      </span>
                    )}
                  </div>
                  {product.discount_percentage && (
                    <span className="inline-block mt-2 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded">
                      {product.discount_percentage}% OFF
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Product Indicators */}
        <div className="flex justify-center gap-2 p-4">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedProduct(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                selectedProduct === index 
                  ? 'w-8' 
                  : 'bg-gray-300'
              }`}
              style={{
                backgroundColor: selectedProduct === index ? primary_color || '#000' : '#d1d5db'
              }}
            />
          ))}
        </div>
      </div>

      {/* Campaign Info */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-4xl font-bold mb-4 text-center">{campaign.title}</h1>
        <p className="text-xl text-center mb-8 opacity-80">{campaign.description}</p>

        {/* Merchant Info */}
        <div className="flex items-center justify-center gap-4 mb-8 pb-8 border-b">
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


'use client'

import { Campaign, Product } from '@/lib/types';
import Image from 'next/image';
import ShareButtons from '../ShareButtons';
import WhatsAppButton from '../WhatsAppButton';

interface ProductGridTemplateProps {
  campaign: Campaign;
}

export default function ProductGridTemplate({ campaign }: ProductGridTemplateProps) {
  const { merchant, products, primary_color, background_color, text_color } = campaign;
  
  return (
    <div 
      className="min-h-screen" 
      style={{ 
        backgroundColor: background_color || '#ffffff',
        color: text_color || '#000000'
      }}
    >
      {/* Hero Section */}
      <div className="relative w-full h-64 md:h-96">
        {campaign.hero_image && (
          <Image
            src={campaign.hero_image}
            alt={campaign.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold">{campaign.title}</h1>
            <p className="text-lg mt-2">{campaign.description}</p>
          </div>
        </div>
      </div>

      {/* Merchant Info */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          {merchant.logo_url && (
            <Image
              src={merchant.logo_url}
              alt={merchant.name}
              width={60}
              height={60}
              className="rounded-full"
            />
          )}
          <div>
            <h2 className="text-xl font-semibold">{merchant.name}</h2>
            {merchant.location && (
              <p className="text-sm opacity-70">{merchant.location}</p>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} primaryColor={primary_color} />
          ))}
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

function ProductCard({ product, primaryColor }: { product: Product; primaryColor?: string | null }) {
  const hasDiscount = product.original_price && product.original_price > product.price;
  const discountPercent = hasDiscount && product.discount_percentage;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-100">
        {(product.image || product.image_url) && (
          <Image
            src={product.image || product.image_url || ''}
            alt={product.name}
            fill
            className="object-cover"
          />
        )}
        {discountPercent && (
          <div 
            className="absolute top-2 right-2 px-2 py-1 text-white text-sm font-bold rounded"
            style={{ backgroundColor: primaryColor || '#ef4444' }}
          >
            -{discountPercent}%
          </div>
        )}
        {product.stock !== null && product.stock !== undefined && product.stock < 5 && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
            Low Stock
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        
        {/* Pricing */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl font-bold" style={{ color: primaryColor || '#000' }}>
            KES {product.price}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              KES {product.original_price}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {product.stock !== null && product.stock !== undefined && (
          <p className="text-xs text-gray-500">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
        )}
      </div>
    </div>
  );
}


'use client';

import { useState } from 'react';
import Image from 'next/image';
import ShareButtons from '@/components/ShareButtons';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Campaign } from '@/lib/types';

interface StoryPageProps {
  campaign: Campaign;
}

export default function StoryPage({ campaign }: StoryPageProps) {
  const { merchant, products, primary_color, background_color, text_color } = campaign;
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600">No products available</p>
      </div>
    );
  }

  const currentProduct = products[currentIndex];
  const hasImage = currentProduct?.image || currentProduct?.image_url;

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: background_color || '#ffffff' }}>
      {/* Main Image Carousel */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '70vh',
          minHeight: '500px',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Current Product Image */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          {hasImage ? (
            <Image
              src={currentProduct.image || currentProduct.image_url || ''}
              alt={currentProduct.name}
              fill
              className="object-cover"
              sizes="100vw"
              priority
              unoptimized
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#e0e0e0',
              }}
            >
              <p style={{ fontSize: '24px', color: '#666' }}>{currentProduct.name}</p>
            </div>
          )}

          {/* Product Info Overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              color: 'white',
              padding: '24px',
            }}
          >
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
              {currentProduct.name}
            </h2>
            <p style={{ fontSize: '16px', margin: '0 0 12px 0', opacity: 0.9 }}>
              {currentProduct.description}
            </p>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: primary_color || '#fff' }}>
                KES {currentProduct.price}
              </span>
              {currentProduct.original_price && currentProduct.original_price > currentProduct.price && (
                <span style={{ fontSize: '16px', textDecoration: 'line-through', opacity: 0.7 }}>
                  KES {currentProduct.original_price}
                </span>
              )}
            </div>
            {currentProduct.discount_percentage && (
              <div style={{ marginTop: '8px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#f44336',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }}
                >
                  {currentProduct.discount_percentage}% OFF
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        {products.length > 1 && (
          <>
            <button
              onClick={prevProduct}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                fontSize: '24px',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              ◀
            </button>
            <button
              onClick={nextProduct}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                fontSize: '24px',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              ▶
            </button>
          </>
        )}
      </div>

      {/* Indicators/Dots */}
      {products.length > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            padding: '16px',
            backgroundColor: 'white',
          }}
        >
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              style={{
                width: currentIndex === i ? '32px' : '12px',
                height: '12px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: currentIndex === i ? primary_color || '#2563eb' : '#d1d5db',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      )}

      {/* Campaign Info Section */}
      <div
        style={{
          textAlign: 'center',
          padding: '48px 24px',
          color: text_color || '#000000',
        }}
      >
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 16px 0' }}>
          {campaign.title}
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.85, margin: '0 0 32px 0' }}>
          {campaign.description}
        </p>

        {/* Merchant Info */}
        <div style={{ marginBottom: '32px', borderBottom: '1px solid #e5e5e5', paddingBottom: '24px' }}>
          {merchant.logo_url && (
            <div style={{ marginBottom: '12px' }}>
              <Image
                src={merchant.logo_url}
                alt={merchant.name}
                width={60}
                height={60}
                className="rounded-full mx-auto"
                unoptimized
              />
            </div>
          )}
          <h3 style={{ fontWeight: 'bold', margin: '0 0 4px 0' }}>{merchant.name}</h3>
          {merchant.location && (
            <p style={{ fontSize: '14px', opacity: 0.7, margin: 0 }}>{merchant.location}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <WhatsAppButton merchant={merchant} campaign={campaign} />
          <ShareButtons merchant={campaign.merchant_slug} campaign={campaign.slug} />
        </div>
      </div>
    </div>
  );
}

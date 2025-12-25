import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import productsData from '@/data/mock-products.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://meshur.co';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = routing.locales.flatMap(
    (locale) => [
      {
        url: `${baseUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/${locale}/best-sellers`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/${locale}/new-arrivals`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
    ]
  );

  // Product pages
  const productPages: MetadataRoute.Sitemap = routing.locales.flatMap(
    (locale) =>
      productsData.products.map((product) => ({
        url: `${baseUrl}/${locale}/products/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      }))
  );

  return [...staticPages, ...productPages];
}


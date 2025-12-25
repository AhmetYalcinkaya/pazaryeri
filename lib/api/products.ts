import { Product, ProductListResponse, ProductBadge } from '@/types/product';
import productsData from '@/data/mock-products.json';

// Type guard for ProductBadge
function isValidBadge(badge: string): badge is ProductBadge {
  return [
    'bestSeller',
    'newProduct',
    'vegan',
    'alcoholFree',
    'perfumeFree',
    'hairGrowth',
    'sale',
  ].includes(badge);
}

// Transform JSON data to Product type
function transformProduct(product: any): Product {
  return {
    ...product,
    badges: product.badges
      ? product.badges.filter(isValidBadge)
      : undefined,
  };
}

export async function getProducts(
  page: number = 1,
  limit: number = 20,
  category?: string,
  search?: string
): Promise<ProductListResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  let filteredProducts = productsData.products.map(transformProduct);

  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.categorySlug === category
    );
  }

  // Filter by search
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
    );
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedProducts = filteredProducts.slice(start, end);

  return {
    products: paginatedProducts,
    total: filteredProducts.length,
    page,
    limit,
    hasMore: end < filteredProducts.length,
  };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const product = productsData.products.find((p) => p.slug === slug);
  return product ? transformProduct(product) : null;
}

export async function getProductById(id: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const product = productsData.products.find((p) => p.id === id);
  return product ? transformProduct(product) : null;
}

export async function getBestSellers(limit: number = 10): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  return productsData.products
    .map(transformProduct)
    .filter((p) => p.badges?.includes('bestSeller'))
    .slice(0, limit);
}


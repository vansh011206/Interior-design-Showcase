import ProductDetailClient from "./ProductDetailClient";
import { products } from "@/lib/products";

// Static Site Generation params definition
export function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found | DAROS" };

  return {
    title: `${product.name} | DAROS Boutique`,
    description: product.description,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}

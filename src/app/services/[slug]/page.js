import ServiceDetailClient from "./ServiceDetailClient";

// Static Site Generation params definition
export function generateStaticParams() {
  return [
    { slug: "minimalist-bathrooms" },
    { slug: "bespoke-seating" },
    { slug: "lighting-solutions" },
    { slug: "sophisticated-bedrooms" },
  ];
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <ServiceDetailClient slug={slug} />;
}

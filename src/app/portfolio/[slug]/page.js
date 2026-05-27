import PortfolioDetailClient from "./PortfolioDetailClient";

// Static Site Generation params definition
export function generateStaticParams() {
  return [
    { slug: "arched-serenity-lounge" },
    { slug: "shadow-cast-dining-hall" },
    { slug: "luminous-reading-salon" },
    { slug: "nordic-forest-bedroom" },
  ];
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <PortfolioDetailClient slug={slug} />;
}

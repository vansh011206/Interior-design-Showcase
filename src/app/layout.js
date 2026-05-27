import { Libre_Caslon_Text, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const libreCaslonText = Libre_Caslon_Text({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "DAROS | Architectural Serenity & Premium Interior Design",
  description: "Exquisite interior spaces custom-designed with modern aesthetics and architectural clarity. Discover our curated portfolios, luminous lighting designs, and bespoke styling services.",
  keywords: "interior design, architectural serenity, premium lighting, minimalist furniture, luxury space planning, boutique home styling",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${libreCaslonText.variable} ${hankenGrotesk.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

const HERO_QUERIES = {
  "minimalist-bathrooms": "minimalist stone bathroom luxury",
  "bespoke-seating": "luxury bespoke sofa living room",
  "lighting-solutions": "architectural cove lighting interior",
  "sophisticated-bedrooms": "luxury platform bedroom forest view",
};

const GALLERY_QUERIES = {
  "minimalist-bathrooms": "marble bathroom interior design",
  "bespoke-seating": "bespoke furniture living room",
  "lighting-solutions": "modern pendant light interior",
  "sophisticated-bedrooms": "minimal bedroom interior wood",
};

export default function ServiceDetailClient({ slug }) {
  const [heroImage, setHeroImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [heroLoading, setHeroLoading] = useState(true);
  const [galleryLoading, setGalleryLoading] = useState(true);

  useEffect(() => {
    async function fetchHero() {
      try {
        const res = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(HERO_QUERIES[slug] || "luxury interior")}&per_page=1&orientation=landscape`,
          { headers: { Authorization: PEXELS_API_KEY } }
        );
        const data = await res.json();
        if (data.photos && data.photos.length > 0) {
          setHeroImage(data.photos[0].src.large2x);
        }
      } catch (err) {
        console.error("Pexels hero fetch error:", err);
      } finally {
        setHeroLoading(false);
      }
    }

    async function fetchGallery() {
      try {
        const res = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(GALLERY_QUERIES[slug] || "interior design")}&per_page=3&orientation=landscape`,
          { headers: { Authorization: PEXELS_API_KEY } }
        );
        const data = await res.json();
        if (data.photos && data.photos.length > 0) {
          setGalleryImages(data.photos.map(p => p.src.large2x));
        }
      } catch (err) {
        console.error("Pexels gallery fetch error:", err);
      } finally {
        setGalleryLoading(false);
      }
    }

    fetchHero();
    fetchGallery();
  }, [slug]);

  const servicesData = {
    "minimalist-bathrooms": {
      name: "Minimalist Bathrooms",
      boldTitle: "Minimalist",
      italicTitle: "Bathrooms",
      category: "WELLNESS SANCTUARIES",
      subtext: "Where stillness meets stone",
      pullQuote: "A bathroom is not a utility — it is a private ritual space.",
      paragraphs: [
        "We conceive the modern bath as a temple of quiet reflection. By stripping away extraneous ornament, we direct the focus onto the natural flow of light and raw water, turning a functional daily routine into a slow, meaningful ritual.",
        "Our material palette is anchored in raw travertine, hand-polished limestone, and select marbles sourced from historic quarries. Tactile brushed metal finishes and concealed architectural drainage ensure the surfaces remain uninterrupted.",
        "The result is a sensory sanctuary that balances acoustic stillness with thermal comfort, offering an intimate retreat within the modern home where the body and mind find complete alignment."
      ],
      steps: [
        { name: "Discovery", desc: "We study site coordinates, daylight patterns, and outline space constraints." },
        { name: "Concept", desc: "We select premium marble slabs and raw travertine samples to define the texturing." },
        { name: "Execution", desc: "Our craftspeople execute concealed plumbing integrations and precise slab alignments." },
        { name: "Handover", desc: "We calibrate indirect light levels and hand over a tranquil sanctuary ready for use." }
      ],
    },
    "bespoke-seating": {
      name: "Bespoke Seating",
      boldTitle: "Bespoke",
      italicTitle: "Seating",
      category: "FURNITURE ARCHITECTURE",
      subtext: "Crafted for the body, designed for the eye",
      pullQuote: "Every chair holds a conversation between maker and material.",
      paragraphs: [
        "A seat is not merely a place to rest—it is a sculptured architectural statement. We design chairs and sofas that balance ergonomic contours with clean lines, creating objects that command presence yet blend seamlessly into the room.",
        "We utilize raw solid oak, walnut, and hand-woven bouclé textiles of the highest grade. Every frame is built using traditional mortise-and-tenon joinery, ensuring longevity and honoring the integrity of honest, premium craftsmanship.",
        "The outcome is a collection of functional sculptures that respond to the body's natural posture while enriching the room's visual rhythm, becoming heirlooms that endure across generations."
      ],
      steps: [
        { name: "Discovery", desc: "We perform a thorough ergonomic study, mapping seating heights and back support angles." },
        { name: "Concept", desc: "We source custom-grade texturized textiles, wool blends, and raw linens for comfort." },
        { name: "Execution", desc: "Artisans build and sculpt solid oak frames using traditional joinery methods." },
        { name: "Handover", desc: "We arrange seating layouts to optimize ambient lighting, views, and conversation flow." }
      ],
    },
    "lighting-solutions": {
      name: "Lighting Solutions",
      boldTitle: "Lighting",
      italicTitle: "Solutions",
      category: "AMBIENT LUMINESCENCE",
      subtext: "Light is the invisible architecture",
      pullQuote: "We don't install lights. We choreograph how darkness retreats.",
      paragraphs: [
        "Light shapes our emotional reality. We approach lighting design as the manipulation of shadows and brightness, choreographing how space unfolds throughout the day to evoke serenity, intimacy, and warmth.",
        "Using recessed plaster-in coves, custom-machined solid brass fittings, and high-CRI LED modules, we construct a layered system. Integrated smart dimmers allow seamless transitions between preset atmospheric settings.",
        "The resulting lightscape accentuates textured surfaces, guides the eye to architectural features, and guarantees that the home transitions beautifully from day to evening."
      ],
      steps: [
        { name: "Discovery", desc: "We evaluate space volumes, room functions, and daylight entry points." },
        { name: "Concept", desc: "We design lighting pathways, curating architectural fixtures and brass pendants." },
        { name: "Execution", desc: "Our electricians wire state-of-the-art smart dimming systems and control panels." },
        { name: "Handover", desc: "We program custom-tailored preset lighting maps for daytime, dining, and nighttime." }
      ],
    },
    "sophisticated-bedrooms": {
      name: "Sophisticated Bedrooms",
      boldTitle: "Sophisticated",
      italicTitle: "Bedrooms",
      category: "RESTFUL HABITATS",
      subtext: "Designed for rest. Built for dreams.",
      pullQuote: "The bedroom is the last honest room in a home.",
      paragraphs: [
        "The bedroom is a private sanctuary meant for complete decompression. We focus on clean sightlines, soft spatial thresholds, and the removal of digital noise to create an environment dedicated to restful recovery.",
        "Low-slung wooden platforms are paired with layers of organic Belgian flax linens, raw wool, and acoustic wall paneling. Every textile is selected for its tactile feedback and breathability.",
        "This produces a quiet haven where acoustics, touch, and lighting align to lower sensory stress, facilitating deep sleep and peaceful waking hours."
      ],
      steps: [
        { name: "Discovery", desc: "We study sleep habits, noise thresholds, and ventilation angles." },
        { name: "Concept", desc: "We select organic flax textiles, acoustics layers, and low bed platform styles." },
        { name: "Execution", desc: "We build acoustic drywall panelings and assemble custom solid-wood bed frames." },
        { name: "Handover", desc: "We set up discrete circadian reading zones and deliver the complete sleeping space." }
      ],
    }
  };

  const service = servicesData[slug];

  if (!service) {
    return (
      <div style={{ padding: "10rem 0", textAlign: "center", backgroundColor: "#F5F0E8", color: "#1A1A1A" }}>
        <h1 className="font-serif">Service Not Found</h1>
        <Link href="/" style={{ textDecoration: "underline", marginTop: "2rem", display: "inline-block" }}>
          Return to Home
        </Link>
      </div>
    );
  }

  const handleNavClick = (sectionId) => {
    window.location.href = `/#${sectionId}`;
  };

  return (
    <div style={{ backgroundColor: "#F5F0E8", minHeight: "100vh", position: "relative" }}>
      {/* Navbar */}
      <Header activeSection="" onNavClick={handleNavClick} />

      {/* Main Content Area */}
      <main style={{ paddingTop: "var(--header-height, 80px)" }}>
        {/* Back Link Overlay over Hero */}
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: "40px", left: "5%", zIndex: 50 }}>
            <Link
              href="/#categories"
              className="back-link"
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontSize: "11px",
                letterSpacing: "0.15em",
                color: "#9A8F82",
                textTransform: "uppercase",
                fontWeight: "600",
                transition: "color 0.25s ease",
              }}
            >
              ← Back to Services
            </Link>
          </div>

          {/* 1. Hero Block */}
          <div
            style={{
              position: "relative",
              minHeight: "70vh",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: heroImage ? `url(${heroImage}) no-repeat center/cover` : "#2A2420",
            }}
          >
            {/* Loading skeleton for hero */}
            {heroLoading && (
              <div className="pexels-skeleton" style={{ position: "absolute", inset: 0, zIndex: 0 }} />
            )}

            {/* Background Overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(20, 16, 12, 0.35)",
                backdropFilter: "brightness(0.75)",
                zIndex: 1,
              }}
            />

            {/* Content Card */}
            <div
              className="container"
              style={{
                position: "relative",
                zIndex: 10,
                textAlign: "center",
                color: "#F5F0E8",
                padding: "0 1rem",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.25em",
                  color: "#C8BFB0",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "1.2rem",
                  fontWeight: "600",
                }}
              >
                {service.category}
              </span>
              
              <h1
                style={{
                  fontSize: "58px",
                  fontFamily: "var(--font-serif)",
                  lineHeight: "1.2",
                  marginBottom: "1.5rem",
                  fontWeight: "bold",
                }}
                className="service-hero-title"
              >
                {service.boldTitle}{" "}
                <span style={{ fontStyle: "italic", fontWeight: "normal" }}>
                  {service.italicTitle}
                </span>
              </h1>

              <div
                style={{
                  height: "1px",
                  backgroundColor: "#C8BFB0",
                  width: "60px",
                  margin: "0 auto 1.5rem auto",
                }}
              />

              <p
                style={{
                  fontSize: "14px",
                  color: "#C8BFB0",
                  fontStyle: "italic",
                  margin: 0,
                }}
              >
                {service.subtext}
              </p>
            </div>
          </div>
        </div>

        {/* 2. Overview Section */}
        <section style={{ backgroundColor: "#F5F0E8" }}>
          <div className="container">
            <div className="overview-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr", gap: "6rem", padding: "100px 0" }}>
              {/* Left Quote */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              >
                <blockquote
                  style={{
                    fontSize: "28px",
                    fontFamily: "var(--font-serif)",
                    fontWeight: "400",
                    color: "#1A1A1A",
                    lineHeight: "1.45",
                    margin: 0,
                    maxWidth: "420px",
                  }}
                  className="pull-quote"
                >
                  &ldquo;{service.pullQuote}&rdquo;
                </blockquote>
              </motion.div>

              {/* Right Description */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.15 }}
                style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}
              >
                {service.paragraphs.map((p, idx) => (
                  <p key={idx} style={{ fontSize: "13px", lineHeight: "1.9", color: "#6B6560", margin: 0 }}>
                    {p}
                  </p>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. Process Steps */}
        <section style={{ backgroundColor: "#EFEADF", padding: "7rem 0" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "0.25em",
                color: "#8C857E",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "4rem",
                fontWeight: "600",
              }}
            >
              OUR PROCESS
            </span>

            <div
              className="process-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr auto 1fr auto 1fr",
                alignItems: "start",
                gap: "1.5rem",
              }}
            >
              {service.steps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.15 }}
                    style={{ padding: "0 1rem" }}
                  >
                    <span style={{ fontSize: "42px", fontFamily: "var(--font-serif)", color: "#C8BFB0", display: "block", marginBottom: "0.5rem" }}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontSize: "11px", letterSpacing: "0.2em", fontWeight: "600", textTransform: "uppercase", display: "block", marginBottom: "0.8rem", color: "#1A1A1A" }}>
                      {step.name}
                    </span>
                    <p style={{ fontSize: "12px", color: "#9A8F82", lineHeight: "1.6", margin: 0 }}>
                      {step.desc}
                    </p>
                  </motion.div>
                  {idx < service.steps.length - 1 && (
                    <div className="process-divider" style={{ width: "1px", height: "100px", backgroundColor: "#C8BFB0", alignSelf: "center" }} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Gallery Strip */}
        <section style={{ width: "100%", overflow: "hidden" }}>
          <div
            className="gallery-strip"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${galleryImages.length || 3}, 1fr)`,
              width: "100%",
            }}
          >
            {galleryLoading
              ? [0, 1, 2].map((idx) => (
                  <div key={idx} className="pexels-skeleton" style={{ height: "420px" }} />
                ))
              : galleryImages.map((img, idx) => (
                  <div key={idx} style={{ height: "420px", overflow: "hidden" }} className="gallery-item">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8 }}
                      src={img}
                      alt={`Gallery piece ${idx + 1}`}
                      className="pexels-img-loaded"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
          </div>
        </section>

        {/* 5. CTA Block */}
        <section style={{ padding: "120px 0", textAlign: "center", backgroundColor: "#F5F0E8" }}>
          <div className="container">
            <h2
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontFamily: "var(--font-serif)",
                lineHeight: "1.2",
                marginBottom: "2.5rem",
                color: "#1A1A1A",
              }}
            >
              Ready to begin? <br />
              <span style={{ fontStyle: "italic" }}>Let&apos;s shape your space.</span>
            </h2>
            
            <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => window.location.href = "/#contact"}
                className="btn-primary"
                style={{ padding: "0.9rem 2.2rem", fontSize: "11px", letterSpacing: "0.2em", fontWeight: "600" }}
              >
                BOOK CONSULTATION
              </button>
              <button
                onClick={() => window.location.href = "/#portfolio"}
                className="btn-outline"
                style={{ padding: "0.9rem 2.2rem", fontSize: "11px", letterSpacing: "0.2em", fontWeight: "600" }}
              >
                VIEW PORTFOLIO
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onNavClick={handleNavClick} />

      {/* Responsive Local Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .back-link:hover {
          color: #F5F0E8 !important;
        }
        @media (max-width: 1024px) {
          .service-hero-title {
            font-size: 42px !important;
          }
        }
        @media (max-width: 480px) {
          .service-hero-title {
            font-size: 32px !important;
          }
        }
        @media (max-width: 900px) {
          .process-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .process-divider {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .overview-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            padding: 60px 0 !important;
          }
          .pull-quote {
            font-size: 24px !important;
            max-width: 100% !important;
          }
          .gallery-strip {
            grid-template-columns: 1fr !important;
          }
          .gallery-item {
            height: 300px !important;
          }
        }
      ` }} />
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

const HERO_QUERIES = {
  "arched-serenity-lounge": "moroccan arch interior warm",
  "shadow-cast-dining-hall": "minimalist dining room sunlight",
  "luminous-reading-salon": "dark wood library reading room",
  "nordic-forest-bedroom": "concrete bedroom forest view",
};

const FULLWIDTH_QUERIES = {
  "arched-serenity-lounge": "arched plaster wall room design",
  "shadow-cast-dining-hall": "concrete oak dining room table",
  "luminous-reading-salon": "warm library reading nook leather chair",
  "nordic-forest-bedroom": "scandinavian modern bedroom neutral",
};

const GALLERY_QUERIES = {
  "arched-serenity-lounge": "terracotta moroccan interior details",
  "shadow-cast-dining-hall": "wabi sabi dining room detail",
  "luminous-reading-salon": "dark wood bookshelf books aesthetic",
  "nordic-forest-bedroom": "nordic minimalist bedroom details",
};

export default function PortfolioDetailClient({ slug }) {
  const [heroImage, setHeroImage] = useState(null);
  const [fullWidthImage, setFullWidthImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  
  const [heroLoading, setHeroLoading] = useState(true);
  const [fullWidthLoading, setFullWidthLoading] = useState(true);
  const [galleryLoading, setGalleryLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        setHeroLoading(true);
        setFullWidthLoading(true);
        setGalleryLoading(true);

        // Fetch Hero Image
        const heroRes = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(HERO_QUERIES[slug] || "luxury interior")}&per_page=1&orientation=landscape`,
          { headers: { Authorization: PEXELS_API_KEY } }
        );
        const heroData = await heroRes.json();
        if (heroData.photos && heroData.photos.length > 0) {
          setHeroImage(heroData.photos[0].src.large2x);
        }

        // Fetch Full Width Image
        const fwRes = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(FULLWIDTH_QUERIES[slug] || "interior design")}&per_page=1&orientation=landscape`,
          { headers: { Authorization: PEXELS_API_KEY } }
        );
        const fwData = await fwRes.json();
        if (fwData.photos && fwData.photos.length > 0) {
          setFullWidthImage(fwData.photos[0].src.large2x);
        }

        // Fetch Gallery Images
        const gallRes = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(GALLERY_QUERIES[slug] || "interior details")}&per_page=3&orientation=landscape`,
          { headers: { Authorization: PEXELS_API_KEY } }
        );
        const gallData = await gallRes.json();
        if (gallData.photos && gallData.photos.length > 0) {
          setGalleryImages(gallData.photos.map((p) => p.src.large2x));
        }
      } catch (err) {
        console.error("Pexels portfolio details fetch error:", err);
      } finally {
        setHeroLoading(false);
        setFullWidthLoading(false);
        setGalleryLoading(false);
      }
    }

    fetchImages();
  }, [slug]);

  const portfolioData = {
    "arched-serenity-lounge": {
      name: "Arched Serenity Lounge",
      boldTitle: "Arched Serenity",
      italicTitle: "Lounge",
      category: "LIVING ROOM",
      location: "Marrakech, Morocco",
      year: "2024",
      scope: "Full Interior",
      area: "340 sqft",
      pullQuote: "Arches do not just hold weight — they hold atmosphere.",
      paragraphs: [
        "We conceive the Arched Serenity Lounge as a study in continuous geometry and warm spatial expansion. Drawing inspiration from classical Moroccan archways, we integrated hand-sculpted plaster sweeps that redirect daylight, casting soft gradients across natural travertine surfaces.",
        "The carefully balanced material selection centers around a highly tactile palette. Low-slung custom seating finished in textured bouclé fabrics sits alongside aged brass details and hand-selected olive wood items. Linen weaves filter the intense Marrakech sunlight, fostering a continuous sensation of grounded peace.",
        "The layout emphasizes quiet reflection, establishing a warm domestic sanctuary where shadow and structure form a harmonious dialogue. Every piece honors both spatial tradition and contemporary functional clarity."
      ],
      materials: [
        "Travertine stone",
        "Bouclé fabric",
        "Aged brass",
        "Olive wood",
        "Linen weave"
      ],
      moodWords: [
        "Stillness",
        "Warmth",
        "Ritual",
        "Earth"
      ]
    },
    "shadow-cast-dining-hall": {
      name: "Shadow Cast Dining Hall",
      boldTitle: "Shadow Cast",
      italicTitle: "Dining Hall",
      category: "KITCHEN & DINING",
      location: "Provence, France",
      year: "2024",
      scope: "Dining & Kitchen",
      area: "520 sqft",
      pullQuote: "A dining room should feel like a conversation before anyone speaks.",
      paragraphs: [
        "Overlooking the historic fields of Provence, this space explores the dynamic contrast between modern architectural precision and raw organic surfaces. The volume is oriented to orchestrate the movement of daylight, casting bold, artistic shadow paths that evolve across the concrete surfaces.",
        "At the spatial center, a monolithic white oak table serves as the primary gathering point. It is surrounded by hand-woven rattan seats that introduce soft, warm texturing. Blackened steel structures and bespoke lighting fixtures add industrial focal points without disrupting the tranquil ambiance.",
        "Concealed kitchen amenities ensure clutter remains completely hidden, prioritizing the visual purity of the dining space. The result is an architectural setting designed for slow dining, lingering conversations, and sensory comfort."
      ],
      materials: [
        "Raw concrete",
        "White oak",
        "Blackened steel",
        "Rattan",
        "Linen"
      ],
      moodWords: [
        "Precision",
        "Light",
        "Gathering",
        "Calm"
      ]
    },
    "luminous-reading-salon": {
      name: "Luminous Reading Salon",
      boldTitle: "Luminous",
      italicTitle: "Reading Salon",
      category: "LIGHTING & STUDY",
      location: "London, UK",
      year: "2023",
      scope: "Study & Library",
      area: "280 sqft",
      pullQuote: "Every good library is a map of someone's inner world.",
      paragraphs: [
        "Located in central London, this reading salon serves as a quiet refuge from the energetic city. The walls are wrapped in floor-to-ceiling dark walnut bookcases, creating a rich visual envelope that doubles as an acoustic barrier for complete peace.",
        "Lighting is choreographed to spotlight reading zones while preserving shadow in quiet corners. A luxurious, aged leather armchair occupies the central nook under a classic brass book rail. Brushed bronze fixtures and a heavy wool carpet bring warmth and tactile luxury to every surface.",
        "Designed to host deep thought and solitary focus, the Luminous Reading Salon represents the ideal home library. It marries historic warmth with modern luxury to create an atmosphere that feels both protective and deeply inspiring."
      ],
      materials: [
        "Dark walnut",
        "Aged leather",
        "Brass rail",
        "Wool carpet",
        "Patinated bronze"
      ],
      moodWords: [
        "Depth",
        "Knowledge",
        "Amber",
        "Solitude"
      ]
    },
    "nordic-forest-bedroom": {
      name: "Nordic Forest Bedroom",
      boldTitle: "Nordic Forest",
      italicTitle: "Bedroom",
      category: "BEDROOM",
      location: "Oslo, Norway",
      year: "2023",
      scope: "Master Bedroom",
      area: "420 sqft",
      pullQuote: "Sleep is not a function. It is an architecture of its own.",
      paragraphs: [
        "Designed for a home on the edge of Oslo's deep pine woodlands, the Nordic Forest Bedroom brings nature directly into the daily living experience. Full-height structural glazing aligns the view with the shifting forest seasons, turning the outdoors into a living canvas.",
        "We paired industrial concrete panels with smoked oak wood flooring and layered organic Belgian linens. All furniture is low-profile and custom-integrated, maintaining clean sightlines and encouraging cognitive decompression.",
        "This space serves as a dedicated sanctuary for absolute rest. By filtering light through sheer drapes and optimizing acoustic dampening, we crafted a bedroom that quietens the mind and nurtures profound recovery."
      ],
      materials: [
        "Concrete panel",
        "Linen bedding",
        "Smoked oak",
        "Matte black steel",
        "Stone"
      ],
      moodWords: [
        "Silence",
        "Forest",
        "Dusk",
        "Rest"
      ]
    }
  };

  const project = portfolioData[slug];

  if (!project) {
    return (
      <div style={{ padding: "10rem 0", textAlign: "center", backgroundColor: "#F5F0E8", color: "#1A1A1A" }}>
        <h1 className="font-serif">Project Not Found</h1>
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
    <div style={{ backgroundColor: "#F5F0E8", minHeight: "100vh", position: "relative", color: "#1A1A1A" }}>
      {/* Navbar */}
      <Header activeSection="" onNavClick={handleNavClick} />

      {/* Main Content Area */}
      <main>
        {/* 1. Full-screen Hero Block (100vh) */}
        <div
          style={{
            position: "relative",
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-start",
            overflow: "hidden",
            backgroundColor: "#14100C",
          }}
        >
          {/* Background image container with brightness(0.70) */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: heroImage ? `url(${heroImage})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: "brightness(0.70)",
              zIndex: 1,
            }}
          />

          {/* Overlay color layer */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(20, 16, 12, 0.40)",
              zIndex: 2,
            }}
          />

          {/* Loading Skeleton */}
          {heroLoading && (
            <div
              className="pexels-skeleton"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 3,
              }}
            />
          )}

          {/* Back link overlay (aligned top-left below the navbar) */}
          <div
            style={{
              position: "absolute",
              top: "calc(var(--header-height, 80px) + 30px)",
              left: "5%",
              zIndex: 10,
            }}
          >
            <Link
              href="/#portfolio"
              className="portfolio-back-link"
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
              ← Back to Portfolio
            </Link>
          </div>

          {/* Bottom-left aligned text container */}
          <div
            className="container"
            style={{
              position: "relative",
              zIndex: 10,
              color: "#F5F0E8",
              paddingBottom: "10vh",
              paddingLeft: "5%",
              paddingRight: "5%",
              maxWidth: "100%",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "0.25em",
                color: "#C8BFB0",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "1rem",
                fontWeight: "600",
              }}
            >
              {project.category}
            </span>

            <h1
              className="font-serif project-hero-title"
              style={{
                fontSize: "62px",
                lineHeight: "1.0",
                fontWeight: "bold",
                color: "#F5F0E8",
                marginBottom: "1.5rem",
              }}
            >
              {project.boldTitle}{" "}
              <span style={{ fontStyle: "italic", fontWeight: "normal" }}>
                {project.italicTitle}
              </span>
            </h1>

            {/* Thin 1px rule */}
            <div
              style={{
                height: "1px",
                backgroundColor: "#C8BFB0",
                width: "60px",
                marginBottom: "1.5rem",
              }}
            />

            <span
              style={{
                fontSize: "12px",
                color: "#C8BFB0",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "block",
              }}
            >
              {project.location} &nbsp;&bull;&nbsp; {project.year}
            </span>
          </div>
        </div>

        {/* 2. Project Intro Section (Two Column, Padding: 100px 0) */}
        <section style={{ backgroundColor: "#F5F0E8" }}>
          <div className="container" style={{ padding: "100px 0" }}>
            <div className="project-intro-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr", gap: "6rem" }}>
              {/* Left Column: Poetic Pull Quote */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0 }}
              >
                <blockquote
                  className="font-serif"
                  style={{
                    fontSize: "26px",
                    lineHeight: "1.4",
                    color: "#1A1A1A",
                    margin: 0,
                    maxWidth: "400px",
                    fontWeight: "400",
                  }}
                >
                  &ldquo;{project.pullQuote}&rdquo;
                </blockquote>
              </motion.div>

              {/* Right Column: Paragraphs */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, delay: 0.15 }}
                style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}
              >
                {project.paragraphs.map((para, idx) => (
                  <p
                    key={idx}
                    style={{
                      fontSize: "13px",
                      lineHeight: "1.9",
                      color: "#6B6560",
                      margin: 0,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. Project Details Strip (4 columns, background: #EFE9DF, padding: 60px 0) */}
        <section style={{ backgroundColor: "#EFE9DF", padding: "60px 0" }}>
          <div className="container">
            <div
              className="details-strip-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr auto 1fr auto 1fr",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {/* Col 1 */}
              <div>
                <span className="details-strip-label">LOCATION</span>
                <span className="details-strip-value">{project.location}</span>
              </div>

              {/* Divider */}
              <div className="details-strip-divider" style={{ width: "1px", height: "40px", backgroundColor: "#C8BFB0" }} />

              {/* Col 2 */}
              <div>
                <span className="details-strip-label">YEAR</span>
                <span className="details-strip-value">{project.year}</span>
              </div>

              {/* Divider */}
              <div className="details-strip-divider" style={{ width: "1px", height: "40px", backgroundColor: "#C8BFB0" }} />

              {/* Col 3 */}
              <div>
                <span className="details-strip-label">SCOPE</span>
                <span className="details-strip-value">{project.scope}</span>
              </div>

              {/* Divider */}
              <div className="details-strip-divider" style={{ width: "1px", height: "40px", backgroundColor: "#C8BFB0" }} />

              {/* Col 4 */}
              <div>
                <span className="details-strip-label">AREA</span>
                <span className="details-strip-value">{project.area}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Full-width Single Image (height: 600px, object-fit: cover) */}
        <section style={{ width: "100%", height: "600px", position: "relative", overflow: "hidden" }}>
          {fullWidthLoading ? (
            <div className="pexels-skeleton" style={{ width: "100%", height: "100%" }} />
          ) : (
            <img
              src={fullWidthImage || ""}
              alt={`${project.name} Secondary Angle`}
              className="pexels-img-loaded"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
        </section>

        {/* 5. Gallery Grid (3 images equal width, no gap, height: 380px, hover overlay) */}
        <section style={{ width: "100%", overflow: "hidden" }}>
          <div
            className="gallery-grid-row"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${galleryImages.length || 3}, 1fr)`,
              width: "100%",
            }}
          >
            {galleryLoading
              ? [0, 1, 2].map((idx) => (
                  <div key={idx} className="pexels-skeleton" style={{ height: "380px" }} />
                ))
              : galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="gallery-grid-item"
                    style={{
                      height: "380px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Hover Overlay */}
                    <div
                      className="gallery-overlay"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(20, 16, 12, 0.20)",
                        opacity: 0,
                        zIndex: 2,
                        transition: "opacity 0.4s ease",
                        pointerEvents: "none",
                      }}
                    />
                    
                    <motion.img
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      src={img}
                      alt={`Detail shot ${idx + 1}`}
                      className="pexels-img-loaded"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                ))}
          </div>
        </section>

        {/* 6. Materials & Mood Section (Two Column, Padding: 100px 0) */}
        <section style={{ backgroundColor: "#F5F0E8" }}>
          <div className="container" style={{ padding: "100px 0" }}>
            <div className="materials-mood-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem" }}>
              {/* Left Column: Materials Used */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.25em",
                    color: "#9A8F82",
                    textTransform: "uppercase",
                    fontWeight: "600",
                    marginBottom: "2rem",
                  }}
                >
                  MATERIALS USED
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {project.materials.map((mat, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: "13px",
                        color: "#6B6560",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Right Column: Design Mood */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                <h3
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.25em",
                    color: "#9A8F82",
                    textTransform: "uppercase",
                    fontWeight: "600",
                    marginBottom: "2rem",
                  }}
                >
                  DESIGN MOOD
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {project.moodWords.map((word, idx) => (
                    <span
                      key={idx}
                      className="font-serif"
                      style={{
                        fontSize: "32px",
                        color: "#C8BFB0",
                        lineHeight: "1.2",
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 7. CTA Block (Centered, Padding: 120px 0) */}
        <section style={{ padding: "120px 0", textAlign: "center", backgroundColor: "#F5F0E8", borderTop: "1px solid rgba(214, 200, 190, 0.4)" }}>
          <div className="container">
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                lineHeight: "1.2",
                marginBottom: "2.5rem",
                color: "#1A1A1A",
              }}
            >
              Inspired by this space? <br />
              <span style={{ fontStyle: "italic", fontWeight: "normal" }}>Let&apos;s create yours.</span>
            </h2>

            <div
              style={{
                height: "1px",
                backgroundColor: "#C8BFB0",
                width: "60px",
                margin: "0 auto 2.5rem auto",
              }}
            />
            
            <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => window.location.href = "/#contact"}
                className="btn-primary"
                style={{ padding: "0.9rem 2.2rem", fontSize: "11px", letterSpacing: "0.2em", fontWeight: "600" }}
              >
                BEGIN YOUR PROJECT
              </button>
              <button
                onClick={() => window.location.href = "/#portfolio"}
                className="btn-outline"
                style={{ padding: "0.9rem 2.2rem", fontSize: "11px", letterSpacing: "0.2em", fontWeight: "600" }}
              >
                VIEW MORE SPACES
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onNavClick={handleNavClick} />

      {/* Inline Styles & Responsive Behaviors */}
      <style dangerouslySetInnerHTML={{ __html: `
        .portfolio-back-link:hover {
          color: #F5F0E8 !important;
        }
        .gallery-grid-item:hover .gallery-overlay {
          opacity: 1 !important;
        }
        .details-strip-label {
          font-size: 10px;
          letter-spacing: 0.25em;
          color: #9A8F82;
          display: block;
          margin-bottom: 0.4rem;
          text-transform: uppercase;
        }
        .details-strip-value {
          font-size: 13px;
          color: #1A1A1A;
          font-weight: 400;
          display: block;
        }
        @media (max-width: 1024px) {
          .project-hero-title {
            font-size: 46px !important;
          }
        }
        @media (max-width: 480px) {
          .project-hero-title {
            font-size: 32px !important;
          }
        }
        @media (max-width: 768px) {
          .project-intro-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .details-strip-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .details-strip-divider {
            display: none !important;
          }
          .gallery-grid-row {
            grid-template-columns: 1fr !important;
          }
          .gallery-grid-item {
            height: 300px !important;
          }
          .materials-mood-grid {
            grid-template-columns: 1fr !important;
            gap: 3.5rem !important;
          }
        }
      ` }} />
    </div>
  );
}

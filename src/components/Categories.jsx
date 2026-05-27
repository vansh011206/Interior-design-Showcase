"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePexelsImage } from "@/lib/usePexelsImage";

const SERVICE_QUERIES = {
  "minimalist-bathrooms": "minimalist stone bathroom",
  "bespoke-seating": "luxury bespoke sofa living room",
  "lighting-solutions": "architectural cove lighting interior",
  "sophisticated-bedrooms": "luxury platform bedroom",
};

function ServiceCard({ card, idx }) {
  const { imageUrl, loading } = usePexelsImage(SERVICE_QUERIES[card.slug]);

  return (
    <Link
      href={`/services/${card.slug}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 1.2,
          delay: idx * 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={{ y: -8 }}
        style={{
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          position: "relative",
        }}
      >
        {/* Card Image */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "360px",
            overflow: "hidden",
            marginBottom: "1.5rem",
            boxShadow: "0 15px 30px rgba(0,0,0,0.03)",
          }}
        >
          {loading ? (
            <div className="pexels-skeleton" style={{ width: "100%", height: "100%" }} />
          ) : (
            <motion.div
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "100%", height: "100%" }}
            >
              <img
                src={imageUrl || ""}
                alt={card.title}
                className="pexels-img-loaded"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </motion.div>
          )}
          {/* Thin overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(26,26,26,0) 50%, rgba(26,26,26,0.3) 100%)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Title & Arrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "0.6rem",
          }}
        >
          <h3
            style={{
              fontSize: card.title === "SOPHISTICATED BEDROOMS" ? "11.5px" : "12.5px",
              letterSpacing: "0.18em",
              fontWeight: "500",
              color: "#1A1A1A",
              whiteSpace: "nowrap",
              lineHeight: 1,
              fontFamily: "var(--font-sans)",
            }}
          >
            {card.title}
          </h3>
          <span
            style={{
              marginLeft: "8px",
              fontSize: card.title === "SOPHISTICATED BEDROOMS" ? "11.5px" : "12.5px",
              color: "#1A1A1A",
              lineHeight: 1,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            →
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--earth-clay)",
            lineHeight: "1.6",
            fontWeight: "300",
          }}
        >
          {card.description}
        </p>
      </motion.div>
    </Link>
  );
}

export default function Categories({ onExploreClick }) {
  const serviceCards = [
    {
      title: "MINIMALIST BATHROOMS",
      slug: "minimalist-bathrooms",
      description: "Seamless natural textures, high-end stone integrations, and elegant plumbing fixtures that craft private wellness sanctuaries.",
    },
    {
      title: "BESPOKE SEATING",
      slug: "bespoke-seating",
      description: "Artisanal lounge chairs, custom boucle sofas, and solid-wood dining chairs sculpted for ultimate geometric precision.",
    },
    {
      title: "LIGHTING SOLUTIONS",
      slug: "lighting-solutions",
      description: "Architectural cove lighting, custom brass pendants, and smart dimming systems designed to elevate interior ambiance.",
    },
    {
      title: "SOPHISTICATED BEDROOMS",
      slug: "sophisticated-bedrooms",
      description: "Low platform bed structures, custom nightstands, and organic linen bedding nestled in scenic and quiet views.",
    },
  ];

  return (
    <section
      id="categories"
      style={{
        padding: "9rem 0",
        backgroundColor: "var(--bg-primary)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "6rem",
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              letterSpacing: "0.2em",
              color: "var(--earth-clay)",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            OUR DESIGN CAPABILITIES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.15 }}
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontFamily: "var(--font-serif)",
              maxWidth: "600px",
              lineHeight: 1.2,
            }}
          >
            Bespoke Services for <br />
            <span style={{ fontStyle: "italic" }}>Curated Spaces</span>
          </motion.h2>
        </div>

        {/* Categories Grid */}
        <div className="grid-4">
          {serviceCards.map((card, idx) => (
            <ServiceCard key={idx} card={card} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

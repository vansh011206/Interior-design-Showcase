"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePexelsImage } from "@/lib/usePexelsImage";

const PORTFOLIO_QUERIES = {
  1: "moroccan arch interior warm",
  2: "minimalist dining room sunlight",
  3: "dark wood library reading room",
  4: "concrete bedroom forest view",
};

export default function Portfolio() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Fetch all 4 portfolio images
  const img1 = usePexelsImage(PORTFOLIO_QUERIES[1]);
  const img2 = usePexelsImage(PORTFOLIO_QUERIES[2]);
  const img3 = usePexelsImage(PORTFOLIO_QUERIES[3]);
  const img4 = usePexelsImage(PORTFOLIO_QUERIES[4]);

  const pexelsImages = {
    1: img1.imageUrl,
    2: img2.imageUrl,
    3: img3.imageUrl,
    4: img4.imageUrl,
  };
  const pexelsLoading = {
    1: img1.loading,
    2: img2.loading,
    3: img3.loading,
    4: img4.loading,
  };

  const filters = ["All", "Kitchen", "Bedroom", "Living Room", "Lighting"];

  const items = [
    { id: 1, title: "Arched Serenity Lounge", category: "Living Room", span: "large", slug: "arched-serenity-lounge" },
    { id: 2, title: "Shadow Cast Dining Hall", category: "Kitchen", span: "medium", slug: "shadow-cast-dining-hall" },
    { id: 3, title: "Luminous Reading Salon", category: "Lighting", span: "small", slug: "luminous-reading-salon" },
    { id: 4, title: "Nordic Forest Bedroom", category: "Bedroom", span: "medium", slug: "nordic-forest-bedroom" },
  ];

  const filteredItems =
    selectedFilter === "All"
      ? items
      : items.filter((item) => item.category === selectedFilter);

  return (
    <section
      id="portfolio"
      style={{
        padding: "9rem 0",
        backgroundColor: "var(--bg-primary)",
        borderTop: "1px solid rgba(214, 200, 190, 0.4)",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: "6rem" }}>
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
              display: "block",
              marginBottom: "1rem",
            }}
          >
            PORTFOLIO OF SPACES
          </motion.span>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.15 }}
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontFamily: "var(--font-serif)",
                lineHeight: "1.15",
                maxWidth: "700px",
                color: "var(--text-primary)",
              }}
            >
              Spatial Harmony & <br />
              <span style={{ fontStyle: "italic" }}>Architectural Clarity</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
              style={{
                fontSize: "0.9rem",
                color: "var(--earth-clay)",
                fontWeight: "300",
                maxWidth: "400px",
                lineHeight: "1.6",
              }}
            >
              Each project is a meticulous exploration of geometry, context, 
              and sensory luxury, crafted to bring peace and refined functional clarity.
            </motion.p>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="filter-container">
          {filters.map((filter) => {
            const isSelected = selectedFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                style={{
                  fontSize: "0.8rem",
                  fontWeight: isSelected ? "600" : "400",
                  letterSpacing: "0.1em",
                  color: isSelected ? "var(--text-primary)" : "var(--earth-clay)",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  position: "relative",
                  textTransform: "uppercase",
                  transition: "var(--transition-fast)",
                  whiteSpace: "nowrap",
                }}
              >
                {filter}
                {isSelected && (
                  <motion.div
                    layoutId="portfolioActiveTab"
                    style={{
                      position: "absolute",
                      bottom: "-17px",
                      left: 0,
                      right: 0,
                      height: "1.5px",
                      backgroundColor: "var(--text-primary)",
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="portfolio-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              let colSpan = 6;
              let height = "450px";
              
              if (item.span === "large") {
                colSpan = 7;
                height = "520px";
              } else if (item.span === "medium") {
                colSpan = 5;
                height = "520px";
              } else if (item.span === "small") {
                colSpan = 4;
                height = "420px";
              }

              const imgSrc = pexelsImages[item.id];
              const isLoading = pexelsLoading[item.id];

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -6 }}
                  key={item.id}
                  style={{
                    gridColumn: `span ${colSpan}`,
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  className="portfolio-item-card"
                >
                  <Link
                    href={`/portfolio/${item.slug}`}
                    style={{ display: "flex", flexDirection: "column", textDecoration: "none", color: "inherit", width: "100%" }}
                  >
                    <div
                      className={`portfolio-img-wrapper ${item.span}`}
                      style={{
                        borderRadius: item.id === 1 ? "300px 300px 0 0" : "0",
                      }}
                    >
                      {isLoading ? (
                        <div className="pexels-skeleton" style={{ width: "100%", height: "100%" }} />
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.04 }}
                          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                          style={{ width: "100%", height: "100%" }}
                        >
                          <img
                            src={imgSrc || ""}
                            alt={item.title}
                            className="pexels-img-loaded"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </motion.div>
                      )}

                      {/* Dark overlay */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "linear-gradient(180deg, rgba(26,26,26,0) 60%, rgba(26,26,26,0.4) 100%)",
                          pointerEvents: "none",
                        }}
                      />

                      {/* View Button Overlay */}
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%) scale(0.8)",
                          opacity: 0,
                          backgroundColor: "var(--bg-primary)",
                          color: "var(--text-primary)",
                          padding: "0.9rem 2.0rem",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                          boxShadow: "0 15px 30px rgba(0,0,0,0.08)",
                        }}
                        className="quick-view-btn"
                      >
                        VIEW SPACE
                      </div>
                    </div>

                    {/* Title and Category */}
                    <motion.div layout="position">
                      <h3
                        className="font-serif"
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "700",
                          marginBottom: "0.3rem",
                        }}
                      >
                        {item.title}
                      </h3>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          letterSpacing: "0.1em",
                          color: "var(--earth-clay)",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.category}
                      </span>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <style jsx global>{`
        .portfolio-item-card:hover .quick-view-btn {
          opacity: 1 !important;
          transform: translate(-50%, -50%) scale(1) !important;
        }
        @media (max-width: 1024px) {
          .portfolio-item-card {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
}

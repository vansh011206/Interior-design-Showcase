"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/lib/products";
import { usePexelsImage } from "@/lib/usePexelsImage";

function ProductCard({ p, onNavigate }) {
  const { imageUrl, loading } = usePexelsImage(p.query, "portrait");

  const handleClick = (e) => {
    e.preventDefault();
    onNavigate(`/boutique/${p.slug}`);
  };

  return (
    <a href={`/boutique/${p.slug}`} onClick={handleClick}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          position: "relative",
        }}
        className="boutique-card-container"
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "3/4",
            overflow: "hidden",
            backgroundColor: "#24201C",
          }}
          className="boutique-image-wrapper"
        >
          {loading ? (
            <div className="pexels-skeleton" style={{ width: "100%", height: "100%" }} />
          ) : (
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "100%", height: "100%" }}
            >
              <img
                src={imageUrl || ""}
                alt={p.name}
                className="pexels-img-loaded"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </motion.div>
          )}

          {/* Hover Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(20, 16, 12, 0.30)",
              opacity: 0,
              transition: "opacity 0.4s ease",
              pointerEvents: "none",
              zIndex: 2,
            }}
            className="boutique-card-overlay"
          />
        </div>

        {/* Text Details */}
        <div style={{ padding: "1.2rem 0.5rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "0.25rem",
            }}
            className="boutique-card-header"
          >
            <h3 style={{ fontSize: "13px", fontWeight: "400", color: "#E8E0D5" }}>
              {p.name}
            </h3>
            <span style={{ fontSize: "13px", fontWeight: "400", color: "#E8E0D5", flexShrink: 0 }}>
              {p.price}
            </span>
          </div>
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "#6B6560",
              textTransform: "uppercase",
              display: "block",
            }}
          >
            {p.category}
          </span>
        </div>
      </motion.div>
    </a>
  );
}

export default function BoutiqueClient() {
  const [activeTab, setActiveTab] = useState("ALL");
  const tabs = ["ALL", "FURNITURE", "LIGHTING", "DECOR", "TEXTILES"];

  const filteredProducts = activeTab === "ALL" 
    ? products 
    : products.filter(p => p.category.toUpperCase() === activeTab);

  // GSAP entrance animation
  useEffect(() => {
    gsap.fromTo("main",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
    );
  }, []);

  // Reusable exit transition helper
  const navigateWithTransition = useCallback((url) => {
    gsap.to("main", {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => { window.location.href = url; }
    });
  }, []);

  const handleNavClick = (sectionId) => {
    navigateWithTransition(`/#${sectionId}`);
  };

  return (
    <div style={{ backgroundColor: "#1A1A1A", minHeight: "100vh", position: "relative", color: "#F5F0E8" }}>
      {/* Sticky Premium Header */}
      <Header activeSection="" onNavClick={handleNavClick} />

      <main style={{ paddingTop: "80px" }}>
        {/* Page Header */}
        <header
          style={{
            padding: "100px 1.5rem 60px 1.5rem",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              letterSpacing: "0.25em",
              color: "#6B6560",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "1rem",
              fontWeight: "600",
            }}
          >
            BOUTIQUE CURATIONS
          </span>
          <h1
            className="font-serif boutique-title"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              lineHeight: "1.2",
              color: "#E8E0D5",
              marginBottom: "1.5rem",
              fontWeight: "400",
            }}
          >
            Curated Pieces for <br className="desktop-br" />
            the <span style={{ fontStyle: "italic" }}>Modern Home</span>
          </h1>
          
          {/* Thin 1px rule */}
          <div
            style={{
              height: "1px",
              backgroundColor: "#3A3530",
              width: "60px",
              marginBottom: "1.5rem",
            }}
          />

          <p
            style={{
              fontSize: "13px",
              color: "#6B6560",
              maxWidth: "500px",
              lineHeight: "1.6",
            }}
          >
            Each piece is selected for its craft, material honesty, and spatial harmony.
          </p>
        </header>

        <div className="container">
          {/* Filter Tabs Container */}
          <div className="boutique-tabs-container">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.25em",
                    color: isActive ? "#F5F0E8" : "#6B6560",
                    fontWeight: "600",
                    cursor: "pointer",
                    paddingBottom: "0.8rem",
                    borderBottom: isActive ? "1px solid #6B6560" : "1px solid transparent",
                    transition: "all 0.3s ease",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Product Grid */}
          <div className="boutique-grid">
            {filteredProducts.map((p) => (
              <ProductCard key={p.slug} p={p} onNavigate={navigateWithTransition} />
            ))}
          </div>
        </div>

        {/* Bottom CTA Strip */}
        <section
          style={{
            padding: "80px 0",
            textAlign: "center",
            borderTop: "1px solid #3A3530",
            backgroundColor: "#1A1A1A",
          }}
        >
          <div className="container">
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "400",
                color: "#E8E0D5",
                marginBottom: "0.5rem",
              }}
            >
              Don&apos;t see what you&apos;re looking for?
            </h3>
            <p
              style={{
                fontSize: "14px",
                fontStyle: "italic",
                color: "#6B6560",
                marginBottom: "2.5rem",
              }}
            >
              We source bespoke pieces on request.
            </p>
            <button
              className="boutique-cta-btn"
              onClick={() => navigateWithTransition("/#contact")}
            >
              CONTACT US
            </button>
          </div>
        </section>
      </main>

      {/* Elegant Dark Footer */}
      <Footer onNavClick={handleNavClick} />

      <style jsx global>{`
        .boutique-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
          margin-bottom: 80px;
        }
        .boutique-card-container:hover .boutique-card-overlay {
          opacity: 1 !important;
        }
        .boutique-cta-btn {
          background-color: transparent;
          color: #E8E0D5;
          border: 1px solid #6B6560;
          padding: 0.8rem 2.2rem;
          font-size: 11px;
          letter-spacing: 0.25em;
          font-weight: 600;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .boutique-cta-btn:hover {
          background-color: #E8E0D5;
          color: #1A1A1A;
          border-color: #E8E0D5;
        }
        .boutique-tabs-container {
          display: flex;
          justify-content: center;
          gap: 2.5rem;
          margin-bottom: 60px;
          border-bottom: 1px solid #3A3530;
          padding-bottom: 1rem;
        }
        @media (max-width: 1024px) {
          .boutique-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .boutique-tabs-container {
            justify-content: flex-start !important;
            gap: 1.5rem !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
          }
          .boutique-tabs-container::-webkit-scrollbar {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .boutique-grid {
            grid-template-columns: 1fr;
          }
          .boutique-title {
            font-size: 1.75rem !important;
          }
          .desktop-br {
            display: none !important;
          }
          .boutique-card-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.2rem !important;
          }
        }
      `}</style>
    </div>
  );
}

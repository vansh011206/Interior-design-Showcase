"use client";

import React, { useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/lib/products";
import { usePexelsImage } from "@/lib/usePexelsImage";

function RelatedProductCard({ p, onNavigate }) {
  const { imageUrl, loading } = usePexelsImage(p.query, "portrait");

  const handleClick = (e) => {
    e.preventDefault();
    onNavigate(`/boutique/${p.slug}`);
  };

  return (
    <a href={`/boutique/${p.slug}`} onClick={handleClick}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          position: "relative",
        }}
        className="related-card-container"
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "3/4",
            overflow: "hidden",
            backgroundColor: "#24201C",
          }}
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
            className="related-card-overlay"
          />
        </div>

        {/* Details */}
        <div style={{ padding: "1rem 0.2rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "0.2rem",
            }}
            className="related-card-header"
          >
            <h4 style={{ fontSize: "12px", fontWeight: "400", color: "#E8E0D5" }}>
              {p.name}
            </h4>
            <span style={{ fontSize: "12px", fontWeight: "400", color: "#E8E0D5" }}>
              {p.price}
            </span>
          </div>
          <span
            style={{
              fontSize: "9px",
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

export default function ProductDetailClient({ slug }) {
  const product = products.find((p) => p.slug === slug);
  const { imageUrl, loading } = usePexelsImage(product?.query || "", "portrait");

  if (!product) {
    return (
      <div style={{ padding: "10rem 0", textAlign: "center", backgroundColor: "#1A1A1A", color: "#E8E0D5" }}>
        <h1 className="font-serif">Product Not Found</h1>
        <Link href="/boutique" style={{ textDecoration: "underline", marginTop: "2rem", display: "inline-block", color: "#6B6560" }}>
          Return to Boutique
        </Link>
      </div>
    );
  }

  // Get up to 3 related products
  const relatedProducts = products
    .filter((p) => p.slug !== slug && p.category === product.category)
    .slice(0, 3);
  
  if (relatedProducts.length < 3) {
    const additional = products
      .filter((p) => p.slug !== slug && !relatedProducts.some((r) => r.slug === p.slug))
      .slice(0, 3 - relatedProducts.length);
    relatedProducts.push(...additional);
  }

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

  const handleEnquiry = () => {
    alert(`Enquiry for "${product.name}" has been initiated. Redirecting you to our contact section to complete your request.`);
    navigateWithTransition("/#contact");
  };

  return (
    <div style={{ backgroundColor: "#1A1A1A", minHeight: "100vh", position: "relative", color: "#F5F0E8" }}>
      {/* Navbar */}
      <Header activeSection="" onNavClick={handleNavClick} />

      <main style={{ paddingTop: "80px" }}>
        <div className="container" style={{ paddingTop: "30px" }}>
          {/* Back Navigation Link */}
          <div style={{ marginBottom: "2rem" }}>
            <a
              href="/boutique"
              onClick={(e) => { e.preventDefault(); navigateWithTransition("/boutique"); }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontSize: "11px",
                letterSpacing: "0.15em",
                color: "#6B6560",
                textTransform: "uppercase",
                fontWeight: "600",
                transition: "color 0.25s ease",
                cursor: "pointer",
              }}
              className="boutique-back-link"
            >
              ← Back to Boutique
            </a>
          </div>

          {/* Split Detail Layout */}
          <div
            className="detail-split-container"
            style={{
              display: "flex",
              gap: "5rem",
              marginBottom: "80px",
            }}
          >
            {/* Left: Large Product Image */}
            <div
              className="detail-left-col"
              style={{
                width: "55%",
                position: "sticky",
                top: "120px",
                height: "calc(100vh - 200px)",
                minHeight: "500px",
                overflow: "hidden",
                backgroundColor: "#24201C",
              }}
            >
              {loading ? (
                <div className="pexels-skeleton" style={{ width: "100%", height: "100%" }} />
              ) : (
                <img
                  src={imageUrl || ""}
                  alt={product.name}
                  className="pexels-img-loaded"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>

            {/* Right: Product Info */}
            <div
              className="detail-right-col"
              style={{
                width: "45%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  color: "#6B6560",
                  textTransform: "uppercase",
                  fontWeight: "600",
                  marginBottom: "1rem",
                  display: "block",
                }}
              >
                {product.category}
              </span>

              <h1
                className="font-serif"
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                  lineHeight: "1.2",
                  color: "#E8E0D5",
                  marginBottom: "1rem",
                }}
              >
                {product.name}
              </h1>

              <div
                style={{
                  fontSize: "20px",
                  color: "#E8E0D5",
                  marginBottom: "2rem",
                  fontWeight: "300",
                }}
              >
                {product.price}
              </div>

              {/* Thin Rule */}
              <div
                style={{
                  height: "1px",
                  backgroundColor: "#3A3530",
                  width: "100%",
                  marginBottom: "2rem",
                }}
              />

              <p
                style={{
                  fontSize: "13px",
                  lineHeight: "1.8",
                  color: "#8C857E",
                  marginBottom: "2.5rem",
                }}
              >
                {product.description}
              </p>

              {/* Materials List */}
              <div style={{ marginBottom: "3rem" }}>
                <h4
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    color: "#6B6560",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                  }}
                >
                  MATERIALS
                </h4>
                <ul
                  style={{
                    listStyleType: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                  }}
                >
                  {product.materials.map((m, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontSize: "12px",
                        color: "#E8E0D5",
                        letterSpacing: "0.05em",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span style={{ width: "4px", height: "4px", backgroundColor: "#6B6560", borderRadius: "50%" }}></span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Enquire Button */}
              <button onClick={handleEnquiry} className="boutique-enquire-btn">
                ENQUIRE ABOUT THIS PIECE
              </button>
            </div>
          </div>

          {/* Related Products Section */}
          <section
            style={{
              paddingTop: "60px",
              borderTop: "1px solid #3A3530",
              marginBottom: "80px",
            }}
          >
            <h2
              className="font-serif"
              style={{
                fontSize: "20px",
                color: "#E8E0D5",
                marginBottom: "2.5rem",
                letterSpacing: "0.05em",
              }}
            >
              YOU MAY ALSO LIKE
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "2rem",
              }}
              className="related-grid"
            >
              {relatedProducts.map((p) => (
                <RelatedProductCard key={p.slug} p={p} onNavigate={navigateWithTransition} />
              ))}
            </div>
          </section>
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

      {/* Footer */}
      <Footer onNavClick={handleNavClick} />

      <style jsx global>{`
        .boutique-back-link:hover {
          color: #E8E0D5 !important;
        }
        .related-card-container:hover .related-card-overlay {
          opacity: 1 !important;
        }
        .boutique-enquire-btn {
          width: 100%;
          background-color: #000000;
          color: #E8E0D5;
          border: 1px solid #3A3530;
          padding: 1.1rem;
          font-size: 11px;
          letter-spacing: 0.2em;
          font-weight: 600;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .boutique-enquire-btn:hover {
          background-color: #E8E0D5;
          color: #1A1A1A;
          border-color: #E8E0D5;
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
        @media (max-width: 992px) {
          .detail-split-container {
            flex-direction: column !important;
            gap: 3rem !important;
          }
          .detail-left-col {
            width: 100% !important;
            height: 450px !important;
            position: relative !important;
            top: 0 !important;
            min-height: auto !important;
          }
          .detail-right-col {
            width: 100% !important;
          }
        }
        @media (max-width: 768px) {
          .related-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 480px) {
          .related-card-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.2rem !important;
          }
        }
      `}</style>
    </div>
  );
}

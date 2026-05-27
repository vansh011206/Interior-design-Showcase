"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePexelsImage } from "@/lib/usePexelsImage";

export default function Hero({ onExploreClick, onBookClick }) {
  const containerRef = useRef(null);
  const { imageUrl, loading } = usePexelsImage("luxury interior arched living room");

  // Parallax Scroll Effect for the Arched Hero Image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0px", "120px"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const subheadingVariants = {
    hidden: { opacity: 0, letterSpacing: "0.15em" },
    visible: {
      opacity: 1,
      letterSpacing: "0.25em",
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  const btnVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const metrics = [
    { label: "SPACE PLANNING", desc: "For High-End Residential" },
    { label: "FURNITURE CURATION", desc: "Bespoke & Custom Designed" },
    { label: "LIGHTING DESIGN", desc: "Luminous Ambient Systems" },
    { label: "STYLING & CONSULTING", desc: "Expert Art Direction" },
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      style={{
        paddingTop: "calc(var(--header-height) + 8rem)",
        paddingBottom: "0rem",
        backgroundColor: "var(--bg-primary)",
        position: "relative",
        overflow: "hidden",
        minHeight: "95vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Background Image on Right Half - 30% Opacity with Left Cream Blend Fade */}
      <div
        className="hero-bg-wrapper"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "55%",
          opacity: 0.3,
          zIndex: 1,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <div className="pexels-skeleton" style={{ width: "100%", height: "100%" }} />
        ) : (
          <motion.img
            src={imageUrl || ""}
            alt="Architectural Serenity Living Room"
            style={{
              width: "100%",
              height: "120%",
              objectFit: "cover",
              objectPosition: "center 30%",
              y: imageY,
            }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "35%",
            background: "linear-gradient(to right, var(--bg-primary) 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left",
            width: "100%",
            maxWidth: "680px",
          }}
        >
          {/* Tagline */}
          <motion.span
            variants={subheadingVariants}
            style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "var(--earth-clay)",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              fontVariant: "all-small-caps",
            }}
          >
            Where space meets soul
          </motion.span>

          {/* Signature horizontal rule */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "80px" }}
            transition={{ duration: 1.2, delay: 0.4 }}
            style={{
              height: "1px",
              backgroundColor: "#C8BFB0",
              margin: "2rem 0",
            }}
          />

          {/* Heading */}
          <motion.div className="hero-title-container" style={{ y: textY, opacity: textOpacity, marginBottom: "4.5rem" }}>
            <motion.h1
              variants={titleVariants}
              style={{
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                color: "var(--text-primary)",
                fontFamily: "var(--font-serif)",
                lineHeight: 1.0,
                fontWeight: "400",
                letterSpacing: "-0.015em",
              }}
            >
              The Art of Modern <br />
              <span
                style={{
                  fontStyle: "italic",
                  color: "#9A8F82",
                  fontFamily: "var(--font-serif)",
                }}
              >
                Interior Living
              </span>
            </motion.h1>
          </motion.div>

          {/* Buttons */}
          <motion.div
            variants={btnVariants}
            className="hero-button-group"
            style={{
              display: "flex",
              gap: "1.5rem",
              marginBottom: "9rem",
              flexWrap: "wrap",
            }}
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2, backgroundColor: "#000" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              onClick={onExploreClick}
              className="btn-primary"
              style={{
                padding: "14px 48px",
                backgroundColor: "#1A1A1A",
                borderColor: "#1A1A1A",
                color: "var(--bg-primary)",
                fontWeight: "400",
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                height: "auto",
              }}
            >
              EXPLORE COLLECTION
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -2, backgroundColor: "#1A1A1A", color: "var(--bg-primary)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              onClick={onBookClick}
              className="btn-outline"
              style={{
                padding: "14px 48px",
                backgroundColor: "transparent",
                borderColor: "#1A1A1A",
                color: "#1A1A1A",
                fontWeight: "400",
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                height: "auto",
              }}
            >
              BOOK CONSULTATION
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Metrics Bar */}
      <div
        style={{
          backgroundColor: "var(--text-primary)",
          color: "var(--bg-primary)",
          padding: "4rem 0",
          position: "relative",
          zIndex: 3,
        }}
      >
        <div className="container">
          <div className="grid-4" style={{ textAlign: "center" }}>
            {metrics.map((m, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: idx * 0.15,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
                whileHover={{ scale: 1.05, y: -4 }}
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  cursor: "pointer",
                  padding: "1rem",
                  borderRadius: "8px",
                  transition: "background 0.3s ease",
                }}
              >
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    letterSpacing: "0.15em",
                    color: "var(--bg-primary)",
                  }}
                >
                  {m.label}
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--stone-taupe)",
                    fontWeight: "300",
                  }}
                >
                  {m.desc}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .hero-bg-wrapper {
            width: 100% !important;
            opacity: 0.15 !important;
          }
          .hero-title-container {
            margin-bottom: 2.5rem !important;
          }
          .hero-button-group {
            margin-bottom: 5rem !important;
            flex-direction: column !important;
            width: 100%;
          }
          .hero-button-group button {
            width: 100% !important;
          }
        }
      ` }} />
    </section>
  );
}

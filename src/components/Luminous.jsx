"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePexelsImage } from "@/lib/usePexelsImage";

export default function Luminous({ onDiscoverClick }) {
  const { imageUrl, loading } = usePexelsImage("architectural cove lighting interior");

  return (
    <section
      style={{
        padding: "9rem 0",
        backgroundColor: "var(--bg-primary)",
        borderTop: "1px solid rgba(214, 200, 190, 0.4)",
        overflow: "hidden",
      }}
    >
      <div className="container">
        <div className="grid-2" style={{ alignItems: "center" }}>
          {/* Left Column Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: "600",
                letterSpacing: "0.2em",
                color: "var(--earth-clay)",
                textTransform: "uppercase",
                marginBottom: "1.2rem",
              }}
            >
              AMBIENCE & ARCHITECTURE
            </span>
            <h2
              style={{
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                fontFamily: "var(--font-serif)",
                lineHeight: "1.15",
                marginBottom: "2rem",
                color: "var(--text-primary)",
              }}
            >
              Luminous Living: <br />
              <span style={{ fontStyle: "italic" }}>Innovative Lighting</span> <br />
              Designs
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--earth-clay)",
                fontWeight: "300",
                lineHeight: "1.7",
                marginBottom: "2.8rem",
                maxWidth: "480px",
              }}
            >
              We believe illumination is the invisible paint of architecture. 
              By seamlessly embedding custom LED warm strips, high-rendering spot apertures, 
              and sculptural organic glass lamps, we balance shadow and reflection to elevate 
              functional interiors into breathtaking emotional sanctuaries.
            </p>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onDiscoverClick}
              className="btn-primary"
            >
              DISCOVER DESIGNS
            </motion.button>
          </motion.div>

          {/* Right Column Image */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "relative",
              width: "100%",
              height: "480px",
              boxShadow: "0 30px 60px rgba(26,26,26,0.06)",
              overflow: "hidden",
            }}
          >
            {loading ? (
              <div className="pexels-skeleton" style={{ width: "100%", height: "100%" }} />
            ) : (
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: "100%", height: "100%" }}
              >
                <img
                  src={imageUrl || ""}
                  alt="Luxury Ambient Living Room Lighting"
                  className="pexels-img-loaded"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

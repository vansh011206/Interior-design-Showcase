"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { usePexelsImage } from "@/lib/usePexelsImage";

const BOUTIQUE_QUERIES = [
  "oak armchair minimal",
  "brass desk lamp interior",
  "boucle chair beige",
  "ceramic vase interior",
];

function ProductCard({ p, idx }) {
  const { imageUrl, loading } = usePexelsImage(BOUTIQUE_QUERIES[idx]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        cursor: "pointer",
      }}
    >
      {/* Product Card Body */}
      <div
        style={{
          background: "transparent",
          padding: "0",
          height: "320px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
          marginBottom: "1.2rem",
          borderRadius: "4px",
        }}
        className="product-image-container"
      >
        {/* Sale Tag */}
        {p.sale && (
          <span
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              padding: "8px 10px",
              fontSize: "10px",
              letterSpacing: "0.18em",
              color: "#9A8F82",
              fontWeight: "400",
              zIndex: "5",
              textTransform: "lowercase",
            }}
          >
            10% off
          </span>
        )}

        {/* Product Image */}
        {loading ? (
          <div className="pexels-skeleton" style={{ width: "100%", height: "100%", borderRadius: "4px" }} />
        ) : (
          <motion.div
            whileHover={{ scale: 1.05 }}
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
                borderRadius: "4px",
              }}
            />
          </motion.div>
        )}

        {/* Add to Cart Overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40px",
            background: "rgba(26, 26, 26, 0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "translateY(100%)",
            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            borderRadius: "0 0 4px 4px",
          }}
          className="shop-overlay"
        >
          <span
            style={{
              color: "var(--bg-primary)",
              fontSize: "0.75rem",
              fontWeight: "600",
              letterSpacing: "0.1em",
            }}
          >
            QUICK SHOP +
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div style={{ width: "100%", background: "transparent" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            width: "100%",
            marginBottom: "0.35rem",
          }}
        >
          <h3 style={{ fontSize: "13px", fontWeight: "400", color: "#E8E0D5" }}>
            {p.name}
          </h3>
          <span style={{ fontSize: "13px", fontWeight: "400", color: "#E8E0D5" }}>
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
  );
}

export default function CuratedShop() {
  const products = [
    {
      name: "Solitude Oak Armchair",
      category: "Furniture",
      price: "$1,420",
      sale: "10% OFF",
    },
    {
      name: "Linear Brass Desk Lamp",
      category: "Lighting",
      price: "$310",
    },
    {
      name: "Organic Bouclé Chair",
      category: "Furniture",
      price: "$1,800",
    },
    {
      name: "Ceramic Arch Vase",
      category: "Decor",
      price: "$170",
    },
  ];

  return (
    <section
      id="boutique"
      style={{
        padding: "9rem 0",
        backgroundColor: "var(--text-primary)",
        color: "var(--bg-primary)",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "6rem",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          <div>
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                fontSize: "0.75rem",
                fontWeight: "600",
                letterSpacing: "0.2em",
                color: "var(--stone-taupe)",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "1rem",
              }}
            >
              BOUTIQUE CURATIONS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.15 }}
              className="font-serif"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                lineHeight: "1.2",
              }}
            >
              Curated Pieces for <br />
              the <span style={{ fontStyle: "italic" }}>Modern Home</span>
            </motion.h2>
          </div>
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            whileHover={{ scale: 1.03, borderColor: "#C8BFB0", color: "#E8E0D5" }}
            whileTap={{ scale: 0.97 }}
            className="btn-outline"
            style={{
              color: "#C8BFB0",
              borderColor: "#6B6560",
              padding: "0.8rem 2.2rem",
              fontSize: "11px",
              letterSpacing: "0.2em",
            }}
            onClick={() => alert("Redirecting to boutique gallery...")}
          >
            VIEW ALL ITEMS
          </motion.button>
        </div>

        {/* Products Grid */}
        <div className="grid-4">
          {products.map((p, idx) => (
            <ProductCard key={idx} p={p} idx={idx} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .product-image-container:hover .shop-overlay {
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
}

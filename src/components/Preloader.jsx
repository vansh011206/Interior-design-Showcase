"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 800);
    }, 2400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            backgroundColor: "var(--text-primary)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {/* Logo text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: "700",
              letterSpacing: "0.2em",
              color: "var(--bg-primary)",
            }}
          >
            DAROS
          </motion.div>

          {/* Tagline */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            style={{
              fontSize: "0.75rem",
              fontWeight: "400",
              letterSpacing: "0.3em",
              color: "var(--stone-taupe)",
              textTransform: "uppercase",
            }}
          >
            ARCHITECTURAL SERENITY
          </motion.span>

          {/* Animated progress line */}
          <div
            style={{
              width: "120px",
              height: "1px",
              backgroundColor: "rgba(245, 242, 237, 0.15)",
              position: "relative",
              marginTop: "1rem",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.6,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "var(--bg-primary)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

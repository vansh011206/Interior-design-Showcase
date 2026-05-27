"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function Footer({ onNavClick }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer
      style={{
        backgroundColor: "var(--text-primary)",
        color: "var(--bg-primary)",
        padding: "8rem 0 4rem 0",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="container">
        {/* Newsletter Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "600px",
            margin: "0 auto 8rem auto",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              letterSpacing: "0.2em",
              color: "var(--stone-taupe)",
              textTransform: "uppercase",
              marginBottom: "1.2rem",
            }}
          >
            JOURNAL & NEWSLETTER
          </span>
          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              lineHeight: "1.2",
              marginBottom: "1.5rem",
            }}
          >
            Stay Inspired
          </h2>
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--stone-taupe)",
              fontWeight: "300",
              lineHeight: "1.6",
              marginBottom: "3rem",
            }}
          >
            Receive curated design philosophies, architectural studies, 
            and exclusive previews of our boutique curations directly in your inbox.
          </p>

          {subscribed ? (
            <span style={{ fontSize: "0.9rem", color: "var(--stone-taupe)", fontWeight: "500" }}>
              ✓ Thank you for subscribing to DAROS Journal.
            </span>
          ) : (
            <form
              onSubmit={handleSubscribe}
              style={{
                display: "flex",
                width: "100%",
                borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                paddingBottom: "0.5rem",
              }}
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  fontSize: "0.95rem",
                  color: "var(--bg-primary)",
                  padding: "0.5rem 0",
                }}
              />
              <button
                type="submit"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  letterSpacing: "0.15em",
                  color: "var(--bg-primary)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.2rem",
                }}
              >
                SUBSCRIBE <ArrowUpRight size={14} />
              </button>
            </form>
          )}
        </div>

        {/* Separator */}
        <hr style={{ border: "none", borderTop: "1px solid rgba(255, 255, 255, 0.1)", marginBottom: "4rem" }} />

        {/* Main Footer Directory */}
        <div
          className="grid-4"
          style={{
            alignItems: "flex-start",
            marginBottom: "6rem",
          }}
        >
          {/* Logo & Description */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavClick("home");
              }}
              className="font-serif"
              style={{
                fontSize: "1.8rem",
                fontWeight: "700",
                letterSpacing: "0.15em",
              }}
            >
              DAROS
            </a>
            <p
              style={{
                fontSize: "0.8rem",
                color: "var(--stone-taupe)",
                fontWeight: "300",
                lineHeight: "1.6",
                maxWidth: "240px",
              }}
            >
              Exquisite spatial architectures tailored for sensory peace and contemporary modern living.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4
              style={{
                fontSize: "0.8rem",
                fontWeight: "600",
                letterSpacing: "0.1em",
                color: "var(--bg-primary)",
                marginBottom: "1.5rem",
              }}
            >
              STUDIO
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {["home", "portfolio", "categories", "boutique", "contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavClick(link);
                    }}
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--stone-taupe)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                    className="footer-link"
                  >
                    {link === "categories" ? "services" : link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Boutique Categories */}
          <div>
            <h4
              style={{
                fontSize: "0.8rem",
                fontWeight: "600",
                letterSpacing: "0.1em",
                color: "var(--bg-primary)",
                marginBottom: "1.5rem",
              }}
            >
              BOUTIQUE
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {["Oak Armchairs", "Minimalist Lamps", "Bouclé Sofas", "Ceramic Vases", "Textured Linens"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#boutique"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavClick("boutique");
                      }}
                      style={{ fontSize: "0.8rem", color: "var(--stone-taupe)" }}
                      className="footer-link"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4
              style={{
                fontSize: "0.8rem",
                fontWeight: "600",
                letterSpacing: "0.1em",
                color: "var(--bg-primary)",
                marginBottom: "1.5rem",
              }}
            >
              CONNECT
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {["Instagram", "Pinterest", "YouTube", "LinkedIn", "Houzz"].map((item) => (
                <li key={item}>
                  <a
                    href={`https://${item.toLowerCase()}.com`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: "0.8rem", color: "var(--stone-taupe)" }}
                    className="footer-link"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Separator */}
        <hr style={{ border: "none", borderTop: "1px solid rgba(255, 255, 255, 0.05)", marginBottom: "2.5rem" }} />

        {/* Copyright */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span style={{ fontSize: "0.75rem", color: "var(--stone-taupe)", fontWeight: "300" }}>
            © {new Date().getFullYear()} DAROS Studio. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "2rem" }}>
            <a href="#privacy" style={{ fontSize: "0.75rem", color: "var(--stone-taupe)", fontWeight: "300" }}>
              Privacy Policy
            </a>
            <a href="#terms" style={{ fontSize: "0.75rem", color: "var(--stone-taupe)", fontWeight: "300" }}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .footer-link:hover {
          color: var(--bg-primary) !important;
        }
      `}</style>
    </footer>
  );
}

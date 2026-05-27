"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePexelsImage } from "@/lib/usePexelsImage";

export default function Contact() {
  const { imageUrl: contactImage, loading: contactLoading } = usePexelsImage("luxury interior dining room sunlight");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    service: "Residential Design",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          service: "Residential Design",
          message: "",
        });
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Failed to submit request.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const services = [
    "Residential Design",
    "Commercial Interiors",
    "Bespoke Lighting Design",
    "Bespoke Furniture Curation",
    "Consultation & Art Direction",
  ];

  const labelStyle = {
    display: "block",
    fontSize: "10px",
    letterSpacing: "0.2em",
    color: "#9A8F82",
    textTransform: "uppercase",
    marginBottom: "6px",
  };

  const inputStyle = {
    width: "100%",
    border: "none",
    borderBottom: "1px solid #C8BFB0",
    background: "transparent",
    padding: "12px 0",
    fontSize: "13px",
    color: "#1A1A1A",
    borderRadius: 0,
    outline: "none",
    transition: "border-color 0.3s ease",
  };

  const selectStyle = {
    width: "100%",
    border: "none",
    borderBottom: "1px solid #C8BFB0",
    background: "transparent",
    padding: "12px 0",
    fontSize: "13px",
    color: "#1A1A1A",
    borderRadius: 0,
    outline: "none",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239A8F82'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right center",
    backgroundSize: "1rem",
    transition: "border-color 0.3s ease",
  };

  const textareaStyle = {
    width: "100%",
    border: "none",
    borderBottom: "1px solid #C8BFB0",
    background: "transparent",
    padding: "12px 0",
    fontSize: "13px",
    color: "#1A1A1A",
    borderRadius: 0,
    outline: "none",
    resize: "none",
    fontFamily: "inherit",
    transition: "border-color 0.3s ease",
  };

  return (
    <section
      id="contact"
      style={{
        padding: "9rem 0",
        backgroundColor: "#F5F0E8",
        borderTop: "1px solid rgba(214, 200, 190, 0.4)",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* Split Grid */}
        <div className="contact-split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "stretch" }}>
          
          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: "100%",
              height: "100%",
              minHeight: "650px",
              position: "relative",
              overflow: "hidden",
              borderRadius: "4px",
              boxShadow: "0 30px 60px rgba(0, 0, 0, 0.04)",
            }}
            className="contact-image-wrapper"
          >
            {contactLoading ? (
              <div className="pexels-skeleton" style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }} />
            ) : (
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.8 }}
                src={contactImage || ""}
                alt="DAROS Architectural Space"
                className="pexels-img-loaded"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
            )}
          </motion.div>

          {/* Right Column: Copy & Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* Tagline */}
            <span
              style={{
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.25em",
                color: "#9A8F82",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "1rem",
              }}
            >
              COLLABORATE WITH US
            </span>

            {/* Heading */}
            <h2
              className="contact-heading"
              style={{
                fontFamily: "var(--font-serif)",
                lineHeight: "1.2",
                color: "var(--text-primary)",
                marginBottom: "1.5rem",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Let's sculpt your</span> <br />
              <span style={{ fontStyle: "italic" }}>Ideal Sanctuary</span>
            </h2>

            {/* Thin rule */}
            <div
              style={{
                height: "1px",
                backgroundColor: "#C8BFB0",
                width: "60px",
                marginBottom: "1.5rem",
              }}
            />

            {/* Subtext */}
            <p
              style={{
                fontSize: "13px",
                color: "#9A8F82",
                marginBottom: "3rem",
              }}
            >
              Specify your vision. We translate it into space.
            </p>

            {/* Form Container */}
            <div style={{ position: "relative" }}>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      padding: "4rem 0",
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 250, delay: 0.2 }}
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        backgroundColor: "#1A1A1A",
                        color: "#F5F0E8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        marginBottom: "1.5rem",
                      }}
                    >
                      ✓
                    </motion.div>
                    <h3 className="font-serif" style={{ fontSize: "1.5rem", marginBottom: "0.8rem", color: "#1A1A1A" }}>
                      Inquiry Received
                    </h3>
                    <p style={{ fontSize: "13px", color: "#9A8F82", maxWidth: "340px", lineHeight: "1.6" }}>
                      Thank you. A senior interior design director from DAROS will contact you within 24 hours to schedule your session.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={handleSubmit}
                  >
                    {/* Names: Side by Side */}
                    <div className="names-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={labelStyle}>First Name</label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          style={inputStyle}
                          className="contact-input"
                          placeholder="e.g. John"
                        />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={labelStyle}>Last Name</label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          style={inputStyle}
                          className="contact-input"
                          placeholder="e.g. Doe"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div style={{ display: "flex", flexDirection: "column", marginBottom: "2rem" }}>
                      <label style={labelStyle}>Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={inputStyle}
                        className="contact-input"
                        placeholder="e.g. john@example.com"
                      />
                    </div>

                    {/* Select Service */}
                    {/* Custom Dropdown for Service Selection */}
                    <div
                      ref={dropdownRef}
                      style={{ display: "flex", flexDirection: "column", marginBottom: "2rem", position: "relative" }}
                    >
                      <label style={labelStyle}>Select Service</label>
                      
                      {/* Hidden Native Select for Accessibility / Tests */}
                      <select
                        value={formData.service}
                        onChange={(e) => {
                          setFormData({ ...formData, service: e.target.value });
                          setHasSelected(true);
                        }}
                        style={{
                          position: "absolute",
                          opacity: 0,
                          width: 0,
                          height: 0,
                          zIndex: -1,
                          pointerEvents: "none"
                        }}
                        tabIndex={-1}
                      >
                        {services.map((svc) => (
                          <option key={svc} value={svc}>
                            {svc}
                          </option>
                        ))}
                      </select>

                      {/* Custom Trigger */}
                      <div
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px 0",
                          borderBottom: hasSelected ? "1px solid #1A1A1A" : "1px solid #C8BFB0",
                          cursor: "pointer",
                          fontSize: "13px",
                          color: "#1A1A1A",
                          letterSpacing: "0.05em",
                          userSelect: "none",
                          transition: "border-color 0.3s ease",
                        }}
                      >
                        <span>{formData.service}</span>
                        <svg
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                            flexShrink: 0
                          }}
                        >
                          <path d="M1 1L5 5L9 1" stroke="#9A8F82" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>

                      {/* Custom Options List */}
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.ul
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            style={{
                              position: "absolute",
                              top: "calc(100% + 5px)",
                              left: 0,
                              right: 0,
                              backgroundColor: "#F5F0E8",
                              border: "1px solid #C8BFB0",
                              boxShadow: "0 8px 32px rgba(20, 16, 12, 0.08)",
                              zIndex: 100,
                              listStyle: "none",
                              padding: 0,
                              margin: 0,
                              overflow: "hidden",
                            }}
                          >
                            {services.map((svc, idx) => {
                              const isSelected = formData.service === svc;
                              return (
                                <React.Fragment key={svc}>
                                  <li
                                    onClick={() => {
                                      setFormData({ ...formData, service: svc });
                                      setHasSelected(true);
                                      setIsDropdownOpen(false);
                                    }}
                                    className="custom-dropdown-option"
                                    style={{
                                      fontSize: "13px",
                                      color: isSelected ? "#9A8F82" : "#1A1A1A",
                                      letterSpacing: "0.03em",
                                      padding: "14px 20px",
                                      cursor: "pointer",
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      backgroundColor: "transparent",
                                      transition: "background-color 0.2s ease, color 0.2s ease",
                                    }}
                                  >
                                    <span>{svc}</span>
                                    {isSelected && (
                                      <span style={{ color: "#C8BFB0", fontSize: "14px", fontWeight: "bold" }}>✓</span>
                                    )}
                                  </li>
                                  {idx < services.length - 1 && (
                                    <div style={{ height: "1px", backgroundColor: "#EFE9DF", width: "100%" }} />
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>

                      <style dangerouslySetInnerHTML={{ __html: `
                        .custom-dropdown-option:hover {
                          background-color: #EFE9DF !important;
                          color: #1A1A1A !important;
                        }
                      ` }} />
                    </div>

                    {/* Project Description */}
                    <div style={{ display: "flex", flexDirection: "column", marginBottom: "3rem" }}>
                      <label style={labelStyle}>Project Description</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        style={textareaStyle}
                        className="contact-input"
                        placeholder="Tell us about your space, dimensions, or design references..."
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      disabled={submitting}
                      whileHover={{ scale: 1.01, backgroundColor: "#2b2b2b" }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      style={{
                        width: "100%",
                        background: "#1A1A1A",
                        color: "#F5F0E8",
                        padding: "18px",
                        border: "none",
                        borderRadius: 0,
                        fontSize: "11px",
                        letterSpacing: "0.25em",
                        fontWeight: "500",
                        cursor: submitting ? "not-allowed" : "pointer",
                        textTransform: "uppercase",
                        transition: "background-color 0.25s ease",
                        opacity: submitting ? 0.7 : 1,
                      }}
                    >
                      {submitting ? "SENDING INQUIRY..." : "BEGIN YOUR PROJECT"}
                    </motion.button>
                    {errorMsg && (
                      <div style={{ color: "#E53E3E", fontSize: "12px", marginTop: "1rem", letterSpacing: "0.05em", textAlign: "center" }}>
                        {errorMsg}
                      </div>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* 3 Column Info Strip */}
        <div
          className="info-strip"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr auto 1fr",
            alignItems: "center",
            marginTop: "80px",
            gap: "1.5rem",
          }}
        >
          {/* Column 1 */}
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#9A8F82", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
              STUDIO
            </span>
            <span style={{ fontSize: "13px", color: "#1A1A1A" }}>
              Suite 840, Avenue Montaigne, Paris
            </span>
          </div>

          {/* Divider 1 */}
          <div className="info-strip-divider" style={{ width: "1px", height: "40px", backgroundColor: "#C8BFB0" }} />

          {/* Column 2 */}
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#9A8F82", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
              EMAIL
            </span>
            <a href="mailto:design@darosstudio.com" style={{ fontSize: "13px", color: "#1A1A1A" }}>
              design@darosstudio.com
            </a>
          </div>

          {/* Divider 2 */}
          <div className="info-strip-divider" style={{ width: "1px", height: "40px", backgroundColor: "#C8BFB0" }} />

          {/* Column 3 */}
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#9A8F82", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
              ENQUIRIES
            </span>
            <span style={{ fontSize: "13px", color: "#1A1A1A" }}>
              Mon – Fri, 9am – 6pm CET
            </span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .contact-heading {
          font-size: 52px;
        }
        .contact-input::placeholder {
          color: #C8BFB0;
          font-size: 13px;
        }
        .contact-input:focus {
          border-bottom-color: #1A1A1A !important;
        }
        @media (max-width: 1024px) {
          .contact-split-grid {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
          .contact-image-wrapper {
            min-height: 400px !important;
            height: 400px !important;
          }
        }
        @media (max-width: 768px) {
          .info-strip {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .info-strip-divider {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .names-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .contact-heading {
            font-size: 40px !important;
          }
        }
      ` }} />
    </section>
  );
}

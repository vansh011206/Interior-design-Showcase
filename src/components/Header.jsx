"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SEARCHABLE_ITEMS = [
  // PORTFOLIO
  {
    title: "Arched Serenity Lounge",
    url: "/portfolio/arched-serenity-lounge",
    section: "PORTFOLIO",
    keywords: ["arch", "lounge", "moroccan", "living", "room", "serenity"]
  },
  {
    title: "Shadow Cast Dining Hall",
    url: "/portfolio/shadow-cast-dining-hall",
    section: "PORTFOLIO",
    keywords: ["dining", "hall", "shadow", "cast", "kitchen", "provence"]
  },
  {
    title: "Luminous Reading Salon",
    url: "/portfolio/luminous-reading-salon",
    section: "PORTFOLIO",
    keywords: ["reading", "salon", "luminous", "study", "library", "london", "book"]
  },
  {
    title: "Nordic Forest Bedroom",
    url: "/portfolio/nordic-forest-bedroom",
    section: "PORTFOLIO",
    keywords: ["nordic", "forest", "bedroom", "oslo", "bed", "sleep"]
  },
  // SERVICES
  {
    title: "Minimalist Bathrooms",
    url: "/services/minimalist-bathrooms",
    section: "SERVICES",
    keywords: ["bathrooms", "minimalist", "stone", "wellness", "sanctuary"]
  },
  {
    title: "Bespoke Seating",
    url: "/services/bespoke-seating",
    section: "SERVICES",
    keywords: ["bespoke", "seating", "sofa", "chair", "furniture"]
  },
  {
    title: "Lighting Solutions",
    url: "/services/lighting-solutions",
    section: "SERVICES",
    keywords: ["lighting", "solutions", "ambient", "luminescence", "light"]
  },
  {
    title: "Sophisticated Bedrooms",
    url: "/services/sophisticated-bedrooms",
    section: "SERVICES",
    keywords: ["sophisticated", "bedrooms", "restful", "habitats", "bed", "sleep"]
  },
  // BOUTIQUE
  {
    title: "Solitude Oak Armchair",
    url: "/boutique/solitude-oak-armchair",
    section: "BOUTIQUE",
    keywords: ["solitude", "oak", "armchair", "seating", "chair", "furniture"]
  },
  {
    title: "Linear Brass Desk Lamp",
    url: "/boutique/linear-brass-desk-lamp",
    section: "BOUTIQUE",
    keywords: ["linear", "brass", "desk", "lamp", "lighting", "light"]
  },
  {
    title: "Organic Bouclé Chair",
    url: "/boutique/organic-boucle-chair",
    section: "BOUTIQUE",
    keywords: ["organic", "boucle", "chair", "seating", "furniture"]
  },
  {
    title: "Ceramic Arch Vase",
    url: "/boutique/ceramic-arch-vase",
    section: "BOUTIQUE",
    keywords: ["ceramic", "arch", "vase", "decor", "pieces"]
  }
];

export default function Header({ activeSection, onNavClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Focus input field automatically when search opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Global key listener for Escape key to close the search drawer / mobile menu
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === "Escape") {
        if (isSearchOpen) {
          setIsSearchOpen(false);
          setSearchQuery("");
        }
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isSearchOpen, isMobileMenuOpen]);

  const navItems = [
    { id: "home", label: "HOME" },
    { id: "portfolio", label: "PORTFOLIO" },
    { id: "categories", label: "SERVICES" },
    { id: "boutique", label: "BOUTIQUE" },
    { id: "contact", label: "CONTACT" },
  ];

  const getFilteredItems = () => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return [];
    return SEARCHABLE_ITEMS.filter((item) => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.section.toLowerCase().includes(query) ||
        item.keywords.some((kw) => kw.toLowerCase().includes(query))
      );
    });
  };

  const filteredItems = getFilteredItems();
  const portfolioResults = filteredItems.filter((item) => item.section === "PORTFOLIO");
  const servicesResults = filteredItems.filter((item) => item.section === "SERVICES");
  const boutiqueResults = filteredItems.filter((item) => item.section === "BOUTIQUE");

  const handleResultClick = (url) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    window.location.href = url;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsSearchOpen(false);
      setSearchQuery("");
    } else if (e.key === "Enter") {
      if (filteredItems.length > 0) {
        handleResultClick(filteredItems[0].url);
      }
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery("");
      setIsMobileMenuOpen(false); // Close mobile menu when search opens
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="glass-header"
      style={{
        padding: isScrolled ? "0.6rem 0" : "1.1rem 0",
        boxShadow: isScrolled
          ? "0 10px 40px rgba(26, 26, 26, 0.05)"
          : "none",
        borderBottom: isScrolled
          ? "1px solid rgba(212, 200, 190, 0.4)"
          : "1px solid rgba(212, 200, 190, 0.2)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <motion.a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavClick("home");
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            fontSize: "1.6rem",
            letterSpacing: "0.15em",
            fontWeight: "800",
            textTransform: "uppercase",
            fontFamily: "var(--font-serif)",
            display: "inline-block",
            color: "var(--text-primary)",
          }}
        >
          DAROS
        </motion.a>

        {/* Navigation (Desktop only) */}
        <nav className="desktop-nav" style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick(item.id);
                }}
                style={{
                  fontSize: "0.75rem",
                  fontWeight: "500",
                  letterSpacing: "0.12em",
                  color: isActive ? "var(--text-primary)" : "var(--earth-clay)",
                  position: "relative",
                  padding: "0.4rem 0",
                  display: "inline-block",
                }}
              >
                <motion.span
                  whileHover={{ color: "var(--text-primary)" }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "1.5px",
                      backgroundColor: "var(--text-primary)",
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Icons (Search + Hamburger menu for mobile) */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <motion.button
            onClick={toggleSearch}
            whileHover={{ scale: 1.12, y: -1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Search"
            style={{
              cursor: "pointer",
              color: "var(--text-primary)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Search size={18} strokeWidth={1.5} />
          </motion.button>

          <button
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setIsSearchOpen(false); // Close search when mobile menu toggles
            }}
            className="mobile-menu-btn"
            style={{
              cursor: "pointer",
              color: "var(--text-primary)",
              display: "none",
              alignItems: "center",
              background: "none",
              border: "none",
            }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              width: "100%",
              backgroundColor: "#F5F0E8",
              borderBottom: "1px solid #C8BFB0",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center" }}>
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    onNavClick(item.id);
                  }}
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    letterSpacing: "0.15em",
                    color: "var(--text-primary)",
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Bar Slide-Down Panel */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              width: "100%",
              backgroundColor: "#F5F0E8",
              borderBottom: "1px solid #C8BFB0",
              overflow: "visible",
            }}
          >
            <div className="container search-container" style={{ position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", width: "100%", gap: "1rem" }}>
                <Search size={18} color="#9A8F82" strokeWidth={1.5} style={{ flexShrink: 0 }} />
                
                <div style={{ position: "relative", flexGrow: 1 }}>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search spaces, services, pieces..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{
                      width: "100%",
                      fontSize: "16px",
                      letterSpacing: "0.05em",
                      color: "#1A1A1A",
                      border: "none",
                      background: "transparent",
                      outline: "none",
                      padding: "0.4rem 0",
                    }}
                    className="search-input"
                  />

                  {/* Live Recommendations Dropdown */}
                  {searchQuery.trim().length > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        backgroundColor: "#F5F0E8",
                        border: "1px solid #C8BFB0",
                        maxHeight: "400px",
                        overflowY: "auto",
                        zIndex: 1000,
                        boxShadow: "0 10px 35px rgba(26,26,26,0.08)",
                      }}
                      className="search-results-dropdown"
                    >
                      {filteredItems.length === 0 ? (
                        <div
                          style={{
                            color: "#9A8F82",
                            fontSize: "13px",
                            padding: "20px",
                            textAlign: "center",
                          }}
                        >
                          No results found for &apos;{searchQuery}&apos;
                        </div>
                      ) : (
                        <>
                          {/* PORTFOLIO SECTION */}
                          {portfolioResults.length > 0 && (
                            <div>
                              <div className="search-category-label">PORTFOLIO</div>
                              {portfolioResults.map((item) => (
                                <div
                                  key={item.url}
                                  onClick={() => handleResultClick(item.url)}
                                  className="search-result-item"
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "13px",
                                    color: "#1A1A1A",
                                    padding: "10px 20px",
                                    transition: "background 0.2s ease",
                                  }}
                                >
                                  {item.title}
                                </div>
                              ))}
                            </div>
                          )}

                          {portfolioResults.length > 0 && (servicesResults.length > 0 || boutiqueResults.length > 0) && (
                            <div style={{ height: "1px", backgroundColor: "#C8BFB0" }} />
                          )}

                          {/* SERVICES SECTION */}
                          {servicesResults.length > 0 && (
                            <div>
                              <div className="search-category-label">SERVICES</div>
                              {servicesResults.map((item) => (
                                <div
                                  key={item.url}
                                  onClick={() => handleResultClick(item.url)}
                                  className="search-result-item"
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "13px",
                                    color: "#1A1A1A",
                                    padding: "10px 20px",
                                    transition: "background 0.2s ease",
                                  }}
                                >
                                  {item.title}
                                </div>
                              ))}
                            </div>
                          )}

                          {servicesResults.length > 0 && boutiqueResults.length > 0 && (
                            <div style={{ height: "1px", backgroundColor: "#C8BFB0" }} />
                          )}

                          {/* BOUTIQUE SECTION */}
                          {boutiqueResults.length > 0 && (
                            <div>
                              <div className="search-category-label">BOUTIQUE</div>
                              {boutiqueResults.map((item) => (
                                <div
                                  key={item.url}
                                  onClick={() => handleResultClick(item.url)}
                                  className="search-result-item"
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "13px",
                                    color: "#1A1A1A",
                                    padding: "10px 20px",
                                    transition: "background 0.2s ease",
                                  }}
                                >
                                  {item.title}
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                  style={{
                    cursor: "pointer",
                    fontSize: "16px",
                    color: "#1A1A1A",
                    marginLeft: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30px",
                    height: "30px",
                    flexShrink: 0,
                  }}
                  aria-label="Close search"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
              .search-input::placeholder {
                color: #9A8F82 !important;
                opacity: 1;
              }
              .search-category-label {
                font-size: 10px;
                letter-spacing: 0.25em;
                color: #9A8F82;
                padding: 12px 20px 6px;
                font-weight: 600;
              }
              .search-result-item:hover {
                background-color: #EFE9DF !important;
              }
            ` }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Categories from "@/components/Categories";
import Luminous from "@/components/Luminous";
import CuratedShop from "@/components/CuratedShop";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  // Scroll handler to track active section in navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "portfolio", "categories", "boutique", "contact"];
      const scrollPosition = window.scrollY + 250; // offset for triggers

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Sticky Premium Header */}
      <Header activeSection={activeSection} onNavClick={handleNavClick} />

      {/* Main Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onExploreClick={() => handleNavClick("portfolio")}
          onBookClick={() => handleNavClick("contact")}
        />

        {/* Portfolio Gallery Section */}
        <Portfolio />

        {/* Services / Categories Grid */}
        <Categories onExploreClick={() => handleNavClick("portfolio")} />

        {/* Luminous Lighting Editorial Section */}
        <Luminous onDiscoverClick={() => handleNavClick("portfolio")} />

        {/* Boutique E-Commerce Curations */}
        <CuratedShop />

        {/* Contact Form Section */}
        <Contact />
      </main>

      {/* Elegant Dark Footer */}
      <Footer onNavClick={handleNavClick} />
    </>
  );
}

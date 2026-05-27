"use client";

import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Categories from "@/components/Categories";
import Luminous from "@/components/Luminous";
import CuratedShop from "@/components/CuratedShop";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  // Scroll handler to track active section in navigation
  useEffect(() => {
    // Fade page in on mount
    gsap.fromTo("main",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

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

    // Smooth scroll to hash on load
    if (window.location.hash) {
      const hash = window.location.hash;
      const targetId = hash.replace("#", "");
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: el, offsetY: 70 },
            ease: "power3.inOut"
          });
        }, 100);
      }
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: el, offsetY: 70 },
        ease: "power3.inOut"
      });
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

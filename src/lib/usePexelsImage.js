"use client";

import { useState, useEffect } from "react";

const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

/**
 * Fetch a single Pexels image by query.
 * Returns the large2x src URL or fallback.
 */
export function usePexelsImage(query, orientation = "landscape") {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchImage() {
      try {
        const res = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=${orientation}`,
          { headers: { Authorization: PEXELS_API_KEY } }
        );
        const data = await res.json();
        if (!cancelled && data.photos && data.photos.length > 0) {
          setImageUrl(data.photos[0].src.large2x);
        }
      } catch (err) {
        console.error("Pexels fetch error:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchImage();
    return () => { cancelled = true; };
  }, [query, orientation]);

  return { imageUrl, loading };
}

/**
 * Fetch multiple Pexels images by query.
 * Returns an array of large2x src URLs.
 */
export function usePexelsImages(query, count = 4, orientation = "landscape") {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchImages() {
      try {
        const res = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}&orientation=${orientation}`,
          { headers: { Authorization: PEXELS_API_KEY } }
        );
        const data = await res.json();
        if (!cancelled && data.photos && data.photos.length > 0) {
          setImageUrls(data.photos.map((p) => p.src.large2x));
        }
      } catch (err) {
        console.error("Pexels fetch error:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchImages();
    return () => { cancelled = true; };
  }, [query, count, orientation]);

  return { imageUrls, loading };
}

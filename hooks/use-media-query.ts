"use client"

import { useState, useEffect } from "react"

/**
 * Custom hook to detect if a media query matches
 * @param query CSS media query to match against
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  
  useEffect(() => {
    // Default to true if SSR and no window object
    if (typeof window === "undefined") return
    
    const media = window.matchMedia(query)
    
    // Set the initial value
    setMatches(media.matches)
    
    // Define listener function
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }
    
    // Add the listener
    media.addEventListener("change", listener)
    
    // Clean up
    return () => {
      media.removeEventListener("change", listener)
    }
  }, [query])
  
  return matches
} 
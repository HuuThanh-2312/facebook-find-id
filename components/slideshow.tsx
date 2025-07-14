"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef } from "react"

interface SlideshowProps {
  images: { src: string; alt: string; href?: string }[]
  interval?: number // in milliseconds, default to 6000ms (6 seconds)
  className?: string
}

export function Slideshow({ images, interval = 6000, className }: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Responsive width/height
  const slideWidth = 840;

  const [slideWidthPx, setSlideWidthPx] = useState(slideWidth)
  const slideRef = useRef<HTMLDivElement>(null)

  // Cập nhật slideWidthPx khi resize
  useEffect(() => {
    function updateWidth() {
      if (slideRef.current) {
        setSlideWidthPx(slideRef.current.offsetWidth)
      }
    }
    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  // Auto-play logic
  useEffect(() => {
    if (images.length === 0) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer) // Cleanup on unmount
  }, [images.length, interval])

  // Manual navigation functions
  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }, [images.length])

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [images.length])

  if (!images || images.length === 0) {
    return null // Don't render if no images
  }

  // Responsive: width 100vw (max 840px), height tự động theo tỉ lệ
  // Sử dụng style inline và tailwind cho mobile
  return (
    <div className={`relative w-full max-w-[840px] md:h-[146px] h-[80px] md:max-w-[840px] max-w-[600px] overflow-hidden mx-auto bg-white ${className || ''}`}>
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{
          transform: `translateX(-${currentIndex * slideWidthPx}px)`,
          width: `${images.length * slideWidthPx}px`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={image.src}
            ref={index === 0 ? slideRef : undefined}
            className="flex-shrink-0 flex items-center justify-center bg-white relative"
            style={{ width: '93vw', maxWidth: 840, height: '100%' }}
          >
            {image.href ? (
              <a href={image.href} target="_blank" rel="noopener noreferrer" className="w-full h-full block">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 840px) 90vw, 840px"
                  priority={index === 0}
                />
              </a>
            ) : (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 840px) 90vw, 840px"
                priority={index === 0}
              />
            )}
          </div>
        ))}
      </div>

      {/* Navigation buttons - nhỏ gọn, responsive */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-1 top-1/2 -translate-y-1/2 z-20 p-1 h-7 w-7 bg-black/10 hover:bg-black/20 rounded-md md:left-2"
        onClick={handlePrev}
        aria-label="Previous image"
      >
        <ChevronLeft className="h-4 w-4 text-white" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1/2 -translate-y-1/2 z-20 p-1 h-7 w-7 bg-black/10 hover:bg-black/20 rounded-md md:right-2"
        onClick={handleNext}
        aria-label="Next image"
      >
        <ChevronRight className="h-4 w-4 text-white" />
      </Button>
    </div>
  )
} 
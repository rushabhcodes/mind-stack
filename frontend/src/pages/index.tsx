import { useState, useEffect, useRef } from "react";
import HeroSection from "../components/landing/HeroSection";
import FeaturesCarousel from "../components/landing/FeaturesCarousel";
import FeedbackForm from "../components/landing/FeedbackForm";
import Navigation from "../components/landing/Navigation";
import Footer from "../components/landing/Footer";
import SlideControls from "../components/landing/SlideControls";

function LandingPage() {
  const [slide, setSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTimeRef = useRef(0);

  const totalSlides = 3;

  // Handle scroll events for slide navigation
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      
      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTimeRef.current;
      
      // Throttle scroll events to prevent too rapid changes
      if (timeSinceLastScroll < 100) return;
      
      lastScrollTimeRef.current = now;
      
      if (isScrolling) return;
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      const delta = e.deltaY;
      
      if (delta > 0) {
        // Scrolling down - next slide
        e.preventDefault(); // Prevent default scrolling behavior
        setSlide((prevSlide) => {
          const newSlide = Math.min(totalSlides - 1, prevSlide + 1);
          if (newSlide !== prevSlide) {
            setIsScrolling(true);
            scrollTimeoutRef.current = setTimeout(() => {
              setIsScrolling(false);
            }, 700);
          }
          return newSlide;
        });
      } else {
        // Scrolling up - previous slide
        e.preventDefault(); // Prevent default scrolling behavior
        setSlide((prevSlide) => {
          const newSlide = Math.max(0, prevSlide - 1);
          if (newSlide !== prevSlide) {
            setIsScrolling(true);
            scrollTimeoutRef.current = setTimeout(() => {
              setIsScrolling(false);
            }, 700);
          }
          return newSlide;
        });
      }
    };

    // Add wheel event listener with passive: false to allow preventDefault
    window.addEventListener('wheel', handleScroll, { passive: false });
    
    // Handle touch events for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      const threshold = 50; // Minimum swipe distance
      
      if (Math.abs(deltaY) > threshold && !isScrolling) {
        if (deltaY > 0) {
          // Swipe up - next slide
          setSlide((prevSlide) => {
            const newSlide = Math.min(totalSlides - 1, prevSlide + 1);
            if (newSlide !== prevSlide) {
              setIsScrolling(true);
              setTimeout(() => setIsScrolling(false), 700);
            }
            return newSlide;
          });
        } else {
          // Swipe down - previous slide
          setSlide((prevSlide) => {
            const newSlide = Math.max(0, prevSlide - 1);
            if (newSlide !== prevSlide) {
              setIsScrolling(true);
              setTimeout(() => setIsScrolling(false), 700);
            }
            return newSlide;
          });
        }
      }
    };
    
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    
    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isScrolling]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        setSlide((prevSlide) => {
          const newSlide = Math.min(totalSlides - 1, prevSlide + 1);
          if (newSlide !== prevSlide) {
            setIsScrolling(true);
            setTimeout(() => setIsScrolling(false), 700);
          }
          return newSlide;
        });
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setSlide((prevSlide) => {
          const newSlide = Math.max(0, prevSlide - 1);
          if (newSlide !== prevSlide) {
            setIsScrolling(true);
            setTimeout(() => setIsScrolling(false), 700);
          }
          return newSlide;
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isScrolling]);

  const handleSlideChange = (newSlide: number) => {
    if (newSlide !== slide && !isScrolling) {
      setSlide(newSlide);
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 700);
    }
  };

  const slides = [
    <HeroSection key="hero" isActive={slide === 0} />,
    <FeaturesCarousel key="features" isActive={slide === 1} />,
    <FeedbackForm key="feedback" isActive={slide === 2} />,
  ];

  return (
    <div className="w-screen h-screen overflow-hidden font-sans">
      <Navigation />
      
      {/* Horizontal Slides */}
      <div
        className="flex flex-row h-screen transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          width: `${slides.length * 100}vw`,
          transform: `translateX(-${slide * 100}vw)`,
        }}
      >
        {slides}
      </div>
      
      <SlideControls 
        slide={slide}
        isScrolling={isScrolling}
        onSlideChange={handleSlideChange}
        totalSlides={totalSlides}
      />
      
      <Footer />
    </div>
  );
}

export default LandingPage;

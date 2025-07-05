import React, { useState, useEffect, useRef } from "react";
import { LogIn, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fadeInSlide = (active: boolean) => ({
  opacity: active ? 1 : 0,
  transform: active ? "scale(1) translateY(0)" : "scale(0.98) translateY(40px)",
  transition:
    "opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)",
});

const features = [
  {
    icon: "🔗",
    title: "Save Any Link",
    description:
      "Store YouTube videos, Twitter threads, articles, and any web content in one click. Beautiful previews and instant access.",
    color: "#3b82f6",
  },
  {
    icon: "📝",
    title: "Quick Notes",
    description:
      "Jot down thoughts, ideas, and reminders with rich formatting and instant search. Never lose an idea again.",
    color: "#06b6d4",
  },
  {
    icon: "🏷️",
    title: "Organize Effortlessly",
    description:
      "Auto-categorize your content with tags, collections, and powerful filters. Find what you need, fast.",
    color: "#8b5cf6",
  },
  {
    icon: "🔄",
    title: "Sync Everywhere",
    description:
      "Access your content anywhere, anytime. Perfect sync across all devices with offline support.",
    color: "#10b981",
  },
];

function LandingPage() {
  const [slide, setSlide] = useState(0);
  const [featureIndex, setFeatureIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTimeRef = useRef(0);
  const navigate = useNavigate();

  // Handle scroll events for slide navigation
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      
      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTimeRef.current;
      
      // Throttle scroll events to prevent too rapid changes
      if (timeSinceLastScroll < 50) return;
      
      lastScrollTimeRef.current = now;
      
      if (isScrolling) return;
      
      setIsScrolling(true);
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      const delta = e.deltaY;
      const totalSlides = 3; // Total number of slides
      
      if (delta > 0) {
        // Scrolling down - next slide
        setSlide((prevSlide) => Math.min(totalSlides - 1, prevSlide + 1));
      } else {
        // Scrolling up - previous slide
        setSlide((prevSlide) => Math.max(0, prevSlide - 1));
      }
      
      // Reset scrolling flag after animation completes
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 800); // Match the transition duration
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
        setIsScrolling(true);
        
        const totalSlides = 3;
        
        if (deltaY > 0) {
          // Swipe up - next slide
          setSlide((prevSlide) => Math.min(totalSlides - 1, prevSlide + 1));
        } else {
          // Swipe down - previous slide
          setSlide((prevSlide) => Math.max(0, prevSlide - 1));
        }
        
        setTimeout(() => {
          setIsScrolling(false);
        }, 800);
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
      
      const totalSlides = 3;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        setSlide((prevSlide) => Math.min(totalSlides - 1, prevSlide + 1));
        setIsScrolling(true);
        setTimeout(() => setIsScrolling(false), 800);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setSlide((prevSlide) => Math.max(0, prevSlide - 1));
        setIsScrolling(true);
        setTimeout(() => setIsScrolling(false), 800);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isScrolling]);

  const slides = [
    <div
      key="hero"
      style={{
        minWidth: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
        position: "relative",
        textAlign: "center",
        padding: 32,
        boxSizing: "border-box",
        overflow: "hidden",
        ...fadeInSlide(slide === 0),
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <svg
          width="100%"
          height="100%"
          style={{ position: "absolute", left: 0, top: 0, opacity: 0.08 }}
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#6366f1"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div
          style={{
            position: "absolute",
            left: "15%",
            top: "25%",
            width: 18,
            height: 18,
            background: "linear-gradient(135deg, #6366f1 0%, #a5b4fc 100%)",
            borderRadius: "50%",
            opacity: 0.7,
            animation: "moveObj1 2.5s ease-in-out infinite alternate",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "70%",
            top: "60%",
            width: 12,
            height: 12,
            background: "linear-gradient(135deg, #38bdf8 0%, #a5b4fc 100%)",
            borderRadius: "50%",
            opacity: 0.6,
            animation: "moveObj2 2s ease-in-out infinite alternate",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "80%",
            top: "18%",
            width: 14,
            height: 14,
            background: "linear-gradient(135deg, #a5b4fc 0%, #6366f1 100%)",
            borderRadius: "50%",
            opacity: 0.5,
            animation: "moveObj3 2.8s ease-in-out infinite alternate",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "30%",
            top: "75%",
            width: 10,
            height: 10,
            background: "linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)",
            borderRadius: "50%",
            opacity: 0.5,
            animation: "moveObj4 2.2s ease-in-out infinite alternate",
          }}
        />
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <h1
          style={{
            fontSize: "clamp(2.8rem, 8vw, 4.5rem)",
            fontWeight: 900,
            margin: "0 0 32px",
            color: "#1e293b",
            letterSpacing: "-2px",
            lineHeight: 1.1,
          }}
        >
          Save, Organize &<br />
          <span
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #38bdf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Remember Everything
          </span>
        </h1>
        <p
          style={{
            fontSize: "22px",
            color: "#64748b",
            maxWidth: "650px",
            margin: "0 auto 48px",
            lineHeight: 1.6,
            fontWeight: "400",
          }}
        >
          The most elegant way to save links, videos, tweets, and notes.
          <br />
          Your digital brain—always organized, always accessible.
        </p>
        <button
          style={{
            background: "linear-gradient(90deg, #6366f1 0%, #38bdf8 100%)",
            color: "#fff",
            padding: "14px 36px",
            borderRadius: "12px",
            fontSize: "18px",
            fontWeight: 700,
            border: "none",
            boxShadow: "0 6px 24px rgba(99,102,241,0.18)",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            transition: "transform 0.18s, box-shadow 0.18s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              "scale(1.06)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 12px 36px rgba(99,102,241,0.22)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 6px 24px rgba(99,102,241,0.18)";
          }}
           onClick={() => navigate("/signin")}
        >
          Let's Start <ArrowRight size={22} />
        </button>
      </div>
      <style>
        {`
        @keyframes moveObj1 {
          0% { transform: translate(0, 0) scale(1);}
          100% { transform: translate(40px, -30px) scale(1.2);}
        }
        @keyframes moveObj2 {
          0% { transform: translate(0, 0) scale(1);}
          100% { transform: translate(-30px, 30px) scale(1.3);}
        }
        @keyframes moveObj3 {
          0% { transform: translate(0, 0) scale(1);}
          100% { transform: translate(-20px, 40px) scale(1.1);}
        }
        @keyframes moveObj4 {
          0% { transform: translate(0, 0) scale(1);}
          100% { transform: translate(30px, -20px) scale(1.25);}
        }
        `}
      </style>
    </div>,
    // Features Slide with larger and faster background animation
    <div
      key="features"
      style={{
        minWidth: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
        padding: 32,
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        ...fadeInSlide(slide === 1),
      }}
    >
      {/* Animated gradient bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 8,
          background:
            "linear-gradient(270deg, #6366f1, #38bdf8, #06b6d4, #6366f1)",
          backgroundSize: "600% 600%",
          animation: "gradientBar 3s ease-in-out infinite", // faster
          zIndex: 1,
          opacity: 0.7,
        }}
      />
      {/* Larger and even faster animated background objects */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          filter: "blur(24px)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "5%",
            top: "10%",
            width: 180,
            height: 180,
            background: "linear-gradient(135deg, #6366f1 0%, #a5b4fc 100%)",
            borderRadius: "50%",
            opacity: 0.22,
            animation: "whyObj1 0.8s ease-in-out infinite alternate",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "70%",
            top: "10%",
            width: 120,
            height: 120,
            background: "linear-gradient(135deg, #38bdf8 0%, #a5b4fc 100%)",
            borderRadius: "50%",
            opacity: 0.18,
            animation: "whyObj2 0.65s ease-in-out infinite alternate",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "60%",
            top: "65%",
            width: 140,
            height: 140,
            background: "linear-gradient(135deg, #06b6d4 0%, #38bdf8 100%)",
            borderRadius: "50%",
            opacity: 0.15,
            animation: "whyObj3 0.95s ease-in-out infinite alternate",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "25%",
            top: "80%",
            width: 80,
            height: 80,
            background: "linear-gradient(135deg, #6366f1 0%, #38bdf8 100%)",
            borderRadius: "50%",
            opacity: 0.15,
            animation: "whyObj4 0.5s ease-in-out infinite alternate",
          }}
        />
      </div>
      <h2
        style={{
          fontSize: "42px",
          fontWeight: "800",
          color: "#1e293b",
          marginBottom: "40px",
          letterSpacing: "-1px",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        Why Mind Stack?
      </h2>
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 600,
          height: 280,
          margin: "0 auto",
          zIndex: 2,
        }}
      >
        {/* Card Carousel */}
        <div
          onScroll={() =>
            setFeatureIndex((i) => Math.min(features.length - 1, i + 1))
          }
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: "100%",
            justifyContent: "center",
          }}
        >
          {features.map((feature, idx) => {
            if (
              idx === featureIndex ||
              idx === featureIndex - 1 ||
              idx === featureIndex + 1
            ) {
              const scale = idx === featureIndex ? 1 : 0.85;
              const blur = idx === featureIndex ? "0px" : "2px";
              const zIndex = idx === featureIndex ? 2 : 1;
              const translateX = (idx - featureIndex) * 220;
              const opacity = idx === featureIndex ? 1 : 0.6;
              return (
                <div
                  key={idx}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
                    transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
                    filter: `blur(${blur})`,
                    zIndex,
                    opacity,
                    width: 320,
                    background: "white",
                    borderRadius: "24px",
                    padding: "40px 32px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    border: "1px solid #e2e8f0",
                    boxShadow:
                      idx === featureIndex
                        ? "0 8px 32px rgba(59,130,246,0.13)"
                        : "0 2px 12px rgba(59,130,246,0.07)",
                    textAlign: "center",
                    pointerEvents: idx === featureIndex ? "auto" : "none",
                  }}
                >
                  <div
                    style={{
                      fontSize: "48px",
                      marginBottom: "18px",
                      background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}25)`,
                      borderRadius: "16px",
                      padding: "18px",
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "22px",
                      fontWeight: "800",
                      color: "#1e293b",
                      margin: "0 0 14px",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      color: "#64748b",
                      lineHeight: 1.6,
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              );
            }
            return null;
          })}
        </div>
        {/* Carousel Arrows */}
        <button
          aria-label="Previous Feature"
          onClick={() => setFeatureIndex((i) => Math.max(0, i - 1))}
          disabled={featureIndex === 0}
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            background: "white",
            border: "2px solid #e2e8f0",
            borderRadius: "50%",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            color: "#3b82f6",
            boxShadow: "0 2px 8px rgba(59, 130, 246, 0.08)",
            cursor: featureIndex === 0 ? "not-allowed" : "pointer",
            opacity: featureIndex === 0 ? 0.4 : 1,
            zIndex: 10,
          }}
        >
          <ArrowRight style={{ transform: "rotate(180deg)" }} size={22} />
        </button>
        <button
          aria-label="Next Feature"
          onClick={() =>
            setFeatureIndex((i) => Math.min(features.length - 1, i + 1))
          }
          disabled={featureIndex === features.length - 1}
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            background: "white",
            border: "2px solid #e2e8f0",
            borderRadius: "50%",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            color: "#3b82f6",
            boxShadow: "0 2px 8px rgba(59, 130, 246, 0.08)",
            cursor:
              featureIndex === features.length - 1 ? "not-allowed" : "pointer",
            opacity: featureIndex === features.length - 1 ? 0.4 : 1,
            zIndex: 10,
          }}
        >
          <ArrowRight size={22} />
        </button>
      </div>
      {/* Dots */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          marginTop: 32,
          zIndex: 2,
        }}
      >
        {features.map((_, idx) => (
          <div
            key={idx}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: idx === featureIndex ? "#3b82f6" : "#e0e7ef",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
      <style>
        {`
        @keyframes gradientBar {
          0% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }
        @keyframes whyObj1 {
          0% { transform: translate(0, 0) scale(1);}
          100% { transform: translate(80px, -60px) scale(1.18);}
        }
        @keyframes whyObj2 {
          0% { transform: translate(0, 0) scale(1);}
          100% { transform: translate(-60px, 60px) scale(1.22);}
        }
        @keyframes whyObj3 {
          0% { transform: translate(0, 0) scale(1);}
          100% { transform: translate(-40px, 90px) scale(1.16);}
        }
        @keyframes whyObj4 {
          0% { transform: translate(0, 0) scale(1);}
          100% { transform: translate(40px, -40px) scale(1.19);}
        }
        `}
      </style>
    </div>,
    // Feedback Slide (more beautiful)
    <div
      key="feedback"
      style={{
        minWidth: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f1f5f9 0%, #e0e7ff 100%)",
        color: "#1e293b",
        padding: 32,
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        ...fadeInSlide(slide === 2),
      }}
    >
      {/* Decorative background shapes */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          filter: "blur(24px)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "10%",
            top: "20%",
            width: 120,
            height: 120,
            background: "linear-gradient(135deg, #6366f1 0%, #a5b4fc 100%)",
            borderRadius: "50%",
            opacity: 0.13,
            animation: "moveObj1 4s ease-in-out infinite alternate",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "12%",
            top: "60%",
            width: 80,
            height: 80,
            background: "linear-gradient(135deg, #38bdf8 0%, #a5b4fc 100%)",
            borderRadius: "50%",
            opacity: 0.1,
            animation: "moveObj2 3.5s ease-in-out infinite alternate",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "70%",
            top: "10%",
            width: 60,
            height: 60,
            background: "linear-gradient(135deg, #fbbf24 0%, #f59e42 100%)",
            borderRadius: "50%",
            opacity: 0.09,
            animation: "moveObj3 5s ease-in-out infinite alternate",
          }}
        />
      </div>
      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <h3
          style={{
            fontSize: "36px",
            fontWeight: "900",
            marginBottom: "18px",
            textAlign: "center",
            background: "linear-gradient(90deg, #6366f1 0%, #38bdf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-1px",
          }}
        >
          We Value Your Feedback
        </h3>
        <p
          style={{
            fontSize: "20px",
            color: "#64748b",
            marginBottom: "36px",
            textAlign: "center",
            maxWidth: 520,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Help us make{" "}
          <span style={{ color: "#6366f1", fontWeight: 600 }}>Mind Stack</span>{" "}
          better! Share your thoughts, suggestions, or report any issues. Your
          feedback shapes the future of our product.
        </p>
        <form
          style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: 24,
            boxShadow: "0 8px 40px rgba(99,102,241,0.10)",
            padding: "40px 32px",
            maxWidth: 420,
            width: "100%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 22,
            border: "1.5px solid #e0e7ef",
            position: "relative",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you for your feedback!");
          }}
        >
          <input
            type="text"
            placeholder="Your Name (optional)"
            style={{
              padding: "13px 16px",
              borderRadius: 10,
              border: "1.5px solid #e0e7ef",
              fontSize: 16,
              outline: "none",
              background: "#f8fafc",
              transition: "border 0.2s",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.border = "1.5px solid #6366f1")
            }
            onBlur={(e) =>
              (e.currentTarget.style.border = "1.5px solid #e0e7ef")
            }
          />
          <textarea
            required
            placeholder="Your feedback..."
            rows={4}
            style={{
              padding: "13px 16px",
              borderRadius: 10,
              border: "1.5px solid #e0e7ef",
              fontSize: 16,
              resize: "vertical",
              outline: "none",
              background: "#f8fafc",
              transition: "border 0.2s",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.border = "1.5px solid #6366f1")
            }
            onBlur={(e) =>
              (e.currentTarget.style.border = "1.5px solid #e0e7ef")
            }
          />
          <button
            type="submit"
            style={{
              background: "linear-gradient(90deg, #6366f1 0%, #38bdf8 100%)",
              color: "#fff",
              padding: "13px 0",
              borderRadius: "10px",
              fontSize: "18px",
              fontWeight: 700,
              border: "none",
              boxShadow: "0 4px 18px rgba(99,102,241,0.13)",
              cursor: "pointer",
              transition: "transform 0.16s, box-shadow 0.16s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "scale(1.04)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 8px 24px rgba(99,102,241,0.18)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 4px 18px rgba(99,102,241,0.13)";
            }}
          >
            Submit Feedback
          </button>
          <div
            style={{
              position: "absolute",
              right: 18,
              bottom: 18,
              fontSize: 18,
              opacity: 0.13,
              pointerEvents: "none",
            }}
          >
            📝
          </div>
        </form>
      </div>
      <style>
        {`
        @keyframes moveObj1 {
          0% { transform: translate(0, 0) scale(1);}
          100% { transform: translate(30px, -20px) scale(1.08);}
        }
        @keyframes moveObj2 {
          0% { transform: translate(0, 0) scale(1);}
          100% { transform: translate(-20px, 20px) scale(1.12);}
        }
        @keyframes moveObj3 {
          0% { transform: translate(0, 0) scale(1);}
          100% { transform: translate(-10px, 30px) scale(1.06);}
        }
        `}
      </style>
    </div>,
  ];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Navigation */}
      <nav
        style={{
          padding: "20px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(255,255,255,0.07)",
          boxShadow: "0 -2px 12px rgba(99,102,241,0.05)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(59, 130, 246, 0.03)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        {/* Left: Logo and Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {/* <div style={{
            width: '44px',
            height: '44px',
            background: 'linear-gradient(135deg, #6366f1 0%, #38bdf8 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            boxShadow: '0 4px 16px rgba(99,102,241,0.18)'
          }}>
            🧠
          </div> */}
          <span
            style={{
              fontWeight: 800,
              fontSize: "26px",
              background: "linear-gradient(135deg, #6366f1 0%, #38bdf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.5px",
            }}
          >
            Mind Stack
          </span>
        </div>
        {/* Center: Tagline */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "17px",
            color: "#6366f1",
            fontWeight: 600,
            letterSpacing: "0.5px",
            background: "rgba(255,255,255,0.22)",
            borderRadius: 8,
            padding: "6px 22px",
            boxShadow: "0 2px 12px rgba(99,102,241,0.07)",
            backdropFilter: "blur(8px)",
          }}
        >
          Your digital brain
        </div>
        {/* Right: Sign In */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <button
            style={{
              background: "transparent",
              border: "2px solid #6366f1",
              color: "#6366f1",
              padding: "10px 24px",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onClick={() => navigate("/signin")}
          >
            <LogIn size={18} />
            Sign In
          </button>
        </div>
      </nav>
      {/* Horizontal Slides */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: `${slides.length * 100}vw`,
          height: "100vh",
          transform: `translateX(-${slide * 100}vw)`,
          transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {slides}
      </div>
      {/* Arrow Controls */}
      <button
        aria-label="Previous"
        onClick={() => {
          if (!isScrolling && slide > 0) {
            setSlide((s) => Math.max(0, s - 1));
            setIsScrolling(true);
            setTimeout(() => setIsScrolling(false), 800);
          }
        }}
        disabled={slide === 0 || isScrolling}
        style={{
          position: "fixed",
          top: "50%",
          left: 24,
          transform: "translateY(-50%)",
          background: "white",
          border: "2px solid #e2e8f0",
          borderRadius: "50%",
          width: 48,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          color: "#6366f1",
          boxShadow: "0 4px 16px rgba(99,102,241,0.08)",
          cursor: slide === 0 || isScrolling ? "not-allowed" : "pointer",
          opacity: slide === 0 || isScrolling ? 0.4 : 1,
          zIndex: 200,
          transition: "opacity 0.3s ease",
        }}
      >
        <ArrowRight style={{ transform: "rotate(180deg)" }} size={28} />
      </button>
      <button
        aria-label="Next"
        onClick={() => {
          if (!isScrolling && slide < 2) {
            setSlide((s) => Math.min(2, s + 1));
            setIsScrolling(true);
            setTimeout(() => setIsScrolling(false), 800);
          }
        }}
        disabled={slide === 2 || isScrolling}
        style={{
          position: "fixed",
          top: "50%",
          right: 24,
          transform: "translateY(-50%)",
          background: "white",
          border: "2px solid #e2e8f0",
          borderRadius: "50%",
          width: 48,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          color: "#6366f1",
          boxShadow: "0 4px 16px rgba(99,102,241,0.08)",
          cursor: slide === 2 || isScrolling ? "not-allowed" : "pointer",
          opacity: slide === 2 || isScrolling ? 0.4 : 1,
          zIndex: 200,
          transition: "opacity 0.3s ease",
        }}
      >
        <ArrowRight size={28} />
      </button>
      
      {/* Scroll Indicators */}
      <div
        style={{
          position: "fixed",
          right: 32,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          zIndex: 200,
        }}
      >
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => {
              if (!isScrolling) {
                setSlide(index);
                setIsScrolling(true);
                setTimeout(() => setIsScrolling(false), 800);
              }
            }}
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              border: "2px solid #6366f1",
              background: slide === index ? "#6366f1" : "transparent",
              cursor: isScrolling ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              opacity: isScrolling ? 0.6 : 1,
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Scroll Hint */}
      {slide === 0 && (
        <div
          style={{
            position: "fixed",
            bottom: 80,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            color: "#64748b",
            fontSize: 14,
            fontWeight: 500,
            zIndex: 200,
            animation: "bounce 2s infinite",
          }}
        >
          <span>Scroll to explore</span>
          <div
            style={{
              width: 2,
              height: 20,
              background: "linear-gradient(to bottom, #6366f1, transparent)",
              borderRadius: 1,
            }}
          />
        </div>
      )}
      {/* Footer */}
      <footer
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          textAlign: "center",
          color: "#94a3b8",
          fontSize: "16px",
          fontWeight: 500,
          fontStyle: "italic",
          padding: "24px 0 12px 0",
          background: "rgba(255,255,255,0.07)",
          backdropFilter: "blur(18px)",
          borderTop: "1px solid rgba(59, 130, 246, 0.03)",
          boxShadow: "0 -2px 12px rgba(99,102,241,0.05)",
          zIndex: 99,
        }}
      >
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} Mind Stack. All rights reserved.
        </p>
      </footer>
      
      {/* Global Styles */}
      <style>
        {`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }
        `}
      </style>
    </div>
  );
}

export default LandingPage;

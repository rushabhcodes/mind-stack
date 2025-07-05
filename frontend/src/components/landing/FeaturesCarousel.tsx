import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface FeaturesCarouselProps {
  isActive: boolean;
}

const features: Feature[] = [
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

export default function FeaturesCarousel({ isActive }: FeaturesCarouselProps) {
  const [featureIndex, setFeatureIndex] = useState(0);

  const fadeInSlide = {
    opacity: isActive ? 1 : 0,
    transform: isActive ? "scale(1) translateY(0)" : "scale(0.98) translateY(40px)",
    transition: "opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)",
  };

  const getFeatureIconBg = (color: string) => {
    switch (color) {
      case "#3b82f6":
        return "bg-gradient-to-br from-blue-500/10 to-blue-500/20";
      case "#06b6d4":
        return "bg-gradient-to-br from-cyan-500/10 to-cyan-500/20";
      case "#8b5cf6":
        return "bg-gradient-to-br from-violet-500/10 to-violet-500/20";
      case "#10b981":
        return "bg-gradient-to-br from-emerald-500/10 to-emerald-500/20";
      default:
        return "bg-gradient-to-br from-blue-500/10 to-blue-500/20";
    }
  };

  return (
    <div 
      className="min-w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-100 p-8 box-border relative overflow-hidden"
      style={fadeInSlide}
    >
      {/* Animated gradient bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-sky-400 to-indigo-500 bg-[length:600%_600%] animate-[gradientBar_3s_ease-in-out_infinite] z-10 opacity-70" />

      {/* Animated background objects */}
      <div className="absolute inset-0 z-0 pointer-events-none blur-[24px]">
        <div className="absolute left-[5%] top-[10%] w-[180px] h-[180px] bg-gradient-to-br from-indigo-500 to-indigo-300 rounded-full opacity-[0.22] animate-[whyObj1_0.8s_ease-in-out_infinite_alternate]" />
        <div className="absolute left-[70%] top-[10%] w-[120px] h-[120px] bg-gradient-to-br from-sky-400 to-indigo-300 rounded-full opacity-[0.18] animate-[whyObj2_0.65s_ease-in-out_infinite_alternate]" />
        <div className="absolute left-[60%] top-[65%] w-[140px] h-[140px] bg-gradient-to-br from-cyan-500 to-sky-400 rounded-full opacity-[0.15] animate-[whyObj3_0.95s_ease-in-out_infinite_alternate]" />
        <div className="absolute left-[25%] top-[80%] w-[80px] h-[80px] bg-gradient-to-br from-indigo-500 to-sky-400 rounded-full opacity-[0.15] animate-[whyObj4_0.5s_ease-in-out_infinite_alternate]" />
      </div>

      <h2 className="text-[42px] font-black text-slate-800 mb-10 tracking-[-1px] text-center relative z-20">
        Why Mind Stack?
      </h2>

      <div className="relative w-full max-w-[600px] h-[280px] mx-auto z-20">
        {/* Card Carousel */}
        <div className="flex flex-row items-center h-full justify-center">
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
                  className={`absolute left-1/2 top-1/2 w-[320px] bg-white rounded-3xl p-8 flex flex-col items-center border border-slate-200 text-center transition-all duration-500 ease-out ${
                    idx === featureIndex ? "shadow-[0_8px_32px_rgba(59,130,246,0.13)]" : "shadow-[0_2px_12px_rgba(59,130,246,0.07)]"
                  } ${idx === featureIndex ? "pointer-events-auto" : "pointer-events-none"}`}
                  style={{
                    transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
                    filter: `blur(${blur})`,
                    zIndex,
                    opacity,
                  }}
                >
                  <div
                    className={`text-5xl mb-[18px] rounded-2xl p-[18px] ${getFeatureIconBg(feature.color)}`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-[22px] font-black text-slate-800 m-0 mb-[14px]">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed m-0 text-base font-normal">
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
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border-2 border-slate-200 rounded-full w-10 h-10 flex items-center justify-center text-xl text-blue-500 shadow-[0_2px_8px_rgba(59,130,246,0.08)] cursor-pointer z-10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowRight className="rotate-180" size={22} />
        </button>
        <button
          aria-label="Next Feature"
          onClick={() =>
            setFeatureIndex((i) => Math.min(features.length - 1, i + 1))
          }
          disabled={featureIndex === features.length - 1}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border-2 border-slate-200 rounded-full w-10 h-10 flex items-center justify-center text-xl text-blue-500 shadow-[0_2px_8px_rgba(59,130,246,0.08)] cursor-pointer z-10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowRight size={22} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2.5 mt-8 z-20">
        {features.map((_, idx) => (
          <div
            key={idx}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
              idx === featureIndex ? "bg-blue-500" : "bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

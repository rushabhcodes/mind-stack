import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  isActive: boolean;
}

export default function HeroSection({ isActive }: HeroSectionProps) {
  const navigate = useNavigate();

  const fadeInSlide = {
    opacity: isActive ? 1 : 0,
    transform: isActive ? "scale(1) translateY(0)" : "scale(0.98) translateY(40px)",
    transition: "opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)",
  };

  return (
    <div 
      className="min-w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-100 relative text-center p-8 box-border overflow-hidden"
      style={fadeInSlide}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <svg
          width="100%"
          height="100%"
          className="absolute left-0 top-0 opacity-[0.08]"
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

        <div className="absolute left-[15%] top-[25%] w-[18px] h-[18px] bg-gradient-to-br from-indigo-500 to-indigo-300 rounded-full opacity-70 animate-[moveObj1_2.5s_ease-in-out_infinite_alternate]" />
        <div className="absolute left-[70%] top-[60%] w-3 h-3 bg-gradient-to-br from-sky-400 to-indigo-300 rounded-full opacity-60 animate-[moveObj2_2s_ease-in-out_infinite_alternate]" />
        <div className="absolute left-[80%] top-[18%] w-[14px] h-[14px] bg-gradient-to-br from-indigo-300 to-indigo-500 rounded-full opacity-50 animate-[moveObj3_2.8s_ease-in-out_infinite_alternate]" />
        <div className="absolute left-[30%] top-[75%] w-[10px] h-[10px] bg-gradient-to-br from-sky-400 to-indigo-500 rounded-full opacity-50 animate-[moveObj4_2.2s_ease-in-out_infinite_alternate]" />
      </div>

      <div className="relative z-10">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 text-slate-800 tracking-tight leading-none">
          Save, Organize &<br />
          <span className="bg-gradient-to-r from-indigo-500 to-sky-400 bg-clip-text text-transparent">
            Remember Everything
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed font-normal">
          The most elegant way to save links, videos, tweets, and notes.
          <br />
          Your digital brain—always organized, always accessible.
        </p>
        <button
          className="bg-gradient-to-r from-indigo-500 to-sky-400 text-white px-9 py-3.5 rounded-xl text-lg font-bold border-0 shadow-[0_6px_24px_rgba(99,102,241,0.18)] cursor-pointer inline-flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_36px_rgba(99,102,241,0.22)]"
          onClick={() => navigate("/signin")}
        >
          Let's Start <ArrowRight size={22} />
        </button>
      </div>
    </div>
  );
}

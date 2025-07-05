import { ArrowRight } from "lucide-react";

interface SlideControlsProps {
  slide: number;
  isScrolling: boolean;
  onSlideChange: (newSlide: number) => void;
  totalSlides: number;
}

export default function SlideControls({ 
  slide, 
  isScrolling, 
  onSlideChange, 
  totalSlides 
}: SlideControlsProps) {
  const handleSlideChange = (newSlide: number) => {
    if (!isScrolling && newSlide >= 0 && newSlide < totalSlides) {
      onSlideChange(newSlide);
    }
  };

  return (
    <>
      {/* Arrow Controls */}
      <button
        aria-label="Previous"
        onClick={() => handleSlideChange(slide - 1)}
        disabled={slide === 0 || isScrolling}
        className="fixed top-1/2 left-6 -translate-y-1/2 bg-white border-2 border-slate-200 rounded-full w-12 h-12 flex items-center justify-center text-2xl text-indigo-500 shadow-[0_4px_16px_rgba(99,102,241,0.08)] cursor-pointer z-[200] transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ArrowRight className="rotate-180" size={28} />
      </button>
      
      <button
        aria-label="Next"
        onClick={() => handleSlideChange(slide + 1)}
        disabled={slide === totalSlides - 1 || isScrolling}
        className="fixed top-1/2 right-6 -translate-y-1/2 bg-white border-2 border-slate-200 rounded-full w-12 h-12 flex items-center justify-center text-2xl text-indigo-500 shadow-[0_4px_16px_rgba(99,102,241,0.08)] cursor-pointer z-[200] transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ArrowRight size={28} />
      </button>
      
      {/* Scroll Hint */}
      {slide === 0 && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-sm font-medium z-[200] animate-bounce">
          <span>Scroll to explore</span>
          <div className="w-0.5 h-5 bg-gradient-to-b from-indigo-500 to-transparent rounded-[1px]" />
        </div>
      )}
    </>
  );
}

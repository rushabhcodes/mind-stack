import { useState } from "react";

interface FeedbackFormProps {
  isActive: boolean;
}

export default function FeedbackForm({ isActive }: FeedbackFormProps) {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");

  const fadeInSlide = {
    opacity: isActive ? 1 : 0,
    transform: isActive ? "scale(1) translateY(0)" : "scale(0.98) translateY(40px)",
    transition: "opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your feedback!");
    setName("");
    setFeedback("");
  };

  return (
    <div 
      className="min-w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-100 text-slate-800 p-8 box-border relative overflow-hidden"
      style={fadeInSlide}
    >
      {/* Decorative background shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none blur-[24px]">
        <div className="absolute left-[10%] top-[20%] w-[120px] h-[120px] bg-gradient-to-br from-indigo-500 to-indigo-300 rounded-full opacity-[0.13] animate-[feedbackObj1_4s_ease-in-out_infinite_alternate]" />
        <div className="absolute right-[12%] top-[60%] w-[80px] h-[80px] bg-gradient-to-br from-sky-400 to-indigo-300 rounded-full opacity-[0.1] animate-[feedbackObj2_3.5s_ease-in-out_infinite_alternate]" />
        <div className="absolute left-[70%] top-[10%] w-[60px] h-[60px] bg-gradient-to-br from-amber-400 to-orange-400 rounded-full opacity-[0.09] animate-[feedbackObj3_5s_ease-in-out_infinite_alternate]" />
      </div>

      <div className="relative z-10 w-full">
        <h3 className="text-4xl font-black mb-[18px] text-center bg-gradient-to-r from-indigo-500 to-sky-400 bg-clip-text text-transparent tracking-[-1px]">
          We Value Your Feedback
        </h3>
        <p className="text-xl text-slate-500 mb-9 text-center max-w-[520px] mx-auto">
          Help us make{" "}
          <span className="text-indigo-500 font-semibold">Mind Stack</span>{" "}
          better! Share your thoughts, suggestions, or report any issues. Your
          feedback shapes the future of our product.
        </p>

        <form
          className="bg-white/95 rounded-3xl shadow-[0_8px_40px_rgba(99,102,241,0.10)] p-10 max-w-[420px] w-full mx-auto flex flex-col gap-[22px] border-[1.5px] border-slate-200 relative"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Your Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-[13px] rounded-[10px] border-[1.5px] border-slate-200 text-base outline-none bg-slate-50 transition-colors duration-200 focus:border-indigo-500"
          />
          <textarea
            required
            placeholder="Your feedback..."
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="p-[13px] rounded-[10px] border-[1.5px] border-slate-200 text-base resize-y outline-none bg-slate-50 transition-colors duration-200 focus:border-indigo-500"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-sky-400 text-white py-[13px] rounded-[10px] text-lg font-bold border-none shadow-[0_4px_18px_rgba(99,102,241,0.13)] cursor-pointer transition-all duration-150 hover:scale-[1.04] hover:shadow-[0_8px_24px_rgba(99,102,241,0.18)]"
          >
            Submit Feedback
          </button>
          <div className="absolute right-[18px] bottom-[18px] text-lg opacity-[0.13] pointer-events-none">
            📝
          </div>
        </form>
      </div>
    </div>
  );
}

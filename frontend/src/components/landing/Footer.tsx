export default function Footer() {
  return (
    <footer className="fixed left-0 right-0 bottom-0 text-center text-slate-400 text-base font-medium italic py-6 pb-3 bg-white/[0.07] backdrop-blur-[18px] border-t border-blue-500/[0.03] shadow-[0_-2px_12px_rgba(99,102,241,0.05)] z-[99]">
      <p className="m-0">
        © {new Date().getFullYear()} Mind Stack. All rights reserved.
      </p>
    </footer>
  );
}

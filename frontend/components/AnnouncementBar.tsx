export function AnnouncementBar() {
  return (
    <div
      className="relative z-[60] w-full border-b border-white/[0.06] py-2 text-center"
      style={{
        background:
          "linear-gradient(90deg, rgba(139,92,246,0.1) 0%, rgba(139,92,246,0.18) 50%, rgba(139,92,246,0.1) 100%)",
      }}
    >
      <p className="px-4 text-[11px] font-medium leading-snug tracking-wide text-white/90 sm:text-xs">
        GitBoard now supports AI-powered repo insights — Try it now
      </p>
    </div>
  );
}

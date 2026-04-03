import { AnnouncementBar } from "@/components/AnnouncementBar";
import { MarketingVisualLayer } from "@/components/MarketingVisualLayer";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative isolate flex min-h-0 min-h-full flex-1 flex-col bg-[var(--bg-primary)]">
      <MarketingVisualLayer />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <AnnouncementBar />
        <Navbar />
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        <SiteFooter />
      </div>
    </div>
  );
}

import { memo } from "react";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="4" width="20" height="16" rx="4" />
    <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="2" width="20" height="20" rx="3" />
    <line x1="8" y1="11" x2="8" y2="16" />
    <line x1="8" y1="8" x2="8" y2="8.01" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 16v-5a2 2 0 0 1 4 0v5" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4l6.5 8L4 20h2l5.5-6.5L16 20h4l-7-8.5L19 4h-2l-5 6-4-6H4z" />
  </svg>
);

const PLATFORMS = [
  { name: "Instagram", icon: InstagramIcon },
  { name: "Facebook", icon: FacebookIcon },
  { name: "TikTok", icon: TikTokIcon },
  { name: "YouTube", icon: YouTubeIcon },
  { name: "LinkedIn", icon: LinkedInIcon },
  { name: "X", icon: XIcon },
] as const;

const PlatformsSection = memo(function PlatformsSection() {
  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="container mx-auto max-w-4xl text-center">
        <p className="text-xl text-muted-foreground mb-10 italic">
          Optimized for all major social and advertising platforms.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
          {PLATFORMS.map((platform) => {
            const Icon = platform.icon;
            return (
              <div
                key={platform.name}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="w-16 h-16 rounded-2xl border-2 border-muted-foreground/30 flex items-center justify-center text-muted-foreground transition-all duration-300 group-hover:border-foreground group-hover:text-foreground group-hover:scale-110">
                  <Icon />
                </div>
                <span className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                  {platform.name}
                </span>
              </div>
            );
          })}
        </div>
        
        <p className="text-sm text-muted-foreground/70 mt-12 font-medium tracking-wide">
          Built for Today's Platforms
        </p>
      </div>
    </section>
  );
});

export default PlatformsSection;

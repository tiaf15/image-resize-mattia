import { memo } from "react";

const PLATFORMS = [
  { name: "Instagram", color: "from-pink-500 to-purple-500" },
  { name: "Facebook", color: "from-blue-600 to-blue-500" },
  { name: "TikTok", color: "from-gray-900 to-gray-700" },
  { name: "YouTube", color: "from-red-600 to-red-500" },
  { name: "LinkedIn", color: "from-blue-700 to-blue-600" },
] as const;

const PlatformsSection = memo(function PlatformsSection() {
  return (
    <section className="py-12 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <p className="text-muted-foreground mb-8">
          Optimized for all major social and advertising platforms.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {PLATFORMS.map((platform) => (
            <div
              key={platform.name}
              className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center shadow-md`}>
                <span className="text-white font-bold text-lg">
                  {platform.name.charAt(0)}
                </span>
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                {platform.name}
              </span>
            </div>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground/60 mt-8">
          Built for Today's Platforms
        </p>
      </div>
    </section>
  );
});

export default PlatformsSection;

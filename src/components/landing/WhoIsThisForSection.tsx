import { memo } from "react";
import { ShoppingBag, Camera, Share2, BarChart3, Building2, Briefcase } from "lucide-react";

const USER_GROUPS = [
  {
    icon: ShoppingBag,
    title: "E-commerce Owners",
    description: "Scale your product ads across every channel instantly.",
  },
  {
    icon: Camera,
    title: "Creators",
    description: "Focus on content, not endless resizing.",
  },
  {
    icon: Share2,
    title: "Social Media Managers",
    description: "Deliver pixel-perfect posts for every platform.",
  },
  {
    icon: BarChart3,
    title: "Performance Marketers",
    description: "Test more creatives, faster, with less effort.",
  },
  {
    icon: Building2,
    title: "Agencies",
    description: "Multiply output without multiplying headcount.",
  },
  {
    icon: Briefcase,
    title: "Freelancers",
    description: "Impress clients with fast, professional delivery.",
  },
] as const;

const WhoIsThisForSection = memo(function WhoIsThisForSection() {
  return (
    <section className="py-24 px-6 bg-secondary/50">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Who Is This For?
          </h2>
          <p className="text-muted-foreground text-lg">
            Built for anyone who needs professional ads, fast
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {USER_GROUPS.map((group, index) => {
            const Icon = group.icon;
            return (
              <div
                key={group.title}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border animate-fade-up"
                style={{ animationDelay: `${0.08 * index}s` }}
              >
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{group.title}</h3>
                  <p className="text-xs text-muted-foreground">{group.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default WhoIsThisForSection;

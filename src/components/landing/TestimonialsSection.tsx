import { memo } from "react";

const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    role: "E-commerce Owner",
    quote: "Finally one tool that gives me every ad format in seconds. Game changer for my store.",
    avatar: "S"
  },
  {
    name: "Marcus Chen",
    role: "Performance Marketer",
    quote: "Our ROAS improved because we test more formats, faster. This tool pays for itself.",
    avatar: "M"
  },
  {
    name: "Elena Rodriguez",
    role: "Social Media Manager",
    quote: "A must-have for anyone creating ads for clients. Saves me hours every week.",
    avatar: "E"
  },
  {
    name: "David Kim",
    role: "Creative Director",
    quote: "The AI outpainting is incredible. No more awkward cropping or stretched images.",
    avatar: "D"
  },
  {
    name: "Lisa Thompson",
    role: "Digital Agency Founder",
    quote: "We scaled our ad production 5x without hiring. Essential for any agency.",
    avatar: "L"
  },
  {
    name: "James Wilson",
    role: "Freelance Designer",
    quote: "Clean, fast, professional. Exactly what I needed for quick turnarounds.",
    avatar: "J"
  }
] as const;

const TestimonialCard = memo(function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: typeof TESTIMONIALS[number];
  index: number;
}) {
  return (
    <div
      className="bg-card rounded-2xl p-6 border border-border hover-lift animate-fade-up"
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
          {testimonial.avatar}
        </div>
        <div>
          <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
    </div>
  );
});

const TestimonialsSection = memo(function TestimonialsSection() {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Creators and Advertisers Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Trusted by marketers, agencies, and creators worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default TestimonialsSection;

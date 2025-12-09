import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm fixed top-0 w-full z-50 bg-background/80">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold text-xl tracking-tight">
            Clarify
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/explore"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Explore
            </Link>
            <Link href="/journal">
              <Button size="sm">Start Thinking</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight mb-6">
            Think better in an age of noise
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
            A space for structured thinking and nuanced understanding.
            Explore complex topics from multiple perspectives.
            Articulate your own views. Watch your thinking evolve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/journal">
              <Button size="lg" className="w-full sm:w-auto">
                Start Your Journal
              </Button>
            </Link>
            <Link href="/explore">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Explore Topics
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">The Problem</h2>
          <div className="prose prose-neutral dark:prose-invert mx-auto">
            <p className="text-muted-foreground text-center text-lg leading-relaxed">
              We&apos;re drowning in information but starving for understanding.
              Social media rewards hot takes over nuance. Echo chambers reinforce
              what we already believe. Complex issues get reduced to binary positions.
              We&apos;ve lost the art of thinking deeply—and thinking together.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-12 text-center">A Different Approach</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              title="Think Deeply"
              description="Your personal thinking journal with structured prompts that surface assumptions and uncertainties. Track how your views evolve over time."
              icon={<ThinkIcon />}
            />
            <FeatureCard
              title="See All Sides"
              description="Complex topics presented with multiple perspectives—not false equivalence, but the genuine landscape of thought. Steelmanned viewpoints that help you truly understand."
              icon={<PerspectiveIcon />}
            />
            <FeatureCard
              title="Stay Private"
              description="Your thoughts are yours. Everything stays on your device by default. No engagement metrics. No algorithms optimizing for attention."
              icon={<PrivateIcon />}
            />
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">Our Principles</h2>
          <div className="space-y-6">
            <Principle
              title="Epistemic Humility"
              description="We acknowledge uncertainty. Complex topics don't have simple answers. 'I don't know' is a valid and important position."
            />
            <Principle
              title="Steel-Manning"
              description="Every perspective is presented in its strongest form—as its proponents would articulate it, not as opponents would caricature it."
            />
            <Principle
              title="Slow Thinking"
              description="Designed for depth, not engagement. No infinite scroll. No notification anxiety. Features that encourage you to pause and reflect."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to think better?</h2>
          <p className="text-muted-foreground mb-8">
            No account required. Your thoughts stay on your device. Start now.
          </p>
          <Link href="/journal">
            <Button size="lg">Open Your Journal</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Clarify</span>
            {" · "}
            Think better, together.
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="https://github.com/BenTyson/azimov" className="hover:text-foreground transition-colors">
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="border-border/50">
      <CardContent className="pt-6">
        <div className="mb-4 text-primary">{icon}</div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

function Principle({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-1.5 bg-primary/20 rounded-full flex-shrink-0" />
      <div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// Icons
function ThinkIcon() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  );
}

function PerspectiveIcon() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function PrivateIcon() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Placeholder topics - in production these would come from a database
const COMING_SOON_TOPICS = [
  {
    title: "Climate Change",
    description: "The science, politics, economics, and ethics of addressing climate change.",
    complexity: 5,
    perspectives: 8,
  },
  {
    title: "Artificial Intelligence",
    description: "The opportunities, risks, and governance challenges of AI development.",
    complexity: 4,
    perspectives: 6,
  },
  {
    title: "Economic Systems",
    description: "Capitalism, socialism, and alternative economic models examined.",
    complexity: 5,
    perspectives: 7,
  },
  {
    title: "Free Will",
    description: "Do we have it? What does science and philosophy say?",
    complexity: 4,
    perspectives: 5,
  },
];

export default function ExplorePage() {
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
              href="/journal"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Journal
            </Link>
            <Link href="/journal/new">
              <Button size="sm">Start Thinking</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold mb-2">Explore Topics</h1>
            <p className="text-muted-foreground">
              Complex topics presented with multiple perspectives. Coming soon.
            </p>
          </div>

          {/* Coming Soon Notice */}
          <div className="mb-8 p-6 bg-muted/30 rounded-lg border border-border/50 text-center">
            <h2 className="text-lg font-medium mb-2">Topic Exploration Coming Soon</h2>
            <p className="text-sm text-muted-foreground mb-4">
              We&apos;re carefully curating topics with steelmanned perspectives.
              Each viewpoint is presented in its strongest form.
            </p>
            <p className="text-sm text-muted-foreground">
              In the meantime, start your{" "}
              <Link href="/journal" className="text-primary hover:underline">
                thinking journal
              </Link>{" "}
              to explore any topic on your own.
            </p>
          </div>

          {/* Preview Topics */}
          <h3 className="text-lg font-medium mb-4">Topics in Development</h3>
          <div className="grid gap-4">
            {COMING_SOON_TOPICS.map((topic) => (
              <Card key={topic.title} className="border-border/50 opacity-75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{topic.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {topic.description}
                  </p>
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    <span>Complexity: {topic.complexity}/5</span>
                    <span>{topic.perspectives} perspectives</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Want to explore your own thinking while you wait?
            </p>
            <Link href="/journal/new">
              <Button>Create a Journal Entry</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

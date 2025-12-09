import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTopics } from "@/lib/data/topics";

export default function ExplorePage() {
  const topics = getAllTopics();

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
              Complex topics with steelmanned perspectives. Each viewpoint presented in its strongest form.
            </p>
          </div>

          {/* Info Banner */}
          <div className="mb-8 p-4 bg-muted/30 rounded-lg border border-border/50">
            <p className="text-sm text-muted-foreground text-center">
              Every perspective is presented as its proponents would articulate it—not as opponents caricature it.
              Understanding a view doesn&apos;t mean agreeing with it.
            </p>
          </div>

          {/* Topics Grid */}
          <div className="grid gap-4">
            {topics.map((topic) => (
              <Link key={topic.id} href={`/explore/${topic.slug}`}>
                <Card className="border-border/50 hover:border-border hover:shadow-sm transition-all cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{topic.title}</CardTitle>
                      <span className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground">
                        {topic.category}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {topic.description}
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="flex items-center gap-1">
                        <ComplexityDots level={topic.complexity} />
                        <span className="text-muted-foreground">Complexity</span>
                      </span>
                      <span className="text-muted-foreground">
                        {topic.perspectives.length} perspectives
                      </span>
                      <span className="text-muted-foreground">
                        {topic.keyQuestions.length} key questions
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* More Coming */}
          <div className="mt-8 p-6 border border-dashed border-border/50 rounded-lg text-center">
            <p className="text-sm text-muted-foreground mb-2">
              More topics being carefully curated
            </p>
            <p className="text-xs text-muted-foreground">
              Climate Change • Consciousness • Moral Realism • Immigration • Criminal Justice
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Want to explore your own thinking on any topic?
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

function ComplexityDots({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${
            i <= level ? 'bg-primary' : 'bg-muted'
          }`}
        />
      ))}
    </div>
  );
}

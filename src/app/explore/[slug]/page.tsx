import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTopicBySlug, getAllTopics } from "@/lib/data/topics";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const topics = getAllTopics();
  return topics.map((topic) => ({
    slug: topic.slug,
  }));
}

export default async function TopicPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

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
              All Topics
            </Link>
            <Link href="/journal/new">
              <Button size="sm">Start Thinking</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Link href="/explore" className="hover:text-foreground">
                Topics
              </Link>
              <span>/</span>
              <span>{topic.category}</span>
            </div>
            <h1 className="text-3xl font-semibold mb-3">{topic.title}</h1>
            <p className="text-lg text-muted-foreground">{topic.description}</p>
          </div>

          {/* Key Questions */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Key Questions</h2>
            <div className="space-y-3">
              {topic.keyQuestions.map((kq, i) => (
                <Card key={i} className="border-border/50">
                  <CardContent className="pt-4">
                    <p className="font-medium mb-1">{kq.question}</p>
                    <p className="text-sm text-muted-foreground">{kq.context}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Perspectives */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Perspectives</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Each perspective is presented in its strongest form, as proponents would articulate it.
              Understanding a view doesn&apos;t mean agreeing with it.
            </p>

            <Tabs defaultValue={topic.perspectives[0]?.id} className="w-full">
              <TabsList className="w-full flex-wrap h-auto gap-2 bg-transparent p-0 mb-6">
                {topic.perspectives.map((perspective) => (
                  <TabsTrigger
                    key={perspective.id}
                    value={perspective.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-2 border border-border/50"
                  >
                    {perspective.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {topic.perspectives.map((perspective) => (
                <TabsContent key={perspective.id} value={perspective.id}>
                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">{perspective.name}</CardTitle>
                      <p className="text-muted-foreground">{perspective.summary}</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Full Content */}
                      <div className="prose prose-neutral dark:prose-invert max-w-none">
                        {perspective.fullContent.split('\n\n').map((para, i) => {
                          if (para.startsWith('**') && para.endsWith('**')) {
                            return <h4 key={i} className="font-semibold mt-4 mb-2">{para.replace(/\*\*/g, '')}</h4>;
                          }
                          if (para.startsWith('**')) {
                            const [title, ...rest] = para.split('**:');
                            return (
                              <div key={i} className="mb-3">
                                <span className="font-semibold">{title.replace('**', '')}:</span>
                                {rest.join('').trim()}
                              </div>
                            );
                          }
                          return <p key={i} className="text-muted-foreground leading-relaxed">{para}</p>;
                        })}
                      </div>

                      {/* Key Arguments */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500" />
                          Key Arguments
                        </h4>
                        <ul className="space-y-2">
                          {perspective.keyArguments.map((arg, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex gap-2">
                              <span className="text-green-500">+</span>
                              {arg}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Common Criticisms */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          Common Criticisms
                        </h4>
                        <ul className="space-y-2">
                          {perspective.commonCriticisms.map((crit, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex gap-2">
                              <span className="text-amber-500">-</span>
                              {crit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Notable Proponents */}
                      <div>
                        <h4 className="font-semibold mb-2">Notable Proponents</h4>
                        <div className="flex flex-wrap gap-2">
                          {perspective.notableProponents.map((name, i) => (
                            <span
                              key={i}
                              className="text-sm px-2 py-1 bg-muted rounded"
                            >
                              {name}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Sources */}
                      {perspective.sources.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">Sources & Further Reading</h4>
                          <ul className="space-y-1">
                            {perspective.sources.map((source, i) => (
                              <li key={i} className="text-sm text-muted-foreground">
                                {source.url ? (
                                  <a
                                    href={source.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-foreground underline"
                                  >
                                    {source.title}
                                  </a>
                                ) : (
                                  <span>{source.title}</span>
                                )}
                                {source.author && (
                                  <span className="text-muted-foreground/70"> — {source.author}</span>
                                )}
                                <span className="text-muted-foreground/50 ml-2">({source.type})</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </section>

          {/* Common Misconceptions */}
          {topic.commonMisconceptions.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-4">Common Misconceptions</h2>
              <Card className="border-border/50">
                <CardContent className="pt-4">
                  <ul className="space-y-2">
                    {topic.commonMisconceptions.map((misconception, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-destructive">✗</span>
                        {misconception}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Journal CTA */}
          <section className="mt-12 p-6 bg-muted/30 rounded-lg border border-border/50 text-center">
            <h3 className="font-semibold mb-2">What do you think?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start a journal entry to articulate your own perspective on {topic.title.toLowerCase()}.
              Surface your assumptions and uncertainties.
            </p>
            <Link href={`/journal/new?topic=${topic.slug}`}>
              <Button>Write About This Topic</Button>
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}

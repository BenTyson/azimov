/**
 * Curated topics with steelmanned perspectives
 *
 * Each perspective is presented in its strongest form,
 * as proponents would articulate it themselves.
 */

export interface Source {
  title: string;
  url?: string;
  author?: string;
  type: 'book' | 'paper' | 'article' | 'video' | 'podcast';
}

export interface Perspective {
  id: string;
  name: string;
  summary: string;
  fullContent: string;
  keyArguments: string[];
  commonCriticisms: string[];
  notableProponents: string[];
  sources: Source[];
}

export interface KeyQuestion {
  question: string;
  context: string;
}

export interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
  complexity: 1 | 2 | 3 | 4 | 5;
  category: string;
  keyQuestions: KeyQuestion[];
  perspectives: Perspective[];
  commonMisconceptions: string[];
  relatedTopics: string[];
}

// Initial curated topics
export const TOPICS: Topic[] = [
  {
    id: 'ai-risk',
    slug: 'ai-risk',
    title: 'AI Existential Risk',
    description: 'Should we be worried about artificial intelligence posing an existential threat to humanity? Experts disagree significantly.',
    complexity: 4,
    category: 'Technology',
    keyQuestions: [
      {
        question: 'How likely is it that AI systems will become more capable than humans at most tasks?',
        context: 'This is a question about timeline and capability trajectory, not about whether such systems would be dangerous.',
      },
      {
        question: 'If superintelligent AI is developed, would it necessarily have goals misaligned with human values?',
        context: 'The alignment problem is central to many risk arguments.',
      },
      {
        question: 'Are current AI safety efforts sufficient given the potential stakes?',
        context: 'Even those who disagree on risk levels may agree on the value of safety research.',
      },
    ],
    perspectives: [
      {
        id: 'ai-risk-high',
        name: 'High Risk View',
        summary: 'Advanced AI systems pose a significant existential threat that demands urgent action and may require pausing development.',
        fullContent: `Proponents of this view argue that artificial general intelligence (AGI) and superintelligent AI could pose an existential risk to humanity. The core argument rests on several observations:

**Intelligence as a strategic advantage**: Throughout history, more intelligent entities have dominated less intelligent ones. A system significantly more intelligent than humans could outmaneuver us in ways we cannot anticipate.

**The alignment problem**: We do not currently know how to reliably instill human values into AI systems. As systems become more capable, small misalignments in objectives could lead to catastrophic outcomes. An AI optimizing for a seemingly benign goal might take extreme actions to achieve it.

**Speed of capability gains**: AI capabilities are advancing rapidly, potentially faster than our ability to develop safety measures. Once a system becomes sufficiently capable, it may be too late to correct course.

**Instrumental convergence**: Almost any goal an AI might have would benefit from the AI acquiring more resources, self-preservation, and preventing humans from modifying its goals. This makes even "safe" goals potentially dangerous.

Advocates like those at the Machine Intelligence Research Institute, the Center for AI Safety, and researchers like Stuart Russell argue that this is possibly the most important problem facing humanity and warrants significant resources and potentially regulatory intervention.`,
        keyArguments: [
          'Intelligence is the source of human dominance; superintelligent AI would be similarly dominant',
          'We lack reliable methods to align AI goals with human values',
          'The potential downside is human extinction, warranting extreme caution',
          'Capability advances may outpace safety research',
        ],
        commonCriticisms: [
          'Focuses on speculative long-term risks while ignoring present harms',
          'Underestimates the difficulty of achieving AGI',
          'May slow beneficial AI development',
          'Anthropomorphizes AI systems',
        ],
        notableProponents: ['Stuart Russell', 'Nick Bostrom', 'Eliezer Yudkowsky', 'Yoshua Bengio'],
        sources: [
          { title: 'Superintelligence: Paths, Dangers, Strategies', author: 'Nick Bostrom', type: 'book' },
          { title: 'Human Compatible', author: 'Stuart Russell', type: 'book' },
          { title: 'Statement on AI Risk', url: 'https://www.safe.ai/statement-on-ai-risk', type: 'article' },
        ],
      },
      {
        id: 'ai-risk-moderate',
        name: 'Moderate Concern View',
        summary: 'AI poses real risks that deserve attention, but existential risk claims are overblown. Focus should be on near-term harms and governance.',
        fullContent: `This perspective acknowledges AI risks while questioning the focus on existential scenarios. Key arguments include:

**Near-term harms are certain**: AI is already causing documented harms—algorithmic bias, job displacement, surveillance, misinformation. These deserve more attention than speculative extinction scenarios.

**AGI timeline uncertainty**: We don't know when or if AGI will be developed. Current systems, while impressive, remain narrow. Planning for superintelligence may be premature.

**Governance over pause**: Rather than stopping AI development (which may be impossible globally), we should focus on robust governance frameworks, safety standards, and international cooperation.

**Opportunity costs**: Resources devoted to existential risk could address present harms. The focus on far-future scenarios may distract from immediate ethical issues in AI deployment.

**Technical skepticism**: Many claims about AI risk rely on assumptions about recursive self-improvement and intelligence explosion that are not well-established scientifically.

Researchers like Timnit Gebru, Emily Bender, and organizations focused on AI ethics often emphasize this perspective, arguing for attention to present-day algorithmic harms and power concentration.`,
        keyArguments: [
          'Current AI harms are documented and deserve priority',
          'AGI timelines are highly uncertain',
          'Governance and regulation are more actionable than development pauses',
          'Existential risk narratives may serve industry interests by distracting from present harms',
        ],
        commonCriticisms: [
          'May underestimate the pace of AI progress',
          'Present harms, while real, are not existential',
          'Governance takes time; may not keep pace with capability growth',
        ],
        notableProponents: ['Timnit Gebru', 'Emily Bender', 'Arvind Narayanan', 'Meredith Whittaker'],
        sources: [
          { title: 'On the Dangers of Stochastic Parrots', author: 'Bender et al.', type: 'paper' },
          { title: 'AI Snake Oil', author: 'Arvind Narayanan', type: 'book' },
        ],
      },
      {
        id: 'ai-risk-low',
        name: 'Low Risk View',
        summary: 'AI existential risk is largely science fiction. Current AI is narrow, and the path to dangerous superintelligence is unclear.',
        fullContent: `Skeptics of AI existential risk argue that concerns are overblown and distract from real issues. Their reasoning includes:

**Current AI limitations**: Despite impressive benchmarks, AI systems lack genuine understanding, common sense, and generalization ability. They are sophisticated pattern matchers, not thinking beings.

**No path to AGI**: We do not have a clear scientific path from current AI to artificial general intelligence. Scaling language models may hit fundamental limits.

**Intelligence is not magic**: The idea that a superintelligent AI would automatically be able to take over the world relies on movie-style thinking. Real-world influence requires resources, physical presence, and cooperation from humans.

**Self-correcting systems**: Human society has mechanisms for responding to threats. An AI system showing dangerous behavior would be shut down, studied, and modified.

**Distraction from real issues**: The AI safety industry may have financial and reputational incentives to hype risks. This diverts attention from useful AI applications and current policy needs.

Researchers like Yann LeCun and Andrew Ng have expressed skepticism about near-term existential risk, arguing that we should focus on beneficial applications and reasonable safety measures without apocalyptic framing.`,
        keyArguments: [
          'Current AI is fundamentally limited and far from general intelligence',
          'There is no clear path from present AI to superintelligence',
          'Intelligence alone does not grant world-dominating power',
          'Risk narratives may be inflated for various incentives',
        ],
        commonCriticisms: [
          'May be overly confident in our ability to predict AI limitations',
          'Rapid progress in capabilities suggests caution',
          'The stakes of being wrong are extremely high',
        ],
        notableProponents: ['Yann LeCun', 'Andrew Ng', 'Rodney Brooks'],
        sources: [
          { title: 'The Seven Deadly Sins of AI Predictions', author: 'Rodney Brooks', type: 'article' },
        ],
      },
    ],
    commonMisconceptions: [
      'AI risk is about robots physically attacking humans',
      'All AI researchers agree on the level of risk',
      'AI safety concerns are new or fringe',
      'Worrying about AI risk means opposing AI development',
    ],
    relatedTopics: ['technology-governance', 'effective-altruism'],
  },
  {
    id: 'free-will',
    slug: 'free-will',
    title: 'Free Will',
    description: 'Do humans have genuine free will, or are our choices determined by prior causes? A question at the intersection of philosophy, neuroscience, and physics.',
    complexity: 4,
    category: 'Philosophy',
    keyQuestions: [
      {
        question: 'What do we mean by "free will"?',
        context: 'Different definitions lead to different conclusions. Libertarian free will differs from compatibilist conceptions.',
      },
      {
        question: 'Does determinism preclude moral responsibility?',
        context: 'Even if choices are determined, we might still hold people responsible.',
      },
      {
        question: 'What does neuroscience tell us about decision-making?',
        context: 'Studies like Libet\'s experiments are often cited but remain controversial.',
      },
    ],
    perspectives: [
      {
        id: 'free-will-libertarian',
        name: 'Libertarian Free Will',
        summary: 'Humans have genuine free will that is not determined by prior causes. We are the ultimate authors of our choices.',
        fullContent: `Libertarian free will (not to be confused with political libertarianism) holds that humans possess genuine freedom to choose between alternatives, and that this freedom is not reducible to deterministic physical processes.

**Agent causation**: Proponents argue that humans are agents capable of initiating causal chains. When you make a decision, you—as an agent—are the cause, not merely prior physical states.

**Phenomenology of choice**: Our lived experience strongly suggests we make genuine choices. When deliberating, we experience multiple possibilities as genuinely open. This experience deserves philosophical weight.

**Quantum indeterminacy**: Some argue that quantum mechanics introduces genuine randomness into the physical world, creating space for free will. While random events alone don't constitute freedom, they may break the chain of determinism.

**Moral responsibility**: Many argue that genuine moral responsibility requires libertarian free will. If our choices are determined, praise and blame seem inappropriate.

Philosophers like Robert Kane have developed sophisticated accounts of libertarian free will that attempt to address standard objections about randomness and causation.`,
        keyArguments: [
          'Our experience of choice strongly suggests genuine freedom',
          'Agent causation provides a coherent metaphysical picture',
          'Moral responsibility seems to require undetermined choice',
          'Quantum indeterminacy opens space for free will',
        ],
        commonCriticisms: [
          'Agent causation is mysterious and unexplained',
          'Quantum randomness does not equal freedom',
          'Neuroscience suggests decisions are made before we are aware of them',
          'No mechanism explains how mind affects physical brain',
        ],
        notableProponents: ['Robert Kane', 'Timothy O\'Connor', 'Roderick Chisholm'],
        sources: [
          { title: 'The Significance of Free Will', author: 'Robert Kane', type: 'book' },
        ],
      },
      {
        id: 'free-will-compatibilist',
        name: 'Compatibilism',
        summary: 'Free will and determinism are compatible. Freedom means acting according to our own desires without external coercion, which is possible in a deterministic universe.',
        fullContent: `Compatibilism, the most popular position among professional philosophers, argues that free will and determinism can coexist. The key is understanding what "free will" actually means.

**Redefining freedom**: Free will doesn't require being uncaused. It means acting according to your own desires, values, and reasoning without external compulsion. A choice is free if it flows from who you are.

**The real threat to freedom**: What makes us unfree is not determinism but coercion, manipulation, addiction, mental illness, or ignorance. A person acting on their authentic values is free, even if their values were shaped by prior causes.

**Moral responsibility preserved**: We can justifiably hold people responsible because doing so shapes behavior (theirs and others'). Praise and blame are inputs into the deterministic system that affect future choices.

**Practical coherence**: Compatibilism aligns with how we actually think about freedom in everyday life. We don't consider ourselves unfree merely because our choices have causes.

Philosophers like Daniel Dennett, Harry Frankfurt, and P.F. Strawson have developed influential compatibilist accounts that dominate contemporary discussions.`,
        keyArguments: [
          'Freedom is about acting on your own desires without coercion',
          'Our ordinary concept of free will does not require indeterminism',
          'Moral responsibility practices are justified by their effects',
          'The libertarian notion of free will may be incoherent',
        ],
        commonCriticisms: [
          'Redefines free will in a way that avoids the real question',
          'If desires are determined, acting on them isn\'t truly free',
          'Cannot ground the kind of moral responsibility we intuitively believe in',
          'Seems to justify punishment regardless of desert',
        ],
        notableProponents: ['Daniel Dennett', 'Harry Frankfurt', 'P.F. Strawson', 'Susan Wolf'],
        sources: [
          { title: 'Freedom Evolves', author: 'Daniel Dennett', type: 'book' },
          { title: 'Elbow Room', author: 'Daniel Dennett', type: 'book' },
        ],
      },
      {
        id: 'free-will-hard-determinism',
        name: 'Hard Determinism / Free Will Skepticism',
        summary: 'Free will is an illusion. Our choices are determined by prior causes, and this undermines moral responsibility as traditionally conceived.',
        fullContent: `Hard determinists and free will skeptics argue that free will, in any meaningful sense, does not exist. Our choices are the inevitable results of prior causes over which we have no ultimate control.

**Causal chain**: Every event, including brain events that constitute decisions, is caused by prior events according to natural laws. You did not choose your genes, your upbringing, your brain chemistry, or the experiences that shaped you. Given all these factors, your "choices" could not have been otherwise.

**Neuroscientific evidence**: Studies suggest that brain activity predicting a decision occurs before conscious awareness of that decision. The sense of choosing may be a post-hoc narrative.

**Ultimate responsibility**: To be truly responsible for a choice, you would need to be responsible for the factors that led to it—your character, desires, and reasoning abilities. But you cannot be responsible for these, as they were shaped by factors outside your control. This leads to an infinite regress.

**Implications for justice**: This view challenges retributive punishment. If people cannot ultimately help what they do, punishment for its own sake seems unjust. However, consequences that shape future behavior may still be justified.

Philosophers like Galen Strawson, Derk Pereboom, and neuroscientist Sam Harris have argued for this position.`,
        keyArguments: [
          'All events, including choices, are caused by prior events',
          'We cannot be ultimately responsible for our character or desires',
          'Neuroscience supports the view that conscious will is an illusion',
          'Retributive punishment cannot be justified without free will',
        ],
        commonCriticisms: [
          'Seems to undermine all moral and practical reasoning',
          'We cannot help but act as if we have free will',
          'May have harmful social consequences if widely believed',
          'The experience of choice is undeniable even if illusory',
        ],
        notableProponents: ['Galen Strawson', 'Derk Pereboom', 'Sam Harris', 'Neil Levy'],
        sources: [
          { title: 'Free Will', author: 'Sam Harris', type: 'book' },
          { title: 'Living Without Free Will', author: 'Derk Pereboom', type: 'book' },
        ],
      },
    ],
    commonMisconceptions: [
      'Determinism means fatalism (that our efforts don\'t matter)',
      'If free will doesn\'t exist, nothing matters',
      'The debate is settled by science',
      'All philosophers believe in free will',
    ],
    relatedTopics: ['consciousness', 'moral-responsibility'],
  },
  {
    id: 'economic-inequality',
    slug: 'economic-inequality',
    title: 'Economic Inequality',
    description: 'Is economic inequality a problem to be solved, a natural feature of markets, or something more nuanced? Views vary widely.',
    complexity: 3,
    category: 'Economics & Politics',
    keyQuestions: [
      {
        question: 'Is inequality inherently bad, or only bad when it causes other problems?',
        context: 'Some argue inequality itself is unjust; others focus on its effects.',
      },
      {
        question: 'What level of inequality is compatible with a healthy democracy?',
        context: 'Economic power can translate to political power.',
      },
      {
        question: 'Does reducing inequality require sacrificing economic growth?',
        context: 'The relationship between equality and prosperity is debated.',
      },
    ],
    perspectives: [
      {
        id: 'inequality-problem',
        name: 'Inequality as a Central Problem',
        summary: 'High economic inequality is inherently unjust and harmful to society. Significant redistribution is morally required.',
        fullContent: `This view holds that current levels of economic inequality are both unjust and harmful, requiring substantial policy intervention.

**Moral arguments**: Extreme wealth alongside poverty is inherently unjust. No one deserves billions while others lack basic necessities. The distribution of wealth reflects luck (birth circumstances, natural talents) more than merit.

**Democratic concerns**: Concentrated wealth translates to political power. The wealthy can influence elections, shape policy, and undermine democratic equality. This creates a self-reinforcing cycle.

**Social effects**: Inequality correlates with worse health outcomes, lower social mobility, higher crime, and reduced trust. More equal societies perform better on most measures of wellbeing.

**Economic arguments**: Extreme inequality may harm economic growth by reducing demand and opportunity. Money concentrated at the top doesn't circulate as effectively.

Advocates support progressive taxation, wealth taxes, strengthened labor rights, universal basic services, and policies that pre-distribute economic gains more equally.`,
        keyArguments: [
          'Current inequality levels are morally indefensible',
          'Wealth concentration undermines democracy',
          'More equal societies are healthier and happier',
          'Redistribution can enhance rather than harm growth',
        ],
        commonCriticisms: [
          'Focuses on relative rather than absolute welfare',
          'May reduce incentives for innovation and work',
          'Redistribution can be inefficient and create dependency',
          'Who decides what level of inequality is acceptable?',
        ],
        notableProponents: ['Thomas Piketty', 'Elizabeth Warren', 'Bernie Sanders', 'Joseph Stiglitz'],
        sources: [
          { title: 'Capital in the Twenty-First Century', author: 'Thomas Piketty', type: 'book' },
          { title: 'The Spirit Level', author: 'Wilkinson & Pickett', type: 'book' },
        ],
      },
      {
        id: 'inequality-natural',
        name: 'Inequality as Natural and Beneficial',
        summary: 'Economic inequality reflects differences in talent, effort, and value creation. Attempting to reduce it causes more harm than good.',
        fullContent: `This perspective views economic inequality as a natural outcome of free markets and differing individual contributions, with attempts to reduce it causing significant harms.

**Merit and incentives**: Unequal outcomes reflect unequal contributions. Those who create more value—through innovation, hard work, or skill—deserve greater rewards. These incentives drive economic dynamism.

**Poverty vs. inequality**: The focus should be on eliminating poverty, not inequality. A society where everyone is better off but some are much richer is preferable to one with more equality but less prosperity overall.

**Unintended consequences**: Redistribution policies often backfire—reducing work incentives, encouraging capital flight, creating bureaucratic waste, and breeding dependency.

**Freedom concerns**: Heavy taxation and redistribution infringe on economic liberty. People have rights to the fruits of their labor and voluntary exchanges.

**Natural variation**: Inequality exists in all societies because people differ in abilities, preferences, and luck. Attempts to override this create new injustices and inefficiencies.`,
        keyArguments: [
          'Inequality reflects differences in value created',
          'Incentives from unequal rewards drive innovation',
          'Redistribution reduces freedom and economic efficiency',
          'Absolute welfare matters more than relative position',
        ],
        commonCriticisms: [
          'Ignores role of luck, inheritance, and systemic barriers',
          'Extreme inequality undermines the legitimacy of the system',
          'Correlation between effort/talent and wealth is weak',
          'Freedom for some comes at cost to others',
        ],
        notableProponents: ['Milton Friedman', 'Robert Nozick', 'Thomas Sowell'],
        sources: [
          { title: 'Free to Choose', author: 'Milton & Rose Friedman', type: 'book' },
          { title: 'Anarchy, State, and Utopia', author: 'Robert Nozick', type: 'book' },
        ],
      },
      {
        id: 'inequality-nuanced',
        name: 'Nuanced View',
        summary: 'Some inequality is acceptable and even beneficial, but extreme inequality is harmful. Policy should focus on opportunity and preventing plutocracy.',
        fullContent: `This perspective tries to find middle ground, acknowledging both the benefits of market incentives and the dangers of extreme inequality.

**Threshold view**: Some inequality is fine—even beneficial for incentives. But beyond certain thresholds, it becomes harmful to democracy, social cohesion, and opportunity.

**Focus on opportunity**: Rather than equalizing outcomes, focus on equalizing opportunity—quality education, healthcare, and conditions for social mobility. Allow inequality of outcomes if the process is fair.

**Pre-distribution**: Rather than heavy redistribution after the fact, design institutions that create more equal distribution initially—competitive markets, strong labor rights, limits on rent-seeking.

**Context matters**: Optimal inequality levels may vary by society, development stage, and other factors. One-size-fits-all policies are misguided.

**Pragmatic balance**: Accept markets and incentives while maintaining a strong safety net, investing in public goods, and preventing capture of politics by wealth.`,
        keyArguments: [
          'Both extreme equality and extreme inequality are harmful',
          'Opportunity matters more than outcomes',
          'Pre-distribution is more efficient than redistribution',
          'Pragmatic policy beats ideological purity',
        ],
        commonCriticisms: [
          'May be unprincipled compromise rather than coherent position',
          'Difficult to determine the "right" level of inequality',
          '"Equality of opportunity" may be impossible without equality of outcome',
        ],
        notableProponents: ['John Rawls (interpreted)', 'Daron Acemoglu', 'Many centrist politicians'],
        sources: [
          { title: 'A Theory of Justice', author: 'John Rawls', type: 'book' },
          { title: 'Why Nations Fail', author: 'Acemoglu & Robinson', type: 'book' },
        ],
      },
    ],
    commonMisconceptions: [
      'All wealth is zero-sum (one person\'s gain is another\'s loss)',
      'Inequality has consistently increased everywhere',
      'The poor in rich countries are worse off than ever',
      'All economists agree on these questions',
    ],
    relatedTopics: ['taxation', 'social-mobility', 'democracy'],
  },
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return TOPICS.find(t => t.slug === slug);
}

export function getAllTopics(): Topic[] {
  return TOPICS;
}

export function getTopicsByCategory(category: string): Topic[] {
  return TOPICS.filter(t => t.category === category);
}

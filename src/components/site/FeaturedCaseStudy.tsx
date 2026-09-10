import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { NumberTicker } from "@/components/ui/number-ticker";

export interface FeaturedStudy {
  slug: string;
  title: string;
  client: string;
  summary: string;
  stack: string[];
  metrics: { value: number; suffix: string; label: string }[];
  liveUrl?: string;
}

export function FeaturedCaseStudy({ study }: { study: FeaturedStudy }) {
  return (
    <div className="bg-card relative overflow-hidden rounded-3xl border p-8 md:p-12">
      <BorderBeam size={250} duration={12} />
      <p className="text-primary font-mono text-xs tracking-widest uppercase">
        Featured work · {study.client}
      </p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
        {study.title}
      </h3>
      <p className="text-muted-foreground mt-3 max-w-2xl text-lg">
        {study.summary}
      </p>
      <dl className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
        {study.metrics.map((m) => (
          <div key={m.label}>
            <dd className="font-mono text-3xl font-semibold">
              <NumberTicker value={m.value} />
              {m.suffix}
            </dd>
            <dt className="text-muted-foreground mt-1 text-sm">{m.label}</dt>
          </div>
        ))}
      </dl>
      <ul className="mt-8 flex flex-wrap gap-2">
        {study.stack.map((s) => (
          <li
            key={s}
            className="rounded-full border px-3 py-1 font-mono text-xs"
          >
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <a href={`/work/${study.slug}`}>Read the case study</a>
        </Button>
        {study.liveUrl && (
          <Button asChild variant="outline">
            <a href={study.liveUrl} target="_blank" rel="noreferrer">
              Open the live app
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}

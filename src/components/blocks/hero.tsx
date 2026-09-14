import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative py-28 lg:py-32 lg:pt-44">
      <div className="relative container max-w-4xl text-center">
        <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
          Ottawa · custom web apps · one engineer
        </p>

        <h1 className="text-foreground mt-6 text-4xl tracking-tight text-balance md:text-5xl lg:text-6xl">
          Software built around how your business actually works.
        </h1>

        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-snug text-balance md:text-xl">
          Quoting tools, customer portals, internal dashboards and automations
          for local businesses. Fixed quotes, working demos every week, and you
          always talk to the person writing the code.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <a href="/contact">Start a project</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="/work">See the work</a>
          </Button>
        </div>

        <a
          href="/work/measure-blinds"
          className="text-muted-foreground hover:text-foreground mt-8 inline-flex items-center gap-1.5 font-mono text-xs transition-colors"
        >
          Recent: a field estimator for Blinds Nisa — 400+ commits in 10 weeks
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

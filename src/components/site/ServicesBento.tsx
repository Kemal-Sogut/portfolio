import { ServiceGlyph } from "@/components/diagrams/glyphs";
import { BlurFade } from "@/components/ui/blur-fade";

export interface ServiceTile {
  id: string;
  title: string;
  tagline: string;
  order: number;
}

export function ServicesBento({ services }: { services: ServiceTile[] }) {
  const sorted = [...services].sort((a, b) => a.order - b.order);
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {sorted.map((s, i) => {
        const wide = i === 0 ? "md:col-span-2" : "";
        return (
          <BlurFade key={s.id} delay={0.05 * i} inView className={wide}>
            <a
              href={`/services#${s.id}`}
              className="bg-card hover:border-primary/50 flex h-full flex-col rounded-2xl border p-6 transition-colors"
            >
              <ServiceGlyph
                service={s.id}
                delay={0.05 * i}
                className="text-diagram-line size-9"
              />
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-snug">
                {s.tagline}
              </p>
            </a>
          </BlurFade>
        );
      })}
    </div>
  );
}

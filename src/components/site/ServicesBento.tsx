import {
  Globe,
  LayoutDashboard,
  Receipt,
  Ruler,
  Users,
  Workflow,
} from "lucide-react";

import { BlurFade } from "@/components/ui/blur-fade";

const ICONS = {
  Ruler,
  LayoutDashboard,
  Users,
  Receipt,
  Workflow,
  Globe,
} as const;

export interface ServiceTile {
  id: string;
  title: string;
  tagline: string;
  icon: keyof typeof ICONS;
  order: number;
}

export function ServicesBento({ services }: { services: ServiceTile[] }) {
  const sorted = [...services].sort((a, b) => a.order - b.order);
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {sorted.map((s, i) => {
        const Icon = ICONS[s.icon];
        const wide = i === 0 ? "md:col-span-2" : "";
        return (
          <BlurFade key={s.id} delay={0.05 * i} inView className={wide}>
            <a
              href={`/services#${s.id}`}
              className="bg-card hover:border-primary/50 flex h-full flex-col rounded-2xl border p-6 transition-colors"
            >
              <Icon className="text-primary size-6" aria-hidden="true" />
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

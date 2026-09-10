import { Marquee } from "@/components/ui/marquee";
import { TRUSTED_BY } from "@/consts";

export const Logos = () => (
  <section className="border-y py-8">
    <p className="text-muted-foreground mb-4 text-center font-mono text-xs tracking-widest uppercase">
      Built for
    </p>
    <Marquee pauseOnHover className="[--duration:30s]">
      {TRUSTED_BY.map((name) => (
        <span
          key={name}
          className="mx-8 text-lg font-semibold tracking-tight opacity-70"
        >
          {name}
        </span>
      ))}
    </Marquee>
  </section>
);

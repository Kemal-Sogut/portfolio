"use client";

import { useId } from "react";

import {
  Diagram,
  DFade,
  DLine,
} from "@/components/diagrams/Diagram";

/**
 * A drafting grid behind the hero. Purely
 * decorative, so it carries no title and is hidden from assistive tech.
 *
 * The grid is an SVG pattern rather than hundreds of drawn lines, and the
 * edge fade is an SVG mask rather than a CSS one: a CSS mask-image on the
 * wrapper composites the whole layer away here, whichever colour it uses.
 */
export function HeroBlueprint() {
  const uid = useId().replace(/:/g, "");
  const gridId = `blueprint-grid-${uid}`;
  const fadeId = `blueprint-fade-${uid}`;
  const maskId = `blueprint-mask-${uid}`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <Diagram
        viewBox="0 0 1200 640"
        preserveAspectRatio="xMidYMid slice"
        strokeWidth={2}
        stagger={0.12}
        delay={0.15}
        className="text-diagram-line absolute inset-0 h-full w-full"
      >
        <defs>
          <pattern
            id={gridId}
            width={48}
            height={48}
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M48 0H0V48"
              fill="none"
              stroke="currentColor"
              strokeWidth={0.75}
            />
          </pattern>
          {/* Object-bounding-box units, so the circle stretches to the
              viewBox and the fade comes out elliptical. */}
          <radialGradient id={fadeId} cx="50%" cy="45%" r="58%">
            <stop offset="42%" stopColor="#fff" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
          <mask id={maskId}>
            <rect width={1200} height={640} fill={`url(#${fadeId})`} />
          </mask>
        </defs>

        <g mask={`url(#${maskId})`}>
          <DFade duration={0.8} className="text-diagram-muted">
            <rect width={1200} height={640} fill={`url(#${gridId})`} />
          </DFade>

          {/* Registration cross, the way a drawing sheet is keyed. */}
          <DLine x1={984} y1={580} x2={1024} y2={580} />
          <DLine x1={1004} y1={560} x2={1004} y2={600} />
        </g>
      </Diagram>
    </div>
  );
}

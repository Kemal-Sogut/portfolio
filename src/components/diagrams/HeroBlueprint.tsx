"use client";

import { useId } from "react";

import {
  DArrowHead,
  DDashedLine,
  Diagram,
  DFade,
  DLine,
  DText,
} from "@/components/diagrams/Diagram";

/**
 * A drafting grid with a few dimension lines behind the hero. Purely
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

          {/* Dimension lines live in the gutters either side of the copy.
              The text column is close to full width on a narrow viewport, so
              anything drawn inside it would collide. */}
          <DLine x1={178} y1={200} x2={214} y2={200} />
          <DLine x1={178} y1={520} x2={214} y2={520} />
          <DDashedLine x1={196} y1={208} x2={196} y2={512} duration={1} />
          <DArrowHead x={196} y={512} size={5} direction="down" />
          <DArrowHead x={196} y={208} size={5} direction="up" />
          <DText
            x={216}
            y={360}
            textAnchor="middle"
            fontSize={13}
            transform="rotate(-90 216 360)"
          >
            your process
          </DText>

          <DLine x1={986} y1={248} x2={1022} y2={248} />
          <DLine x1={986} y1={472} x2={1022} y2={472} />
          <DDashedLine x1={1004} y1={256} x2={1004} y2={464} duration={0.8} />

          {/* Registration cross, the way a drawing sheet is keyed. */}
          <DLine x1={984} y1={580} x2={1024} y2={580} />
          <DLine x1={1004} y1={560} x2={1004} y2={600} />
        </g>
      </Diagram>
    </div>
  );
}

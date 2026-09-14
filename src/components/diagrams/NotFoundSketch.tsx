"use client";

import {
  DArrowHead,
  DDashedLine,
  Diagram,
  DLine,
  DPath,
  DText,
} from "@/components/diagrams/Diagram";

/** A dimension that does not match the thing it measures. */
export function NotFoundSketch() {
  return (
    <Diagram
      viewBox="0 0 320 172"
      stagger={0.12}
      className="text-diagram-line mx-auto max-w-xs"
    >
      {/* Three sides drawn, the fourth never found. */}
      <DPath
        d="M240 26 H46 a6 6 0 0 0-6 6 V106 a6 6 0 0 0 6 6 H240"
        duration={1.2}
      />
      <DDashedLine
        x1={240}
        y1={26}
        x2={240}
        y2={112}
        dash="5 5"
        className="text-diagram-muted"
      />

      {/* The dimension overshoots the box it is supposed to measure. */}
      <DLine x1={40} y1={126} x2={40} y2={154} />
      <DLine x1={288} y1={126} x2={288} y2={154} />
      {/* Broken either side of the label, the way a dimension is annotated. */}
      <DDashedLine
        x1={48}
        y1={140}
        x2={146}
        y2={140}
        dash="4 4"
        duration={0.4}
      />
      <DDashedLine
        x1={280}
        y1={140}
        x2={182}
        y2={140}
        dash="4 4"
        duration={0.4}
      />
      <DArrowHead x={280} y={140} size={4} />
      <DArrowHead x={48} y={140} size={4} direction="left" />
      <DText
        x={164}
        y={136}
        textAnchor="middle"
        fontSize={13}
        className="text-diagram-accent"
      >
        404
      </DText>
    </Diagram>
  );
}

"use client";

import {
  DArrowHead,
  DCircle,
  DDashedLine,
  Diagram,
  DGroup,
  DLine,
  DRect,
  DText,
} from "@/components/diagrams/Diagram";

/** A cabinet elevation and an app screen, drawn the same way and dimensioned alike. */
export function ShopToSoftware() {
  return (
    <Diagram
      viewBox="0 0 560 236"
      stagger={0.1}
      title="The same job drawn twice: a cabinet elevation with its dimension line, and the software that prices it, dimensioned the same way."
      className="text-diagram-line"
    >
      {/* Cabinet elevation. */}
      <DGroup stagger={0.06}>
        <DRect x={20} y={28} width={200} height={148} rx={3} />
        <DLine x1={120} y1={28} x2={120} y2={176} />
        <DLine
          x1={108}
          y1={96}
          x2={108}
          y2={116}
          className="text-diagram-accent"
        />
        <DLine
          x1={132}
          y1={96}
          x2={132}
          y2={116}
          className="text-diagram-accent"
        />
        <DLine
          x1={20}
          y1={186}
          x2={20}
          y2={208}
          className="text-diagram-muted"
        />
        <DLine
          x1={220}
          y1={186}
          x2={220}
          y2={208}
          className="text-diagram-muted"
        />
        <DDashedLine
          x1={28}
          y1={198}
          x2={212}
          y2={198}
          dash="4 4"
          duration={0.5}
        />
        <DArrowHead x={212} y={198} size={4} />
        <DArrowHead x={28} y={198} size={4} direction="left" />
        <DText x={120} y={228} textAnchor="middle" fontSize={11}>
          shop drawing
        </DText>
      </DGroup>

      <DDashedLine
        x1={244}
        y1={102}
        x2={306}
        y2={102}
        dash="5 5"
        duration={0.4}
      />
      <DArrowHead x={312} y={102} size={5} />

      {/* The same job as a screen. */}
      <DGroup stagger={0.06}>
        <DRect x={336} y={28} width={204} height={148} rx={8} />
        <DLine x1={336} y1={56} x2={540} y2={56} />
        <DCircle cx={348} cy={42} r={2.5} className="text-diagram-muted" />
        <DCircle cx={358} cy={42} r={2.5} className="text-diagram-muted" />
        <DLine
          x1={352}
          y1={76}
          x2={470}
          y2={76}
          className="text-diagram-muted"
        />
        <DLine
          x1={352}
          y1={96}
          x2={508}
          y2={96}
          className="text-diagram-muted"
        />
        <DLine
          x1={352}
          y1={116}
          x2={444}
          y2={116}
          className="text-diagram-muted"
        />
        <DRect
          x={352}
          y={136}
          width={76}
          height={22}
          rx={5}
          className="text-diagram-accent"
        />
        <DLine
          x1={336}
          y1={186}
          x2={336}
          y2={208}
          className="text-diagram-muted"
        />
        <DLine
          x1={540}
          y1={186}
          x2={540}
          y2={208}
          className="text-diagram-muted"
        />
        <DDashedLine
          x1={344}
          y1={198}
          x2={532}
          y2={198}
          dash="4 4"
          duration={0.5}
        />
        <DArrowHead x={532} y={198} size={4} />
        <DArrowHead x={344} y={198} size={4} direction="left" />
        <DText x={438} y={228} textAnchor="middle" fontSize={11}>
          the same job, in software
        </DText>
      </DGroup>
    </Diagram>
  );
}

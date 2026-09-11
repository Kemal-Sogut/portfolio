"use client";

import { motion, useReducedMotion } from "motion/react";

import {
  DDashedLine,
  Diagram,
  DGroup,
  DLine,
  DText,
} from "@/components/diagrams/Diagram";

const TRACK = { x: 20, width: 560, y: 44, height: 30 };
const AXIS_Y = 88;

const SEGMENTS = [
  { pct: 40, label: "Start" },
  { pct: 40, label: "Working demo" },
  { pct: 20, label: "Launch" },
];

/** Fills rather than draws, since the point is the proportion, not the outline. */
function Segment({
  x,
  width,
  duration,
}: {
  x: number;
  width: number;
  duration: number;
}) {
  return (
    <motion.rect
      x={x}
      y={TRACK.y}
      height={TRACK.height}
      rx={4}
      className="fill-diagram-surface stroke-current"
      variants={{
        hidden: { width: 0, opacity: 0 },
        visible: {
          width,
          opacity: 1,
          transition: {
            width: { duration, ease: "easeOut" },
            opacity: { duration: 0.15 },
          },
        },
      }}
    />
  );
}

/**
 * The 40 / 40 / 20 milestone split, drawn as one bar. Each segment's width is
 * its share of the price, so the picture is the payment schedule.
 */
export function BillingBar() {
  const reduce = useReducedMotion();
  let cursor = TRACK.x;

  return (
    <Diagram
      viewBox="0 0 600 112"
      stagger={0.22}
      title="Billing is split into three milestones: 40 percent to start, 40 percent at the working demo, and 20 percent at launch."
      className="text-diagram-line mx-auto max-w-xl"
    >
      {SEGMENTS.map((seg) => {
        const width = (seg.pct / 100) * TRACK.width;
        const x = cursor;
        cursor += width;
        const mid = x + width / 2;

        return (
          <DGroup key={seg.label} stagger={0.05}>
            <Segment x={x} width={width} duration={reduce ? 0 : 0.5} />
            <DText
              x={mid}
              y={36}
              textAnchor="middle"
              fontSize={15}
              className="text-diagram-accent font-mono"
            >
              {`${seg.pct}%`}
            </DText>
            <DText
              x={mid}
              y={106}
              textAnchor="middle"
              fontSize={11}
              className="text-muted-foreground font-mono"
            >
              {seg.label}
            </DText>
            {x > TRACK.x && (
              <DDashedLine
                x1={x}
                y1={TRACK.y - 6}
                x2={x}
                y2={AXIS_Y}
                dash="3 3"
                duration={0.25}
                className="text-diagram-muted"
              />
            )}
          </DGroup>
        );
      })}

      <DLine x1={TRACK.x} y1={AXIS_Y} x2={TRACK.x + TRACK.width} y2={AXIS_Y} />
      <DLine x1={TRACK.x} y1={AXIS_Y - 5} x2={TRACK.x} y2={AXIS_Y + 5} />
      <DLine
        x1={TRACK.x + TRACK.width}
        y1={AXIS_Y - 5}
        x2={TRACK.x + TRACK.width}
        y2={AXIS_Y + 5}
      />
    </Diagram>
  );
}

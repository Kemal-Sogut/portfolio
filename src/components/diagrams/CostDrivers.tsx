"use client";

import { motion, useReducedMotion } from "motion/react";

import {
  DArrowHead,
  Diagram,
  DGroup,
  DLine,
  DText,
} from "@/components/diagrams/Diagram";

const TRACK = { x: 10, width: 300 };
const ROWS = [44, 94, 144, 194];

/** Rough, not measured: how far each one typically pushes a quote. */
const DRIVERS = [
  { label: "Payments and integrations", at: 0.82 },
  { label: "Documents and emails to generate", at: 0.64 },
  { label: "Number of user roles", at: 0.46 },
  { label: "Data migration from spreadsheets", at: 0.34 },
];

function Knob({ y, at, reduce }: { y: number; at: number; reduce: boolean }) {
  const target = TRACK.x + at * TRACK.width;
  return (
    <motion.circle
      cy={y}
      r={6}
      className="fill-diagram-surface stroke-current"
      variants={{
        hidden: { cx: TRACK.x, opacity: 0 },
        visible: {
          cx: target,
          opacity: 1,
          transition: {
            cx: { duration: reduce ? 0 : 0.6, ease: "easeOut" },
            opacity: { duration: 0.15 },
          },
        },
      }}
    />
  );
}

/** The four things that move a quote, drawn as levers on a shared scale. */
export function CostDrivers() {
  const reduce = useReducedMotion();

  return (
    <Diagram
      viewBox="0 0 320 224"
      stagger={0.14}
      title="Four things move a quote the most: payments and integrations, documents and emails to generate, the number of user roles, and migrating data from spreadsheets."
      className="text-diagram-line"
    >
      {DRIVERS.map((driver, i) => (
        <DGroup key={driver.label} stagger={0.05}>
          <DText x={TRACK.x} y={ROWS[i] - 12} fontSize={10}>
            {driver.label}
          </DText>
          <DLine
            x1={TRACK.x}
            y1={ROWS[i]}
            x2={TRACK.x + TRACK.width}
            y2={ROWS[i]}
            className="text-diagram-muted"
            duration={0.4}
          />
          <DLine
            x1={TRACK.x}
            y1={ROWS[i] - 5}
            x2={TRACK.x}
            y2={ROWS[i] + 5}
            duration={0.2}
          />
          <DLine
            x1={TRACK.x + TRACK.width}
            y1={ROWS[i] - 5}
            x2={TRACK.x + TRACK.width}
            y2={ROWS[i] + 5}
            duration={0.2}
          />
          <Knob y={ROWS[i]} at={driver.at} reduce={!!reduce} />
        </DGroup>
      ))}

      <DText x={TRACK.x} y={218} fontSize={9} className="text-muted-foreground">
        less effect on price
      </DText>
      <DText
        x={TRACK.x + TRACK.width - 14}
        y={218}
        textAnchor="end"
        fontSize={9}
        className="text-muted-foreground"
      >
        more
      </DText>
      <DArrowHead
        x={TRACK.x + TRACK.width}
        y={215}
        size={3}
        duration={0.2}
        className="text-muted-foreground"
      />
    </Diagram>
  );
}

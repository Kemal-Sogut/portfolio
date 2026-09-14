"use client";

import { DCircle, Diagram, DLine } from "@/components/diagrams/Diagram";

export interface TimelineEntry {
  when: string;
  what: string;
}

/**
 * The spine is split per entry rather than drawn as one line, so each segment
 * stretches to its own row's height. preserveAspectRatio is off for the line
 * and on for the dot, because a stretched circle would come out an ellipse.
 */
function Spine({ last }: { last: boolean }) {
  return (
    <>
      {!last && (
        <div className="absolute top-4 bottom-0 left-1/2 w-px -translate-x-1/2">
          <Diagram
            viewBox="0 0 2 100"
            preserveAspectRatio="none"
            strokeWidth={2}
            className="text-diagram-muted h-full w-full"
          >
            <DLine x1={1} y1={0} x2={1} y2={100} duration={0.5} />
          </Diagram>
        </div>
      )}
      <div className="absolute top-1 left-1/2 size-3 -translate-x-1/2">
        <Diagram viewBox="0 0 12 12" className="h-full w-full">
          <DCircle
            cx={6}
            cy={6}
            r={4}
            className="fill-background text-diagram-accent"
            duration={0.4}
          />
        </Diagram>
      </div>
    </>
  );
}

export function Timeline({ items }: { items: TimelineEntry[] }) {
  return (
    <ol className="space-y-6">
      {items.map((item, i) => (
        <li key={item.when + item.what} className="flex gap-5">
          <div className="relative w-3 shrink-0">
            <Spine last={i === items.length - 1} />
          </div>
          <div className="pb-1">
            <p className="text-muted-foreground font-mono text-xs">
              {item.when}
            </p>
            <p className="mt-1 text-sm">{item.what}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

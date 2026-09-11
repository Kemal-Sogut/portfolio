"use client";

import type { ComponentProps } from "react";

import {
  DArrowHead,
  DCircle,
  DDashedLine,
  Diagram,
  DLine,
  DPath,
  DRect,
} from "@/components/diagrams/Diagram";
import { cn } from "@/lib/utils";

/**
 * One glyph per service, all drawn on the same 32-unit grid so they read as a
 * set. Used at three sizes: the bento tiles, the service nav pills, and the
 * faint watermark on case-study cards.
 */

const Quoting = () => (
  <>
    <DRect x={4} y={4} width={24} height={15} rx={1.5} />
    <DLine x1={4} y1={9.5} x2={28} y2={9.5} className="text-diagram-muted" />
    <DLine x1={4} y1={14} x2={28} y2={14} className="text-diagram-muted" />
    <DLine x1={4} y1={23} x2={4} y2={29} />
    <DLine x1={28} y1={23} x2={28} y2={29} />
    <DDashedLine
      x1={5}
      y1={26}
      x2={27}
      y2={26}
      dash="3 3"
      className="text-diagram-accent"
    />
  </>
);

const InternalTools = () => (
  <>
    <DRect x={3} y={5} width={26} height={22} rx={2} />
    <DLine x1={3} y1={10} x2={29} y2={10} />
    <DRect
      x={6}
      y={13}
      width={11}
      height={11}
      rx={1}
      className="text-diagram-muted"
    />
    <DLine
      x1={8.5}
      y1={21.5}
      x2={8.5}
      y2={18}
      className="text-diagram-accent"
    />
    <DLine
      x1={11.5}
      y1={21.5}
      x2={11.5}
      y2={16}
      className="text-diagram-accent"
    />
    <DLine
      x1={14.5}
      y1={21.5}
      x2={14.5}
      y2={19}
      className="text-diagram-accent"
    />
    <DRect
      x={20}
      y={13}
      width={6}
      height={4.5}
      rx={1}
      className="text-diagram-muted"
    />
    <DRect
      x={20}
      y={19.5}
      width={6}
      height={4.5}
      rx={1}
      className="text-diagram-muted"
    />
  </>
);

const Portals = () => (
  <>
    <DRect x={3} y={5} width={26} height={22} rx={2} />
    <DLine x1={3} y1={10} x2={29} y2={10} />
    <DCircle cx={12} cy={16} r={3} className="text-diagram-accent" />
    <DPath
      d="M6.5 23.5a5.5 5.5 0 0 1 11 0"
      className="text-diagram-accent"
    />
    <DLine x1={21} y1={15} x2={26} y2={15} className="text-diagram-muted" />
    <DLine x1={21} y1={19} x2={26} y2={19} className="text-diagram-muted" />
    <DLine x1={21} y1={23} x2={24} y2={23} className="text-diagram-muted" />
  </>
);

const Invoicing = () => (
  <>
    <DPath d="M7 4 H25 V25 l-3-2 -3 2 -3-2 -3 2 -3-2 -3 2 Z" duration={1.1} />
    <DLine x1={11} y1={10} x2={21} y2={10} className="text-diagram-muted" />
    <DLine x1={11} y1={14} x2={21} y2={14} className="text-diagram-muted" />
    <DLine x1={11} y1={18} x2={17} y2={18} className="text-diagram-accent" />
  </>
);

const Automation = () => (
  <>
    <DCircle cx={7} cy={9} r={3.5} />
    <DCircle cx={25} cy={9} r={3.5} />
    <DCircle cx={16} cy={23} r={3.5} className="text-diagram-accent" />
    <DDashedLine
      x1={10.5}
      y1={9}
      x2={21.5}
      y2={9}
      dash="3 3"
      className="text-diagram-muted"
    />
    <DDashedLine
      x1={8.5}
      y1={12}
      x2={13.5}
      y2={20.3}
      dash="3 3"
      className="text-diagram-muted"
    />
    <DDashedLine
      x1={23.5}
      y1={12}
      x2={18.5}
      y2={20.3}
      dash="3 3"
      className="text-diagram-muted"
    />
  </>
);

const Websites = () => (
  <>
    <DRect x={3} y={5} width={26} height={22} rx={2} />
    <DLine x1={3} y1={10} x2={29} y2={10} />
    <DCircle cx={6.5} cy={7.5} r={0.9} className="text-diagram-muted" />
    <DCircle cx={9.5} cy={7.5} r={0.9} className="text-diagram-muted" />
    <DRect
      x={7}
      y={13}
      width={18}
      height={4.5}
      rx={1}
      className="text-diagram-muted"
    />
    <DLine x1={7} y1={20.5} x2={15} y2={20.5} className="text-diagram-muted" />
    <DLine
      x1={21}
      y1={19.5}
      x2={21}
      y2={22.5}
      className="text-diagram-accent"
    />
    <DArrowHead
      x={21}
      y={23.5}
      direction="down"
      size={2}
      className="text-diagram-accent"
    />
    <DLine x1={18} y1={25.5} x2={24} y2={25.5} />
  </>
);

const SHAPES = {
  quoting: Quoting,
  "internal-tools": InternalTools,
  portals: Portals,
  invoicing: Invoicing,
  automation: Automation,
  websites: Websites,
} as const;

export type ServiceId = keyof typeof SHAPES;

export const isServiceId = (v: string): v is ServiceId => v in SHAPES;

type ServiceGlyphProps = Omit<
  ComponentProps<typeof Diagram>,
  "viewBox" | "children"
> & { service: string };

export function ServiceGlyph({
  service,
  className,
  ...rest
}: ServiceGlyphProps) {
  const Shape = isServiceId(service) ? SHAPES[service] : SHAPES.websites;

  return (
    <Diagram
      viewBox="0 0 32 32"
      stagger={0.05}
      className={cn("size-8", className)}
      {...rest}
    >
      <Shape />
    </Diagram>
  );
}

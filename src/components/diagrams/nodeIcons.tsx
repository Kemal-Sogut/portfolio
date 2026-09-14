"use client";

import {
  DCircle,
  DLine,
  DPath,
  DPolyline,
  DRect,
} from "@/components/diagrams/Diagram";

/**
 * Mini icons for diagram nodes. Each draws on a 24-unit grid and returns bare
 * elements, so it can be dropped into any diagram's coordinate space through
 * NodeIcon below. They use the D* primitives, so they draw on with everything
 * else rather than needing their own animation.
 */

const muted = "text-diagram-muted";
const accent = "text-diagram-accent";

const Tablet = () => (
  <>
    <DRect x={5} y={2} width={14} height={20} rx={2} />
    <DLine x1={8} y1={7} x2={16} y2={7} className={muted} />
    <DLine x1={8} y1={11} x2={16} y2={11} className={muted} />
    <DLine x1={8} y1={15} x2={13} y2={15} className={accent} />
  </>
);

const Calculator = () => (
  <>
    <DRect x={4} y={2} width={16} height={20} rx={2} />
    <DRect x={7} y={5} width={10} height={4} rx={1} className={muted} />
    <DCircle cx={8} cy={13} r={0.9} className={muted} />
    <DCircle cx={12} cy={13} r={0.9} className={muted} />
    <DCircle cx={16} cy={13} r={0.9} className={muted} />
    <DCircle cx={8} cy={17.5} r={0.9} className={muted} />
    <DCircle cx={12} cy={17.5} r={0.9} className={muted} />
    <DCircle cx={16} cy={17.5} r={0.9} className={accent} />
  </>
);

const Doc = () => (
  <>
    <DPath d="M6 2h8l4 4v16H6z" duration={1} />
    <DPath d="M14 2v4h4" className={muted} />
    <DLine x1={9} y1={11} x2={15} y2={11} className={muted} />
    <DLine x1={9} y1={15} x2={15} y2={15} className={muted} />
    <DLine x1={9} y1={19} x2={12} y2={19} className={accent} />
  </>
);

const Check = () => (
  <>
    <DCircle cx={12} cy={12} r={9} />
    <DPolyline points="8,12 11,15 16,9" className={accent} />
  </>
);

const Form = () => (
  <>
    <DRect x={3} y={4} width={18} height={16} rx={2} />
    <DLine x1={6} y1={9} x2={18} y2={9} className={muted} />
    <DRect x={6} y={12} width={12} height={4} rx={1} className={muted} />
    <DLine x1={8} y1={13} x2={8} y2={15} className={accent} />
  </>
);

const Database = () => (
  <>
    <DPath d="M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3z" />
    <DPath d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" duration={1} />
    <DPath d="M19 12c0 1.7-3.1 3-7 3s-7-1.3-7-3" className={muted} />
  </>
);

const Chart = () => (
  <>
    <DPolyline points="4,3 4,20 21,20" />
    <DLine x1={8} y1={20} x2={8} y2={14} className={accent} />
    <DLine x1={12.5} y1={20} x2={12.5} y2={9} className={accent} />
    <DLine x1={17} y1={20} x2={17} y2={12} className={accent} />
  </>
);

const Person = () => (
  <>
    <DCircle cx={12} cy={8} r={4} />
    <DPath d="M4 21a8 8 0 0 1 16 0" />
  </>
);

const Card = () => (
  <>
    <DRect x={2} y={5} width={20} height={14} rx={2} />
    <DLine x1={2} y1={10} x2={22} y2={10} />
    <DLine x1={6} y1={15} x2={11} y2={15} className={accent} />
  </>
);

const Calendar = () => (
  <>
    <DRect x={3} y={5} width={18} height={16} rx={2} />
    <DLine x1={3} y1={10} x2={21} y2={10} />
    <DLine x1={8} y1={3} x2={8} y2={7} />
    <DLine x1={16} y1={3} x2={16} y2={7} />
    <DCircle cx={9} cy={15} r={1} className={muted} />
    <DCircle cx={13} cy={15} r={1} className={accent} />
  </>
);

const Mail = () => (
  <>
    <DRect x={2} y={5} width={20} height={14} rx={2} />
    <DPolyline points="3,7 12,13.5 21,7" className={accent} />
  </>
);

const Clock = () => (
  <>
    <DCircle cx={12} cy={12} r={9} />
    <DPolyline points="12,7 12,12 16,14" className={accent} />
  </>
);

/** Rounded: raw trig output serialises differently on the server and the
 *  client, which trips React's hydration check. */
const round = (n: number) => Math.round(n * 100) / 100;

const COG_TEETH = Array.from({ length: 6 }, (_, i) => {
  const a = (i * Math.PI) / 3;
  return {
    x1: round(12 + Math.cos(a) * 6.5),
    y1: round(12 + Math.sin(a) * 6.5),
    x2: round(12 + Math.cos(a) * 9.5),
    y2: round(12 + Math.sin(a) * 9.5),
  };
});

const Cog = () => (
  <>
    <DCircle cx={12} cy={12} r={4.5} className={accent} />
    {COG_TEETH.map((t, i) => (
      <DLine key={i} {...t} duration={0.25} />
    ))}
  </>
);

const Globe = () => (
  <>
    <DCircle cx={12} cy={12} r={9} />
    <DLine x1={3} y1={12} x2={21} y2={12} className={muted} />
    <DPath d="M12 3c3 3.2 3 14.8 0 18" className={muted} />
    <DPath d="M12 3c-3 3.2-3 14.8 0 18" className={muted} />
  </>
);

const Browser = () => (
  <>
    <DRect x={2} y={4} width={20} height={16} rx={2} />
    <DLine x1={2} y1={9} x2={22} y2={9} />
    <DCircle cx={5} cy={6.5} r={0.8} className={muted} />
    <DCircle cx={7.5} cy={6.5} r={0.8} className={muted} />
  </>
);

const Server = () => (
  <>
    <DRect x={3} y={4} width={18} height={6} rx={1.5} />
    <DRect x={3} y={14} width={18} height={6} rx={1.5} />
    <DCircle cx={7} cy={7} r={0.9} className={accent} />
    <DCircle cx={7} cy={17} r={0.9} className={accent} />
  </>
);

const Inbox = () => (
  <>
    <DPath
      d="M3 13l2.5-7h13L21 13v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
      duration={1}
    />
    <DPolyline
      points="3,13 9,13 10.5,15.5 13.5,15.5 15,13 21,13"
      className={accent}
    />
  </>
);

export const NODE_ICONS = {
  tablet: Tablet,
  calculator: Calculator,
  doc: Doc,
  check: Check,
  form: Form,
  database: Database,
  chart: Chart,
  person: Person,
  card: Card,
  calendar: Calendar,
  mail: Mail,
  clock: Clock,
  cog: Cog,
  globe: Globe,
  browser: Browser,
  server: Server,
  inbox: Inbox,
} as const;

export type NodeIconName = keyof typeof NODE_ICONS;

/** Places a 24-grid icon at an arbitrary spot in a bigger diagram. */
export function NodeIcon({
  name,
  x,
  y,
  size = 24,
}: {
  name: NodeIconName;
  x: number;
  y: number;
  size?: number;
}) {
  const Icon = NODE_ICONS[name];
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 24})`}>
      <Icon />
    </g>
  );
}

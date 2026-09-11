"use client";

import {
  DArrowHead,
  DDashedLine,
  Diagram,
  DGroup,
  DRect,
  DText,
} from "@/components/diagrams/Diagram";
import { NodeIcon, type NodeIconName } from "@/components/diagrams/nodeIcons";
import { cn } from "@/lib/utils";

export interface FlowNode {
  icon: NodeIconName;
  /** One line per array entry. SVG does not wrap text, so the break is explicit. */
  lines: string[];
}

interface FlowProps {
  nodes: FlowNode[];
  /** Required. A flow that carries meaning has to be readable without sight. */
  title: string;
  className?: string;
}

const H = { node: 104, height: 84, gap: 44, pad: 6 };
const V = { width: 260, node: 248, height: 68, gap: 34, pad: 6 };

function HorizontalFlow({ nodes, title, className }: FlowProps) {
  const width = nodes.length * H.node + (nodes.length - 1) * H.gap + H.pad * 2;
  const midY = H.pad + H.height / 2;

  return (
    <Diagram
      viewBox={`0 0 ${width} ${H.height + H.pad * 2}`}
      title={title}
      stagger={0.14}
      className={className}
    >
      {nodes.map((node, i) => {
        const x = H.pad + i * (H.node + H.gap);
        const cx = x + H.node / 2;
        const connectorFrom = x + H.node + 7;
        const connectorTo = connectorFrom + H.gap - 20;

        return (
          <DGroup key={i}>
            <DRect
              x={x}
              y={H.pad}
              width={H.node}
              height={H.height}
              rx={10}
              className="text-diagram-muted"
            />
            <NodeIcon name={node.icon} x={cx - 13} y={H.pad + 12} size={26} />
            {node.lines.map((line, j) => (
              <DText
                key={j}
                x={cx}
                y={H.pad + 52 + j * 12}
                textAnchor="middle"
                fontSize={10}
              >
                {line}
              </DText>
            ))}
            {i < nodes.length - 1 && (
              <>
                <DDashedLine
                  x1={connectorFrom}
                  y1={midY}
                  x2={connectorTo}
                  y2={midY}
                  dash="4 4"
                  duration={0.35}
                />
                <DArrowHead x={connectorTo + 5} y={midY} size={4} />
              </>
            )}
          </DGroup>
        );
      })}
    </Diagram>
  );
}

function VerticalFlow({ nodes, title, className }: FlowProps) {
  const height =
    nodes.length * V.height + (nodes.length - 1) * V.gap + V.pad * 2;
  const midX = V.pad + V.node / 2;

  return (
    <Diagram
      viewBox={`0 0 ${V.width} ${height}`}
      title={title}
      stagger={0.14}
      className={className}
    >
      {nodes.map((node, i) => {
        const y = V.pad + i * (V.height + V.gap);
        const textTop = y + (node.lines.length === 1 ? 38 : 31);
        const connectorFrom = y + V.height + 7;
        const connectorTo = connectorFrom + V.gap - 20;

        return (
          <DGroup key={i}>
            <DRect
              x={V.pad}
              y={y}
              width={V.node}
              height={V.height}
              rx={10}
              className="text-diagram-muted"
            />
            <NodeIcon name={node.icon} x={V.pad + 16} y={y + 22} size={24} />
            {node.lines.map((line, j) => (
              <DText key={j} x={V.pad + 54} y={textTop + j * 13} fontSize={11}>
                {line}
              </DText>
            ))}
            {i < nodes.length - 1 && (
              <>
                <DDashedLine
                  x1={midX}
                  y1={connectorFrom}
                  x2={midX}
                  y2={connectorTo}
                  dash="4 4"
                  duration={0.35}
                />
                <DArrowHead
                  x={midX}
                  y={connectorTo + 5}
                  size={4}
                  direction="down"
                />
              </>
            )}
          </DGroup>
        );
      })}
    </Diagram>
  );
}

/**
 * A row of labelled nodes joined by dashed arrows. Renders wide on desktop and
 * stacked on mobile, because scaling the wide version down to a phone would
 * shrink the mono labels past legibility.
 */
export function Flow({ nodes, title, className }: FlowProps) {
  return (
    <>
      <HorizontalFlow
        nodes={nodes}
        title={title}
        className={cn("hidden md:block", className)}
      />
      <VerticalFlow
        nodes={nodes}
        title={title}
        className={cn("mx-auto max-w-[280px] md:hidden", className)}
      />
    </>
  );
}

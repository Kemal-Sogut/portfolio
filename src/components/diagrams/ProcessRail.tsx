"use client";

import {
  DArrowHead,
  DCircle,
  DDashedLine,
  Diagram,
  DGroup,
  DLine,
  DText,
} from "@/components/diagrams/Diagram";

export interface ProcessStep {
  n: string;
  title: string;
  text: string;
}

const NODES = [125, 375, 625, 875];

/**
 * The four project stages as nodes on a drawn rail, with the detail in HTML
 * cards underneath. The rail is decorative: every step number and title it
 * shows is also in the list below, so it stays hidden from assistive tech.
 */
export function ProcessRail({ steps }: { steps: ProcessStep[] }) {
  return (
    <div>
      <Diagram
        viewBox="0 0 1000 72"
        stagger={0.16}
        className="text-diagram-line hidden md:block"
      >
        {steps.slice(0, 4).map((step, i) => {
          const cx = NODES[i];
          const next = NODES[i + 1];

          return (
            <DGroup key={step.n}>
              <DCircle cx={cx} cy={30} r={17} />
              <DText
                x={cx}
                y={34.5}
                textAnchor="middle"
                fontSize={13}
                className="text-diagram-accent font-mono"
              >
                {step.n}
              </DText>
              {/* Tie-down to the card below. */}
              <DLine
                x1={cx}
                y1={47}
                x2={cx}
                y2={66}
                className="text-diagram-muted"
                duration={0.3}
              />
              {next !== undefined && (
                <>
                  <DDashedLine
                    x1={cx + 24}
                    y1={30}
                    x2={next - 30}
                    y2={30}
                    dash="5 5"
                    duration={0.45}
                  />
                  <DArrowHead x={next - 24} y={30} size={5} />
                </>
              )}
            </DGroup>
          );
        })}
      </Diagram>

      <ol className="grid gap-6 md:mt-4 md:grid-cols-4">
        {steps.map((step) => (
          <li key={step.n} className="rounded-2xl border p-6">
            <span className="text-primary font-mono text-sm md:hidden">
              {step.n}
            </span>
            <h3 className="text-lg font-semibold max-md:mt-2">{step.title}</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-snug">
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

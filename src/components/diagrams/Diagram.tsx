"use client";

import type { ComponentProps, ReactNode } from "react";

import { motion, useReducedMotion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Strokes draw themselves along their own length. `custom` carries the
 * duration, so a caller can slow one element down without touching the rest.
 */
export const drawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (duration: number = 0.8) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration, ease: "easeInOut" },
      opacity: { duration: 0.12 },
    },
  }),
};

/** Text and filled shapes have no path length, so they fade instead. */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (duration: number = 0.8) => ({
    opacity: 1,
    transition: { duration: Math.min(duration, 0.45) },
  }),
};

type DiagramProps = Omit<ComponentProps<typeof motion.svg>, "children"> & {
  viewBox: string;
  children: ReactNode;
  /** Seconds between one element starting to draw and the next. */
  stagger?: number;
  delay?: number;
  /**
   * Screen-reader description. Diagrams that carry meaning must set it;
   * decorative ones leave it off and are hidden from assistive tech.
   */
  title?: string;
};

/**
 * The one wrapper every line-art diagram uses. It owns the viewBox, the shared
 * stroke defaults, and the draw-on animation. Children are the D* primitives
 * below, which inherit the animation through variants.
 *
 * Drawing starts on mount rather than through motion's whileInView. Astro
 * already gates this with client:visible, which hydrates the island exactly
 * when it scrolls into view, so mount is the moment we want. Using both meant
 * an island that was already on screen at hydration never got its first
 * observer callback and stayed invisible.
 */
export function Diagram({
  viewBox,
  children,
  stagger = 0.08,
  delay = 0,
  title,
  className,
  ...rest
}: DiagramProps) {
  const reduce = useReducedMotion();

  const motionProps = reduce
    ? { initial: "visible" as const }
    : { initial: "hidden" as const, animate: "visible" as const };

  return (
    <motion.svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduce ? 0 : stagger,
            delayChildren: reduce ? 0 : delay,
          },
        },
      }}
      className={cn("text-diagram-line h-auto w-full", className)}
      {...motionProps}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </motion.svg>
  );
}

type WithDuration<T> = T & { duration?: number };

export function DPath({
  duration = 0.8,
  ...props
}: WithDuration<ComponentProps<typeof motion.path>>) {
  return <motion.path variants={drawVariants} custom={duration} {...props} />;
}

export function DLine({
  duration = 0.5,
  ...props
}: WithDuration<ComponentProps<typeof motion.line>>) {
  return <motion.line variants={drawVariants} custom={duration} {...props} />;
}

export function DRect({
  duration = 0.9,
  ...props
}: WithDuration<ComponentProps<typeof motion.rect>>) {
  return <motion.rect variants={drawVariants} custom={duration} {...props} />;
}

export function DCircle({
  duration = 0.6,
  ...props
}: WithDuration<ComponentProps<typeof motion.circle>>) {
  return <motion.circle variants={drawVariants} custom={duration} {...props} />;
}

export function DPolyline({
  duration = 0.7,
  ...props
}: WithDuration<ComponentProps<typeof motion.polyline>>) {
  return (
    <motion.polyline variants={drawVariants} custom={duration} {...props} />
  );
}

/** Mono caption inside a diagram. Fades, because text has no path length. */
export function DText({
  duration = 0.3,
  className,
  ...props
}: WithDuration<ComponentProps<typeof motion.text>>) {
  return (
    <motion.text
      variants={fadeVariants}
      custom={duration}
      stroke="none"
      fill="currentColor"
      fontSize={9}
      className={cn("font-mono", className)}
      {...props}
    />
  );
}

/** A filled shape or any element that should appear rather than draw. */
export function DFade({
  duration = 0.35,
  ...props
}: WithDuration<ComponentProps<typeof motion.g>>) {
  return <motion.g variants={fadeVariants} custom={duration} {...props} />;
}

/**
 * Groups related elements so they draw as a unit, and keeps the stagger
 * flowing to its children rather than stopping at the group.
 */
export function DGroup({
  stagger = 0.06,
  children,
  ...props
}: ComponentProps<typeof motion.g> & { stagger?: number }) {
  return (
    <motion.g
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      {...props}
    >
      {children}
    </motion.g>
  );
}

/**
 * A dashed connector. Animating pathLength would fight the dash pattern, since
 * motion implements pathLength with stroke-dasharray, so this grows the line by
 * moving its end point instead. The dashes extend as it goes.
 */
export function DDashedLine({
  x1,
  y1,
  x2,
  y2,
  dash = "5 4",
  duration = 0.6,
  ...props
}: Omit<ComponentProps<typeof motion.line>, "variants"> & {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dash?: string;
  duration?: number;
}) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      strokeDasharray={dash}
      variants={{
        hidden: { x2: x1, y2: y1, opacity: 0 },
        visible: {
          x2,
          y2,
          opacity: 1,
          transition: {
            duration,
            ease: "easeInOut",
            opacity: { duration: 0.1 },
          },
        },
      }}
      {...props}
    />
  );
}

/** Chevron arrowhead. Drawn explicitly so it themes and draws like everything else. */
export function DArrowHead({
  x,
  y,
  size = 4,
  direction = "right",
  duration = 0.25,
  ...props
}: WithDuration<
  // SVG elements carry their own x, y and direction attributes, which would
  // otherwise widen these into string | number | MotionValue.
  Omit<
    ComponentProps<typeof motion.polyline>,
    "points" | "x" | "y" | "direction"
  >
> & {
  x: number;
  y: number;
  size?: number;
  direction?: "right" | "left" | "up" | "down";
}) {
  const points = {
    right: `${x - size},${y - size} ${x},${y} ${x - size},${y + size}`,
    left: `${x + size},${y - size} ${x},${y} ${x + size},${y + size}`,
    down: `${x - size},${y - size} ${x},${y} ${x + size},${y - size}`,
    up: `${x - size},${y + size} ${x},${y} ${x + size},${y + size}`,
  }[direction];

  return (
    <motion.polyline
      points={points}
      variants={drawVariants}
      custom={duration}
      {...props}
    />
  );
}

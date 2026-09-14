"use client";

import { Flow, type FlowNode } from "@/components/diagrams/Flow";

/**
 * What each service actually does to the data, one schematic per service.
 * Labels stay short because SVG text does not wrap.
 */
const FLOWS: Record<string, { title: string; nodes: FlowNode[] }> = {
  quoting: {
    title:
      "A quote flows from measurements taken on a tablet, through your pricing rules, into a branded PDF the customer confirms.",
    nodes: [
      { icon: "tablet", lines: ["Measure", "on site"] },
      { icon: "calculator", lines: ["Your pricing", "rules"] },
      { icon: "doc", lines: ["Branded", "PDF"] },
      { icon: "check", lines: ["Customer", "confirms"] },
    ],
  },
  "internal-tools": {
    title:
      "Staff enter data once into a shared record, which feeds a live dashboard and exportable reports.",
    nodes: [
      { icon: "form", lines: ["Staff enter", "once"] },
      { icon: "database", lines: ["One shared", "record"] },
      { icon: "chart", lines: ["Live", "dashboard"] },
      { icon: "doc", lines: ["Export", "or report"] },
    ],
  },
  portals: {
    title:
      "A customer signs in, sees their own order, pays a deposit and books an install time without calling.",
    nodes: [
      { icon: "person", lines: ["Customer", "signs in"] },
      { icon: "doc", lines: ["Sees their", "order"] },
      { icon: "card", lines: ["Pays a", "deposit"] },
      { icon: "calendar", lines: ["Books the", "install"] },
    ],
  },
  invoicing: {
    title:
      "An estimate becomes an invoice, is paid online, sends its own receipt, and stays searchable afterwards.",
    nodes: [
      { icon: "doc", lines: ["Estimate"] },
      { icon: "card", lines: ["Invoice", "paid online"] },
      { icon: "mail", lines: ["Receipt", "sent"] },
      { icon: "database", lines: ["Filed and", "searchable"] },
    ],
  },
  automation: {
    title:
      "A schedule or an event triggers a rule, which sends the message and logs that it went out.",
    nodes: [
      { icon: "clock", lines: ["Schedule", "or event"] },
      { icon: "cog", lines: ["Rule", "runs"] },
      { icon: "mail", lines: ["Email or", "SMS sent"] },
      { icon: "check", lines: ["Logged,", "not dropped"] },
    ],
  },
  websites: {
    title:
      "A fast public site captures a lead, drops it in your inbox, and reports what actually converted.",
    nodes: [
      { icon: "globe", lines: ["Fast public", "site"] },
      { icon: "form", lines: ["Lead", "form"] },
      { icon: "inbox", lines: ["Your", "inbox"] },
      { icon: "chart", lines: ["What", "converted"] },
    ],
  },
};

export function ServiceDiagram({ service }: { service: string }) {
  const flow = FLOWS[service];
  if (!flow) return null;
  return <Flow nodes={flow.nodes} title={flow.title} />;
}

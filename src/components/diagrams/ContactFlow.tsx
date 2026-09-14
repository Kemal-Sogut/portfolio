"use client";

import { Flow } from "@/components/diagrams/Flow";

/** What happens after the form is submitted, so sending feels less like a void. */
export function ContactFlow() {
  return (
    <Flow
      title="You send a few sentences, it lands in my inbox, and you get a reply within one business day."
      nodes={[
        { icon: "form", lines: ["You send three", "sentences"] },
        { icon: "inbox", lines: ["Lands in", "my inbox"] },
        { icon: "clock", lines: ["Reply in one", "business day"] },
      ]}
    />
  );
}

"use client";

import { useState } from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type Value = true | null | string;

interface Feature {
  name: string;
  website: Value;
  app: Value;
  care: Value;
}

const pricingPlans = [
  { id: "website", name: "Website", cta: "Start a website" },
  { id: "app", name: "Custom web app", cta: "Scope my app" },
  { id: "care", name: "Care plan", cta: "Ask about care plans" },
];

const comparisonFeatures: Feature[] = [
  { name: "Free scoping call", website: true, app: true, care: true },
  { name: "Fixed quote", website: true, app: true, care: "monthly" },
  { name: "Mobile-first UI", website: true, app: true, care: null },
  { name: "Logins & roles", website: null, app: true, care: null },
  {
    name: "PDFs, emails, documents",
    website: "forms only",
    app: true,
    care: null,
  },
  {
    name: "Payments / integrations",
    website: null,
    app: "optional",
    care: null,
  },
  { name: "Hosting & monitoring", website: "setup", app: "setup", care: true },
  { name: "Backups & updates", website: null, app: "30 days", care: true },
  {
    name: "Changes included",
    website: "30 days",
    app: "30 days",
    care: "8 h/mo on $600 plan",
  },
];

const renderFeatureValue = (value: Value) => {
  if (value === true) {
    return (
      <>
        <Check className="size-5" aria-hidden="true" />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === null) {
    return (
      <>
        <span className="text-muted-foreground" aria-hidden="true">
          —
        </span>
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <Check className="size-4 shrink-0" aria-hidden="true" />
      <span className="text-muted-foreground">{value}</span>
    </div>
  );
};

const valuesFor = (f: Feature): Value[] => [f.website, f.app, f.care];

export const PricingTable = () => {
  const [selectedPlan, setSelectedPlan] = useState(1); // Default to the custom web app

  return (
    <PlanComparison
      selectedPlan={selectedPlan}
      onPlanChange={setSelectedPlan}
    />
  );
};

const PlanComparison = ({
  selectedPlan,
  onPlanChange,
}: {
  selectedPlan: number;
  onPlanChange: (index: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Mobile view: one plan at a time */}
      <div className="md:hidden">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex items-center justify-between gap-3 border-b py-4">
            <CollapsibleTrigger className="flex items-center gap-2">
              <h3 className="text-xl font-semibold">
                {pricingPlans[selectedPlan].name}
              </h3>
              <ChevronsUpDown
                className={`size-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </CollapsibleTrigger>
            <Button asChild variant="outline" className="w-fit shrink-0">
              <a href={`/contact?type=${pricingPlans[selectedPlan].id}`}>
                {pricingPlans[selectedPlan].cta}
              </a>
            </Button>
          </div>
          <CollapsibleContent className="flex flex-col space-y-2 p-2">
            {pricingPlans.map(
              (plan, index) =>
                index !== selectedPlan && (
                  <Button
                    size="lg"
                    variant="secondary"
                    key={plan.id}
                    onClick={() => {
                      onPlanChange(index);
                      setIsOpen(false);
                    }}
                  >
                    {plan.name}
                  </Button>
                ),
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Desktop view: all three plans */}
      <div className="grid grid-cols-4 gap-4 max-md:hidden">
        <div className="col-span-1"></div>
        {pricingPlans.map((plan) => (
          <div key={plan.id}>
            <h3 className="mb-3 text-xl font-semibold">{plan.name}</h3>
            <Button asChild variant="outline">
              <a href={`/contact?type=${plan.id}`}>{plan.cta}</a>
            </Button>
          </div>
        ))}
      </div>

      <div className="border-primary/40 border-b py-4">
        <h3 className="text-lg font-semibold">What&rsquo;s included</h3>
      </div>

      {comparisonFeatures.map((feature) => (
        <div
          key={feature.name}
          className="text-foreground grid grid-cols-2 font-medium max-md:border-b md:grid-cols-4"
        >
          <span className="inline-flex items-center py-4">{feature.name}</span>

          {/* Mobile: selected plan only */}
          <div className="md:hidden">
            <div className="flex items-center gap-1 py-4">
              {renderFeatureValue(valuesFor(feature)[selectedPlan])}
            </div>
          </div>

          {/* Desktop: every plan */}
          <div className="hidden md:col-span-3 md:grid md:grid-cols-3 md:gap-4">
            {valuesFor(feature).map((value, i) => (
              <div
                key={pricingPlans[i].id}
                className="flex items-center gap-1 border-b py-4"
              >
                {renderFeatureValue(value)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

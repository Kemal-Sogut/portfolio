import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Tier {
  id: string;
  name: string;
  price: string;
  period?: string;
  blurb: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  timeline?: string;
}

export const Pricing = ({
  tiers,
  className,
}: {
  tiers: Tier[];
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid items-start gap-5 text-start md:grid-cols-3",
        className,
      )}
    >
      {tiers.map((tier) => (
        <Card
          key={tier.id}
          className={
            tier.highlighted ? "outline-primary origin-top outline-4" : ""
          }
        >
          <CardContent className="flex flex-col gap-7 px-6 py-5">
            <div className="space-y-2">
              <h3 className="text-foreground font-semibold">{tier.name}</h3>
              <div className="text-muted-foreground text-lg font-medium">
                {tier.price}
                {tier.period && (
                  <span className="text-muted-foreground">{tier.period}</span>
                )}
              </div>
              <p className="text-muted-foreground text-sm">{tier.blurb}</p>
              {tier.timeline && (
                <p className="text-primary font-mono text-xs">
                  {tier.timeline}
                </p>
              )}
            </div>

            <div className="space-y-3">
              {tier.features.map((feature) => (
                <div
                  key={feature}
                  className="text-muted-foreground flex items-start gap-1.5"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              asChild
              className="w-fit"
              variant={tier.highlighted ? "default" : "outline"}
            >
              <a href={`/contact?type=${tier.id}`}>{tier.cta}</a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

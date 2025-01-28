import { QuickActionType } from "@/constant";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

const ActionCard = ({
  action,
  handleQuickAction,
}: {
  action: QuickActionType;
  handleQuickAction: (title: string) => void;
}) => {
  return (
    <Card
      onClick={() => handleQuickAction(action.title)}
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        "bg-card border border-border/50",
        "hover:-translate-y-1 hover:shadow-lg hover:border-border"
      )}
    >
      <CardContent className="p-6">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-30 transition-opacity duration-300",
            action.gradient,
            "group-hover:opacity-50"
          )}
        />
        <div className="relative z-10">
          <div
            className={cn(
              "w-10 h-10 rounded-lg mb-4 flex items-center justify-center transition-colors duration-300",
              {
                "bg-primary text-primary-foreground":
                  action.color === "primary",
                "bg-purple-500 text-white": action.color === "purple-500",
                "bg-blue-500 text-white": action.color === "blue-500",
                "bg-orange-500 text-white": action.color === "orange-500",
              }
            )}
          >
            <action.icon className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-lg text-foreground mb-1 transition-colors duration-300 group-hover:text-primary">
            {action.title}
          </h3>
          <p className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
            {action.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionCard;

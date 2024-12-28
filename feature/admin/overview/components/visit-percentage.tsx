import { Progress } from "@/components/ui/progress";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const visitPercentageVariant = cva("*:rounded-r-xl h-2", {
    variants: {
        variant: {
            male: "*:bg-orange-500",
            female: "*:bg-blue-700",
            "non-binary": "*:bg-green-500",
            others: "*:bg-red-600",
            anonymous: "*:bg-rose-700",
        },
    },
});

export type VisitPercentageVariant = VariantProps<typeof visitPercentageVariant>["variant"];

const VisitPercentage = ({
    value,
    variant,
}: {
    value: number;
    variant?: VisitPercentageVariant;
}) => {
    return <Progress value={value} className={cn(visitPercentageVariant({ variant }))} />;
};

export default VisitPercentage;

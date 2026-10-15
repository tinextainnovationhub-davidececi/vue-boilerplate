import { cva, type VariantProps } from "class-variance-authority";

export const inputVariants = cva(
  "w-full rounded-control border bg-background px-3 text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: { sm: "h-8 text-sm", md: "h-10 text-sm", lg: "h-12 text-base" },
      invalid: { true: "border-destructive", false: "border-border" },
    },
    defaultVariants: { size: "md", invalid: false },
  },
);

export type InputVariants = VariantProps<typeof inputVariants>;

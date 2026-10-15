import { cva, type VariantProps } from "class-variance-authority";

export const spinnerVariants = cva(
  "inline-block animate-spin rounded-full border-2 border-current border-t-transparent",
  {
    variants: { size: { sm: "size-4", md: "size-6", lg: "size-10" } },
    defaultVariants: { size: "md" },
  },
);

export type SpinnerVariants = VariantProps<typeof spinnerVariants>;

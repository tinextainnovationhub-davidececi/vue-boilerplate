import { cva, type VariantProps } from "class-variance-authority";

export const headingVariants = cva("font-sans tracking-tight text-balance text-foreground", {
  variants: {
    level: {
      1: "text-4xl font-extrabold lg:text-5xl",
      2: "text-3xl font-semibold",
      3: "text-2xl font-semibold",
      4: "text-xl font-semibold",
      5: "text-lg font-semibold",
      6: "text-base font-semibold",
    },
  },
  defaultVariants: { level: 1 },
});

export const textVariants = cva("font-sans", {
  variants: {
    variant: {
      body: "text-base leading-7 text-foreground",
      lead: "text-xl leading-8 text-muted-foreground",
      small: "text-sm leading-5 font-medium text-foreground",
      muted: "text-sm leading-5 text-muted-foreground",
    },
  },
  defaultVariants: { variant: "body" },
});

export type HeadingVariants = VariantProps<typeof headingVariants>;
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type TextVariants = VariantProps<typeof textVariants>;
export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "span" | "p";
export type TextTag = "p" | "span" | "div" | "small" | "label";

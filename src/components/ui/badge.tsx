// components/ui/badge.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// 👇 Setup cva with variants
const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-transparent",
        secondary: "bg-secondary text-secondary-foreground border-transparent",
        destructive: "bg-destructive text-destructive-foreground border-transparent",
        outline: "text-foreground border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// ✅ This includes the 'variant' prop in type
export interface BadgeProps extends
  React.HTMLAttributes<HTMLDivElement> {
  variant?: VariantProps<typeof badgeVariants>['variant']
}

    const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
      ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    )
  }
)

Badge.displayName = "Badge"

export { Badge, badgeVariants }

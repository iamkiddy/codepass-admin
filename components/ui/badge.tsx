import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primaryColor text-white shadow hover:bg-primaryColor/90",
        secondary:
          "border-transparent bg-secondaryColor text-white shadow hover:bg-secondaryColor/90",
        success:
          "border-transparent bg-emerald-500 text-white shadow hover:bg-emerald-600",
        destructive:
          "border-transparent bg-red-500 text-white shadow hover:bg-red-600",
        outline: 
          "border border-primaryColor text-primaryColor hover:bg-primaryColor/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

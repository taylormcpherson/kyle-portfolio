import { SanityTagVariants } from "@/lib/sanity/queries"
import { Badge, BadgeProps } from "@chakra-ui/react"
import { FC } from "react"

interface TagProps extends BadgeProps {
  variant: SanityTagVariants;
  size?: "sm" | "md"
}

export const Tag: FC<Readonly<TagProps>> = ({
  variant,
  size = "sm",
  children,
  ...props
}) => {
  return (
    <Badge variant={variant} size={size} {...props}>
      {children}
    </Badge>
  )
}

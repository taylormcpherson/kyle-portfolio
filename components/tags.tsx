import { Badge, BadgeProps } from "@chakra-ui/react"
import { FC } from "react"

interface TagProps extends BadgeProps {
  name: string
}

export const Tag: FC<Readonly<TagProps>> = ({ name, ...props }) => {
  if (name === "sql") {
    return (
      <Badge key={name} colorScheme="purple" fontSize="sm" {...props}>
        SQL
      </Badge>
    )
  }
  if (name === "excel") {
    return (
      <Badge key={name} colorScheme="cyan" fontSize="sm" {...props}>
        Excel
      </Badge>
    )
  }
  if (name === "r") {
    return (
      <Badge key={name} colorScheme="green" fontSize="sm" {...props}>
        R
      </Badge>
    )
  }
  return (
    <Badge key={name} fontSize="sm" {...props}>
      {name}
    </Badge>
  )
}

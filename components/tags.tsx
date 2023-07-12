import { Badge, BadgeProps } from "@chakra-ui/react"
import { FC } from "react"

interface TagProps extends BadgeProps {
  name: string
}

export const Tag: FC<Readonly<TagProps>> = ({ name, ...props }) => {
  if (name === "sql") {
    return (
      <Badge
        colorScheme="purple"
        fontSize={{ base: "xs", md: "sm" }}
        {...props}
      >
        SQL
      </Badge>
    )
  }
  if (name === "excel") {
    return (
      <Badge colorScheme="green" fontSize={{ base: "xs", md: "sm" }} {...props}>
        Excel
      </Badge>
    )
  }
  if (name === "r") {
    return (
      <Badge
        colorScheme="orange"
        fontSize={{ base: "xs", md: "sm" }}
        {...props}
      >
        R
      </Badge>
    )
  }
  if (name === "tableau") {
    return (
      <Badge colorScheme="cyan" fontSize={{ base: "xs", md: "sm" }} {...props}>
        Tableau
      </Badge>
    )
  }

  if (name === "python") {
    return (
      <Badge
        colorScheme="yellow"
        fontSize={{ base: "xs", md: "sm" }}
        {...props}
      >
        Python
      </Badge>
    )
  }
  return (
    <Badge fontSize={{ base: "xs", md: "sm" }} {...props}>
      {name}
    </Badge>
  )
}

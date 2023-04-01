import { FC } from "react"
import { LinkProps, Icon } from "@chakra-ui/react"
import { faGithub, faKaggle } from "@fortawesome/free-brands-svg-icons"
import { faLineChart, faLink } from "@fortawesome/free-solid-svg-icons"
import { ProjectLinkProps } from "@/lib/sanity/queries"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "./link"

export const ProjectLink: FC<
  Readonly<LinkProps & ProjectLinkProps & { showText?: boolean }>
> = ({ url, host, text, showText = false, ...props }) => {
  let icon = faLink
  let linkText = text ?? "Learn more"

  if (host === "github") {
    icon = faGithub
    linkText = "Github"
  } else if (host === "kaggle") {
    icon = faKaggle
    linkText = "Kaggle"
  } else if (host === "tableau") {
    icon = faLineChart
    linkText = "Tableau"
  }

  return (
    <Link
      aria-label={linkText}
      href={url}
      variant="green"
      display="flex"
      gap={1}
      alignItems="center"
      {...props}
    >
      <Icon as={FontAwesomeIcon} boxSize={4} icon={icon} />
      {showText && linkText}
    </Link>
  )
}

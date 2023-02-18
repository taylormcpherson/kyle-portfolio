import { FC } from "react";
import Image from "next/image";
import NextLink from "next/link";

import styles from "../styles/Card.module.css";
import { ProjectPreview } from "@/lib/sanity/queries";

export const Card: FC<Readonly<ProjectPreview>> = ({ title, subtitle, slug, imageUrl, imageAlt }) => (
  <li className={styles.card}>
    <NextLink href={slug}>
      View project
    </NextLink>
    <h3>{title}</h3>
    <p className={styles.description}>{subtitle}</p>
    <p className={styles.cta}>
      View project →
    </p>
    <div className={styles.imageContainer}>
      <Image className={styles.image} src={imageUrl} alt={imageAlt ?? title} fill />
    </div>
  </li>
)


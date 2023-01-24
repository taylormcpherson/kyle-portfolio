import { FC } from "react";
import NextImage from "next/image";
import NextLink from "next/link";

import styles from "../styles/Card.module.css";
import { ProjectPreview } from "@/lib/sanity/queries";

export const Card: FC<Readonly<ProjectPreview>> = ({ title, subtitle, slug, imageUrl, imageAlt }) => (
  <li className={styles.card}>
    <NextLink className={styles.linkOverlay} href={slug}>
      View project
    </NextLink>
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.description}>{subtitle}</p>
    <p className={styles.link}>
      View project →
    </p>
    <div className={styles.imageContainer}>
      <NextImage className={styles.image} src={imageUrl} alt={imageAlt ?? title} fill />
    </div>
  </li>
)


import { FC } from "react";
import NextImage from "next/image";
import NextLink from "next/link";

import styles from "../styles/Card.module.css";
import { ProjectPreview } from "@/lib/sanity/queries";

export const Card: FC<Readonly<ProjectPreview>> = ({ title, subtitle, slug, imageUrl, imageAlt }) => (
  <li className={styles.card}>
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.description}>{subtitle}</p>
    <NextLink className={styles.link} href={slug} target="_blank" rel="noopener noreferrer">
      View project →
    </NextLink>
    <div className={styles.imageContainer}>
      <NextImage className={styles.image} src={imageUrl} alt={imageAlt ?? title} fill />
    </div>
  </li>
)


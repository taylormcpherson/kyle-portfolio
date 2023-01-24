import { FC } from "react";
import NextImage, { StaticImageData } from "next/image";
import NextLink from "next/link";

import styles from "../styles/Card.module.css";

interface CardProps {
    title: string;
    description: string;
    url: string;
    cta?: { title: string; url: string; };
    img: StaticImageData;
    imgAlt: string;
}

export const Card: FC<Readonly<CardProps>> = ({ title, description, url, cta, img, imgAlt }) => (
    <li className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.ctaContainer}>
        <NextLink className={styles.link} href={url} target="_blank" rel="noopener noreferrer">view it live →</NextLink>
        {cta && (
            <NextLink className={styles.link} href={cta.url} target="_blank" rel="noopener noreferrer">{cta.title} →</NextLink>
        )}
      </div>
      <div className={styles.imageContainer}>
        <NextImage className={styles.image} src={img} alt={imgAlt} fill />
      </div>
    </li>
)


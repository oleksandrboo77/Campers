"use client";

import Link from "next/link";
import styles from "./CamperCard.module.css";
import type { Camper, GalleryImage } from "../../lib/types";
import { useCampersStore } from "../../store/store";
import { formatPrice } from "../../lib/utils";
import { getCamperFeatures } from "../../lib/camperFeatures";

interface CamperCardProps {
  camper: Camper;
}

function getImageUrl(value: string | GalleryImage | undefined): string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  return value.original || value.thumb || null;
}

function trimmText(text: string, maxChars: number) {
  if (!text) return "";
  if (text.length <= maxChars) return text;

  const sliced = text.slice(0, maxChars);
  const lastSpace = sliced.lastIndexOf(" ");
  return (
    (lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced).trimEnd() + "..."
  );
}

export default function CamperCard({ camper }: CamperCardProps) {
  const { toggleFavorite, isFavorite } = useCampersStore();
  const favorite = isFavorite(camper.id);

  const firstImage = getImageUrl(camper.gallery?.[0]);
  const features = getCamperFeatures(camper);

  const shortDescription = trimmText(camper.description, 65);

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {firstImage && (
          <img
            src={firstImage}
            alt={camper.name}
            className={styles.cardimage}
          />
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.headerRow}>
            <h3 className={styles.cardtitle}>{camper.name}</h3>
            <div className={styles.priceBlock}>
              <span className={styles.price}>€{formatPrice(camper.price)}</span>
              <button
                type="button"
                className={styles.favoriteButton}
                onClick={() => toggleFavorite(camper.id)}
              >
                {favorite ? (
                  <svg className={styles.heaartIcon} aria-hidden="true">
                    <use href="/icons.svg#pressed_heart" />
                  </svg>
                ) : (
                  <svg className={styles.heaartIcon} aria-hidden="true">
                    <use href="/icons.svg#default_heart" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className={styles.metaRow}>
            <span className={styles.rating}>
              <svg className={styles.starIcon} aria-hidden="true">
                <use href="/icons.svg#pressed_star" />
              </svg>
              {camper.rating.toFixed(1)} ({camper.reviews?.length ?? 0} reviews)
            </span>

            <div className={styles.location}>
              <svg className={styles.mapIcon} aria-hidden="true">
                <use href="/icons.svg#map" />
              </svg>
              {camper.location}
            </div>
          </div>
        </div>

        <p className={styles.description}>{shortDescription}</p>

        {features.length > 0 && (
          <div className={styles.badges}>
            {features.map((feature) => (
              <div key={feature.key} className={styles.badge}>
                <svg className={styles.badgeIcon} aria-hidden="true">
                  <use href={feature.iconHref} />
                </svg>
                <span>{feature.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className={styles.footer}>
          <Link href={`/catalog/${camper.id}`}>
            <button type="button" className={styles.showMore}>
              Show more
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
}

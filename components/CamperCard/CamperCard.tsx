"use client";

import Link from "next/link";
import styles from "./CamperCard.module.css";
import type { Camper, GalleryImage } from "../../lib/types";
import { useCampersStore } from "../../store/store";
import { formatPrice } from "../../lib/utils";

interface CamperCardProps {
  camper: Camper;
}

function getImageUrl(value: string | GalleryImage | undefined): string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  return value.original || value.thumb || null;
}

export default function CamperCard({ camper }: CamperCardProps) {
  const { toggleFavorite, isFavorite } = useCampersStore();
  const favorite = isFavorite(camper.id);

  const firstImage = getImageUrl(camper.gallery?.[0]);


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

          <span className={styles.location}>{camper.location}</span>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.badges}>
          {camper.transmission && (
            <span className={styles.badge}>{camper.transmission}</span>
          )}
          {camper.engine && (
            <span className={styles.badge}>{camper.engine}</span>
          )}
          {camper.AC && <span className={styles.badge}>AC</span>}
          {camper.kitchen && <span className={styles.badge}>Kitchen</span>}
          {camper.bathroom && <span className={styles.badge}>Bathroom</span>}
          {camper.TV && <span className={styles.badge}>TV</span>}
        </div>

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

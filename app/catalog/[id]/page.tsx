"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Header from "../../../components/Header/Header";
import Features from "../../../components/Features/Features";
import FeedbackList from "../../../components/FeedbackList/FeedbackList";
import BookingForm from "../../../components/BookingForm/BookingForm";
import { fetchCamperById } from "../../../lib/api";
import type { Camper, GalleryImage } from "../../../lib/types";
import styles from "./CamperPage.module.css";

type Tab = "features" | "feedback";

function getImageUrl(value: string | GalleryImage | undefined): string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  return value.original || value.thumb || null;
}

export default function CamperPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [camper, setCamper] = useState<Camper | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("features");

  useEffect(() => {
    if (!id) return;

    const loadCamper = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchCamperById(id);
        setCamper(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load camper");
        setCamper(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadCamper();
  }, [id]);

  return (
    <>
      <Header />

      <main className={styles.main}>
        {isLoading && <p className={styles.stateMessage}>Loading...</p>}
        {!isLoading && error && <p className={styles.stateMessage}>{error}</p>}
        {!isLoading && !error && !camper && (
          <p className={styles.stateMessage}>Camper not found</p>
        )}

        {!isLoading && !error && camper && (
          <section className={styles.camperPage}>
            <div className={styles.camperTop}>
              <div className={styles.camperTopHeader}>
                <div className={styles.camperTopInfo}>
                  <h1 className={styles.camperTitle}>{camper.name}</h1>

                  <p className={styles.camperTopMeta}>
                    <span className={styles.rating}>
                      {" "}
                      <svg className={styles.starIcon} aria-hidden="true">
                        <use href="/icons.svg#pressed_star" />
                      </svg>
                      <span className={styles.reviews}>
                        {Number(camper.rating || 0).toFixed(1)} (
                        {camper.reviews?.length ?? 0} reviews)
                      </span>
                    </span>

                    <span className={styles.location}>
                      {" "}
                      <svg className={styles.mapIcon} aria-hidden="true">
                        <use href="/icons.svg#map" />
                      </svg>{" "}
                      {camper.location}
                    </span>
                  </p>
                </div>

                <p className={styles.camperTopPrice}>
                  €{Number(camper.price || 0).toFixed(2)}
                </p>
              </div>

              <div className={styles.camperGallery}>
                {camper.gallery?.map((item, index) => {
                  const url = getImageUrl(item);
                  if (!url) return null;

                  return <img key={index} src={url} alt={camper.name} />;
                })}
              </div>

              <p className={styles.camperDescription}>{camper.description}</p>
            </div>

            <div className={styles.camperBottom}>
              <div className={styles.camperTabs}>
                <button
                  type="button"
                  className={
                    tab === "features"
                      ? `${styles.camperTab} ${styles.camperTabActive}`
                      : styles.camperTab
                  }
                  onClick={() => setTab("features")}
                >
                  Features
                </button>

                <button
                  type="button"
                  className={
                    tab === "feedback"
                      ? `${styles.camperTab} ${styles.camperTabActive}`
                      : styles.camperTab
                  }
                  onClick={() => setTab("feedback")}
                >
                  Reviews
                </button>
              </div>

              <div className={styles.camperBottomContent}>
                <div className={styles.camperLeft}>
                  {tab === "features" && <Features camper={camper} />}
                  {tab === "feedback" && (
                    <FeedbackList reviews={camper.reviews ?? []} />
                  )}
                </div>

                <div className={styles.camperRight}>
                  <BookingForm camperName={camper.name} />
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

// app/catalog/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Header from "../../../components/Header/Header";
import Features from "../../../components/Features/Features";
import FeedbackList from "../../../components/FeedbackList/FeedbackList";
import BookingForm from "../../../components/BookingForm/BookingForm";
import { fetchCamperById } from "../../../lib/api";
import type { Camper, GalleryImage } from "../../../lib/types";

type Tab = "features" | "feedback";

// аккуратно достаём url из строки или объекта { thumb, original }
function getImageUrl(value: string | GalleryImage | undefined): string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  return value.original || value.thumb || null;
}

export default function CamperPage() {
  const params = useParams<{ id: string }>();
  const id = params.id; // теперь это нормальная строка, а не undefined

  const [camper, setCamper] = useState<Camper | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("features");

  useEffect(() => {
    if (!id) return; // на всякий случай

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
      <main>
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && !error && !camper && <p>Camper not found</p>}

        {!isLoading && !error && camper && (
          <section className="camper-page">
            {/* Верхняя часть: название, рейтинг, цена, галерея, описание */}
            <div className="camper-top">
              <div className="camper-top-header">
                <h1>{camper.name}</h1>

                <p className="camper-top-meta">
                  ⭐ {Number(camper.rating || 0).toFixed(1)} (
                  {camper.reviews?.length ?? 0} reviews) · {camper.location}
                </p>

                <p className="camper-top-price">
                  €{Number(camper.price || 0).toFixed(2)}
                </p>
              </div>

              <div className="camper-gallery">
                {camper.gallery?.map((item, index) => {
                  const url = getImageUrl(item);
                  if (!url) return null;

                  return <img key={index} src={url} alt={camper.name} />;
                })}
              </div>

              <p>{camper.description}</p>
            </div>

            {/* Нижняя часть: табы + форма брони справа */}
            <div className="camper-bottom">
              <div>
                <div className="camper-tabs">
                  <button
                    type="button"
                    className={
                      tab === "features"
                        ? "camper-tab camper-tab--active"
                        : "camper-tab"
                    }
                    onClick={() => setTab("features")}
                  >
                    Features
                  </button>

                  <button
                    type="button"
                    className={
                      tab === "feedback"
                        ? "camper-tab camper-tab--active"
                        : "camper-tab"
                    }
                    onClick={() => setTab("feedback")}
                  >
                    Reviews
                  </button>
                </div>

                {tab === "features" && <Features camper={camper} />}
                {tab === "feedback" && (
                  <FeedbackList reviews={camper.reviews ?? []} />
                )}
              </div>

              <BookingForm camperName={camper.name} />
            </div>
          </section>
        )}
      </main>
    </>
  );
}

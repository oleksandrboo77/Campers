"use client";

import { useEffect } from "react";
import Header from "../Header/Header";
import Filter from "../Filter/Filter";
import CamperCard from "../CamperCard/CamperCard";
import { useCampersStore } from "../../store/store";
import styles from "./CatalogPage.module.css";

export default function CatalogPage() {
  const { campers, isLoading, error, loadMore, resetAndFetch, isEnd } =
    useCampersStore();

  useEffect(() => {
    resetAndFetch();
  }, [resetAndFetch]);

  return (
    <>
      <Header />
      <main className={styles.catalogPage}>
        <div className={styles.container}>
          <div className={styles.sidebarColumn}>
            <Filter />
          </div>

          {/* Контент справа */}
          <section className={styles.content}>
            {isLoading && campers.length === 0 && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <div className={styles.list}>
              {campers.map((camper) => (
                <CamperCard key={camper.id} camper={camper} />
              ))}
            </div>

            {!isEnd && campers.length > 0 && (
              <button
                type="button"
                className={styles.loadMore}
                onClick={loadMore}
              >
                Load more
              </button>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

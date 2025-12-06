"use client";

import { useEffect } from "react";
import Header from "../../components/Header/Header";
import Filter from "../../components/Filter/Filter";
import CamperCard from "../../components/CamperCard/CamperCard";
import { useCampersStore } from "../../store/store";

export default function CatalogPage() {
  const { campers, isLoading, error, loadMore, resetAndFetch, isEnd } =
    useCampersStore();

  useEffect(() => {
    resetAndFetch();
  }, [resetAndFetch]);

  return (
    <>
      <Header />
      <main className="catalog-page">
        <Filter />
        <section>
          {isLoading && campers.length === 0 && <p>Loading...</p>}
          {error && <p>{error}</p>}

          <div className="catalog-list">
            {campers.map((camper) => (
              <CamperCard key={camper.id} camper={camper} />
            ))}
          </div>

          {!isEnd && campers.length > 0 && (
            <button
              type="button"
              className="catalog-load-more"
              onClick={loadMore}
            >
              Load more
            </button>
          )}
        </section>
      </main>
    </>
  );
}

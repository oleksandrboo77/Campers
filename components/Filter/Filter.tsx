"use client";

import { useState } from "react";
import styles from "./Filter.module.css";
import { useCampersStore } from "../../store/store";
import type { BodyType } from "../../lib/types";

export default function Filter() {
  const { setFilters, resetAndFetch } = useCampersStore();

  const [location, setLocation] = useState("");
  const [bodyType, setBodyType] = useState<BodyType>(null);
  const [equipment, setEquipment] = useState<string[]>([]);

  const toggleEquipment = (value: string) => {
    setEquipment((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleBodyType = (value: BodyType) => {
    setBodyType((prev) => (prev === value ? null : value));
  };

  const handleSearch = () => {
    setFilters({ location, bodyType, equipment });
    resetAndFetch();
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.block}>
        <p className={styles.label}>Location</p>
        <div className={styles.inputWrapper}>
          <svg className={styles.inputIcon} aria-hidden="true">
            <use href="/icons.svg#map" />
          </svg>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City"
            className={styles.input}
          />
        </div>
      </div>
      <p className={styles.filters}>Filters</p>

      <div className={styles.block}>
        <p className={styles.title}>Vehicle equipment</p>
        <div className={styles.chips}>
          <button
            type="button"
            className={
              equipment.includes("AC") ? styles.chipActive : styles.chip
            }
            onClick={() => toggleEquipment("AC")}
          >
            <svg className={styles.chipIcon} aria-hidden="true">
              <use href="/categories.svg#wind" />
            </svg>
            AC
          </button>

          <button
            type="button"
            className={
              equipment.includes("automatic") ? styles.chipActive : styles.chip
            }
            onClick={() => toggleEquipment("automatic")}
          >
            {" "}
            <svg className={styles.chipIcon} aria-hidden="true">
              <use href="/categories.svg#diagram" />
            </svg>
            Automatic
          </button>

          <button
            type="button"
            className={
              equipment.includes("kitchen") ? styles.chipActive : styles.chip
            }
            onClick={() => toggleEquipment("kitchen")}
          >
            {" "}
            <svg className={styles.chipIcon} aria-hidden="true">
              <use href="/categories.svg#cup-hot" />
            </svg>
            Kitchen
          </button>

          <button
            type="button"
            className={
              equipment.includes("TV") ? styles.chipActive : styles.chip
            }
            onClick={() => toggleEquipment("TV")}
          >
            {" "}
            <svg className={styles.chipIcon} aria-hidden="true">
              <use href="/categories.svg#tv" />
            </svg>
            TV
          </button>

          <button
            type="button"
            className={
              equipment.includes("bathroom") ? styles.chipActive : styles.chip
            }
            onClick={() => toggleEquipment("bathroom")}
          >
            <svg className={styles.chipIcon} aria-hidden="true">
              <use href="/categories.svg#shower" />
            </svg>
            Bathroom
          </button>
        </div>
      </div>

      <div className={styles.block}>
        <p className={styles.title}>Vehicle type</p>
        <div className={styles.types}>
          <button
            type="button"
            className={
              bodyType === "panelTruck" ? styles.typeActive : styles.type
            }
            onClick={() => toggleBodyType("panelTruck")}
          >
            <svg className={styles.chipIcon} aria-hidden="true">
              <use href="/icons.svg#bi_grid-1x2" />
            </svg>
            Van
          </button>

          <button
            type="button"
            className={
              bodyType === "fullyIntegrated" ? styles.typeActive : styles.type
            }
            onClick={() => toggleBodyType("fullyIntegrated")}
          >
            <svg className={styles.chipIcon} aria-hidden="true">
              <use href="/icons.svg#bi_grid" />
            </svg>
            Fully Integrated
          </button>

          <button
            type="button"
            className={bodyType === "alcove" ? styles.typeActive : styles.type}
            onClick={() => toggleBodyType("alcove")}
          >
            <svg className={styles.chipIcon} aria-hidden="true">
              <use href="/icons.svg#bi_grid-3x3-gap" />
            </svg>
            Alcove
          </button>
        </div>
      </div>

      <button
        type="button"
        className={styles.searchButton}
        onClick={handleSearch}
      >
        Search
      </button>
    </aside>
  );
}

import styles from "./Features.module.css";
import type { Camper } from "../../lib/types";

interface FeaturesProps {
  camper: Camper;
}

export default function Features({ camper }: FeaturesProps) {
  const details = camper.details;

  return (
    <div className={styles.features}>
      <div className={styles.badges}>
        {camper.transmission && (
          <span className={styles.badge}>{camper.transmission}</span>
        )}
        {camper.engine && <span className={styles.badge}>{camper.engine}</span>}
        {camper.AC && <span className={styles.badge}>AC</span>}
        {camper.kitchen && <span className={styles.badge}>Kitchen</span>}
        {camper.bathroom && <span className={styles.badge}>Bathroom</span>}
        {camper.TV && <span className={styles.badge}>TV</span>}
        {camper.radio && <span className={styles.badge}>Radio</span>}
        {camper.refrigerator && (
          <span className={styles.badge}>Refrigerator</span>
        )}
        {camper.microwave && <span className={styles.badge}>Microwave</span>}
        {camper.gas && <span className={styles.badge}>Gas</span>}
        {camper.water && <span className={styles.badge}>Water</span>}
      </div>

      <div className={styles.details}>
        <h3 className={styles.title}>Vehicle details</h3>
        <ul className={styles.list}>
          {details?.form && (
            <li className={styles.item}>
              <span>Form</span>
              <span>{details.form}</span>
            </li>
          )}
          {details?.length && (
            <li className={styles.item}>
              <span>Length</span>
              <span>{details.length}</span>
            </li>
          )}
          {details?.width && (
            <li className={styles.item}>
              <span>Width</span>
              <span>{details.width}</span>
            </li>
          )}
          {details?.height && (
            <li className={styles.item}>
              <span>Height</span>
              <span>{details.height}</span>
            </li>
          )}
          {details?.tank && (
            <li className={styles.item}>
              <span>Tank</span>
              <span>{details.tank}</span>
            </li>
          )}
          {details?.consumption && (
            <li className={styles.item}>
              <span>Consumption</span>
              <span>{details.consumption}</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

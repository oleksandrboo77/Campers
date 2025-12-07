import styles from "./Features.module.css";
import type { Camper } from "../../lib/types";
import { FEATURE_CONFIG } from "../../lib/camperFeatures";

interface FeaturesProps {
  camper: Camper;
}

interface FeatureConfig {
  key: string;
  label: string;
  iconHref: string;
  isActive: (camper: Camper) => boolean;
}

interface VehicleDetail {
  key: string;
  label: string;
  value?: string;
}

function formatDetailValue(value?: string) {
  if (!value) return "";

  let normalized = value.replace(/[_-]+/g, " ");

  normalized = normalized.replace(/([a-z])([A-Z])/g, "$1 $2");

  normalized = normalized.toLowerCase().trim();

  const parts = normalized.split(/\s+/);
  if (parts.length === 0) return "";

  const [first, ...rest] = parts;
  const firstFormatted = first.charAt(0).toUpperCase() + first.slice(1);

  return [firstFormatted, ...rest].join(" ");
}

export default function Features({ camper }: FeaturesProps) {
  const featureBadges = FEATURE_CONFIG.filter((cfg) => cfg.isActive(camper));

  const details: VehicleDetail[] = [
    { key: "form", label: "Form", value: camper.form },
    { key: "length", label: "Length", value: camper.length },
    { key: "width", label: "Width", value: camper.width },
    { key: "height", label: "Height", value: camper.height },
    { key: "tank", label: "Tank", value: camper.tank },
    { key: "consumption", label: "Consumption", value: camper.consumption },
  ].filter((item) => Boolean(item.value));

  return (
    <div className={styles.features}>
      {featureBadges.length > 0 && (
        <div className={styles.badges}>
          {featureBadges.map((feature) => (
            <div key={feature.key} className={styles.badge}>
              <svg className={styles.badgeIcon} aria-hidden="true">
                <use href={feature.iconHref} />
              </svg>
              <span>{feature.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className={styles.details}>
        <h3 className={styles.title}>Vehicle details</h3>
        <div className={styles.divider} />

        <ul className={styles.list}>
          {details.map((item) => (
            <li key={item.key} className={styles.item}>
              <span className={styles.label}>{item.label}</span>
              <span className={styles.value}>
                {formatDetailValue(item.value)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

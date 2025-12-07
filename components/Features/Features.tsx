import styles from "./Features.module.css";
import type { Camper } from "../../lib/types";

interface FeaturesProps {
  camper: Camper;
}

interface FeatureConfig {
  key: string;
  label: string;
  iconHref: string; // полный href до символа в спрайте
  isActive: (camper: Camper) => boolean;
}

interface VehicleDetail {
  key: string;
  label: string;
  value?: string;
}

// ВСЕ возможные чипы, один раз описали
const FEATURE_CONFIG: FeatureConfig[] = [
  {
    key: "automatic",
    label: "Automatic",
    iconHref: "/categories.svg#diagram",
    isActive: (c) => c.transmission === "automatic",
  },
  {
    key: "ac",
    label: "AC",
    iconHref: "/categories.svg#wind",
    isActive: (c) => !!c.AC,
  },
  {
    key: "petrol",
    label: "Petrol",
    iconHref: "/categories.svg#fuel-pump",
    isActive: (c) => c.engine === "petrol",
  },
  {
    key: "kitchen",
    label: "Kitchen",
    iconHref: "/categories.svg#cup-hot",
    isActive: (c) => !!c.kitchen,
  },
  {
    key: "radio",
    label: "Radio",
    iconHref: "/categories.svg#radio",
    isActive: (c) => !!c.radio,
  },
  {
    key: "bathroom",
    label: "Bathroom",
    iconHref: "/categories.svg#shower",
    isActive: (c) => !!c.bathroom,
  },
  {
    key: "refrigerator",
    label: "Refrigerator",
    iconHref: "/categories.svg#solar_fridge",
    isActive: (c) => !!c.refrigerator,
  },
  {
    key: "microwave",
    label: "Microwave",
    iconHref: "/categories.svg#microwave",
    isActive: (c) => !!c.microwave,
  },
  {
    key: "gas",
    label: "Gas",
    iconHref: "/categories.svg#gas",
    isActive: (c) => !!c.gas,
  },
  {
    key: "water",
    label: "Water",
    iconHref: "/categories.svg#water",
    isActive: (c) => !!c.water,
  },
];

export default function Features({ camper }: FeaturesProps) {
  // чипы: берём только те, что подходят этому кемперу
  const featureBadges = FEATURE_CONFIG.filter((cfg) => cfg.isActive(camper));

  // --------- характеристики ---------
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
              <span className={styles.value}>{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

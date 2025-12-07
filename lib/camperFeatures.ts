import type { Camper } from "./types";

export interface CamperFeature {
  key: string;
  label: string;
  iconHref: string;
}

interface FeatureConfig extends CamperFeature {
  isActive: (camper: Camper) => boolean;
}

export const FEATURE_CONFIG: FeatureConfig[] = [
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

export function getCamperFeatures(camper: Camper): CamperFeature[] {
  return FEATURE_CONFIG.filter((cfg) => cfg.isActive(camper));
}

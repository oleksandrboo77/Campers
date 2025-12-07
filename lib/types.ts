export interface VehicleDetails {
  form?: string;
  length?: string;
  width?: string;
  height?: string;
  tank?: string;
  consumption?: string;
}

export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface GalleryImage {
  thumb?: string;
  original?: string;
}

export interface Camper extends VehicleDetails {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  description: string;
  gallery: (string | GalleryImage)[];

  transmission?: string;
  engine?: string;

  AC?: boolean;
  bathroom?: boolean;
  kitchen?: boolean;
  TV?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;
  reviews?: Review[];
}

export type BodyType = "panelTruck" | "fullyIntegrated" | "alcove" | null;

export interface Filters {
  location: string;
  bodyType: BodyType;
  equipment: string[];
}

import axios from "axios";
import type { Camper, Filters } from "./types";

export const api = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io",
});

interface FetchCampersOptions {
  page: number;
  limit: number;
  filters: Filters;
}

type CampersApiResponse = Camper[] | { items: Camper[]; total?: number };

function isItemsResponse(
  data: CampersApiResponse
): data is { items: Camper[]; total?: number } {
  return !Array.isArray(data) && "items" in data;
}

export async function fetchCampers(
  options: FetchCampersOptions
): Promise<Camper[]> {
  const { page, limit, filters } = options;

  const params: Record<string, string | number | boolean> = {
    page,
    limit,
  };

  if (filters.location.trim()) {
    params.search = filters.location.trim();
  }

  if (filters.bodyType) {
    params.form = filters.bodyType;
  }

  filters.equipment.forEach((item) => {
    params[item] = true;
  });

  const { data } = await api.get<CampersApiResponse>("/campers", { params });

  let items: Camper[];

  if (Array.isArray(data)) {
    items = data;
  } else if (isItemsResponse(data)) {
    items = data.items;
  } else {
    items = [];
  }

  return items;
}

export async function fetchCamperById(id: string): Promise<Camper> {
  const { data } = await api.get<Camper>(`/campers/${id}`);
  return data;
}

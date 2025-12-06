// lib/api.ts
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

// возможные форматы ответа: либо массив, либо объект с items
type CampersApiResponse = Camper[] | { items: Camper[]; total?: number };

function isItemsResponse(
  data: CampersApiResponse
): data is { items: Camper[]; total?: number } {
  return !Array.isArray(data) && "items" in data;
}

// список кемперов с фильтрацией и пагинацией на бекенде
export async function fetchCampers(
  options: FetchCampersOptions
): Promise<Camper[]> {
  const { page, limit, filters } = options;

  const params: Record<string, string | number | boolean> = {
    page,
    limit,
  };

  // Локация — через search, чтобы "Kyiv" находил "Kyiv, Ukraine"
  if (filters.location.trim()) {
    params.search = filters.location.trim();
  }

  // Тип кузова — мапим на поле form в мокапи
  if (filters.bodyType) {
    params.form = filters.bodyType; // 'panelTruck' | 'fullyIntegrated' | 'alcove'
  }

  // Оборудование — булевые флаги: ?AC=true&kitchen=true...
  filters.equipment.forEach((item) => {
    params[item] = true;
  });

  const { data } = await api.get<CampersApiResponse>("/campers", { params });

  let items: Camper[];

  if (Array.isArray(data)) {
    // вариант: бекенд сразу отдал массив
    items = data;
  } else if (isItemsResponse(data)) {
    // вариант: { items: [...], total: number }
    items = data.items;
  } else {
    // на всякий пожарный
    items = [];
  }

  return items;
}

// один кемпер по id
export async function fetchCamperById(id: string): Promise<Camper> {
  const { data } = await api.get<Camper>(`/campers/${id}`);
  return data;
}

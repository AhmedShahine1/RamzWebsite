import { Brand } from "./brand";

export interface SubCategory {
  id: number;
  brand:Brand;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
}

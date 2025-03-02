import { Brand } from "./brand"
import { Color } from "./color"
import { EnginePosition } from "./enginePosition"
import { EngineSize } from "./engineSize"
import { FuelType } from "./fuelType"
import { ModelYear } from "./modelYear"
import { Offer } from "./offer"
import { Option } from "./option"
import { Origin } from "./origin"
import { ProductImage } from "./productImage"
import { Specification } from "./specification"
import { SubCategory } from "./subCategory"
import { TransmissionType } from "./transmissionType"

export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  descrptionAr: string;
  descrptionEn: string;
  sellingPrice?: number;
  installmentPrice?: number;
  quantityInStock?: number;
  subCategory: SubCategory;
  carCode: string;
  carSKU: string;
  imageUrl: string;
  imageWithoutBackgroundUrl: string;
  brand: Brand;
  option: Option;
  transmissionType: TransmissionType;
  fuelType: FuelType;
  engineSize: EngineSize;
  origin: Origin;
  modelYear: ModelYear;
  imagesUrl: string[];
  insideCarImagesUrl: string[];
  offer: Offer[];
  color: Color[];
  specifications: Specification[];
  kilometers?: number;
  enginePosition: EnginePosition;
  isSpecial: boolean;
  isActive: boolean;
  }
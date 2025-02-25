import { Brand } from "./brand"
import { Color } from "./color"
import { EnginePosition } from "./enginePosition"
import { FuelType } from "./fuelType"
import { Offer } from "./offer"
import { Option } from "./option"
import { Origin } from "./origin"
import { ProductImage } from "./productImage"
import { Specification } from "./specification"
import { SubCategory } from "./subCategory"
import { TransmissionType } from "./transmissionType"

export interface Product {
  id: string
  nameAr: string
  nameEn: string
  descrptionAr: any
  brandName: string
  optionName: string
  descrptionEn: any
  sellingPrice: number
  installmentPrice: number
  quantityInStock: number
  subCategoryId: number
  productCode: any
  productSKU: any
  imageUrl: string
  brandId: number
  optionId: number
  transmissionTypeId: number
  fuelTypeId: number
  engineSizeId: number
  originId: number
  modelYearId: number
  modelYear:any;
  kilometers: number
  enginePositionId: number
  createdBy: number
  createdDate: string
  lastModifiedBy: number
  lastModifiedDate: string
  isDeleted: boolean
  isSpecial: boolean
  productColors: any[]
  productSpecifications: any[]
  productOffers: any[]
  userId: number
  isActive: boolean
  engineSizeAr: string
  engineSizeEn: string
  engineSize:any;
  enginePositionAr: string
  enginePositionEn: string
  upholsteryAr: string
  upholsteryEn: string
  modelYearName: string
  timeAgoAr: string
  timeAgoEn: string
  brand: Brand
  subCategory: SubCategory
  enginePosition: EnginePosition
  fuelType: FuelType
  option: Option
  origin: Origin
  transmissionType: TransmissionType
  colors: Color[]
  images: ProductImage[]
  offers: Offer[]
  specifications: Specification[]
  }
  
import {CATEGORIES, SIZES, TYPES} from "@/constants";

export type IProductTypes = (typeof TYPES)[number]

export type IProductCategory = (typeof CATEGORIES)[number]

export type IProductSizes = (typeof SIZES)[number]
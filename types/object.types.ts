import { CATEGORIES, GENDERS, SIZES, TYPES } from "@/constants/constants";

export type IProductTypes = (typeof TYPES)[number];

export type IProductCategory = (typeof CATEGORIES)[number];

export type IProductSizes = (typeof SIZES)[number];
export type IGender = (typeof GENDERS)[number];

export type ICart = Array<{
    pid: string;
    cid: string;
    q: number;
    s: string;
}>;

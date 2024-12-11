import {CATEGORIES, SIZES, TYPES} from "@/constants/client-constants";

export type IProductTypes = (typeof TYPES)[number]

export type IProductCategory = (typeof CATEGORIES)[number]

export type IProductSizes = (typeof SIZES)[number]

export type ICart = Array<{
    pid: string,
    cid: string,
    q: number,
    s: string;
}>
"use server"

import {db} from "@/database/drizzle";
import {products} from "@/database/schema";
import {IProductCategory, IProductTypes} from "@/types/object.types";
import {and, eq, gt, inArray, lte, arrayOverlaps} from "drizzle-orm";
import {calculatePageCounts, slugToArray} from "@/lib/utils";
import {CategoryPageQuery} from "@/app/(client)/style/[category]/page";


export const getRecentProducts = async () => {
    try {
        const result = await db.select().from(products).orderBy(products.arrivedAt).limit(4)
        if (!result) {
            return undefined;
        }
        return result;
    } catch (err) {
        console.log(err)
    }
}

export const getProductByCategory = async (category: IProductCategory, query: CategoryPageQuery) => {
    try {
        const page = parseInt(query.page) ?? 1
        const offset = (page - 1) * 10;
        const types = slugToArray(query.types) as unknown as IProductTypes[];
        const sizes = slugToArray(query.sizes);
        const max = query.max ? parseInt(query.max) : 500;
        const min = query.min ? parseInt(query.min) : 0;
        const result = await db
            .select()
            .from(products)
            .where(
                and(
                    types.length > 0 ? inArray(products.productType, types) : undefined,
                    sizes.length > 0 ? arrayOverlaps(products.sizes, sizes) : undefined,
                    eq(products.productCategory, category),
                    gt(products.price, min),
                    lte(products.price, max),
                )
            )
            .limit(10)
            .offset(offset)
        ;

        const totalProducts = result.length;
        const totalPages = calculatePageCounts(totalProducts);
        if (!result) {
            return undefined;
        }
        return {
            data: result,
            totalPages,
            currentPage: parseInt(String(page)) || 1,
            totalProducts,
        };
    } catch (err) {
        console.log(err)
        return undefined
    }
}
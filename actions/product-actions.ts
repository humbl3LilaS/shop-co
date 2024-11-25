"use server"

import {db} from "@/database/drizzle";
import {products} from "@/database/schema";
import {IProductCategory} from "@/types/object.types";
import {and, eq, gt, inArray, lte} from "drizzle-orm";
import {calculatePageCounts, slugToArray} from "@/lib/utils";
import {CategoryPageQuery} from "@/app/(public)/style/[category]/page";
import {arrayOverlaps} from "drizzle-orm/sql/expressions/conditions";

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
        const types = slugToArray(query.types);
        const sizes = slugToArray(query.sizes);
        const max = query.max ? parseInt(query.max) : 500;
        const min = query.min ? parseInt(query.min) : 0;
        const result = await db
            .select()
            .from(products)
            .where(
                and(
                    //@ts-expect-error can't find way to type this
                    types.length > 0 ? inArray(products.productType, types) : undefined,
                    //@ts-expect-error can't find way to type this
                    sizes.length > 0 ? arrayOverlaps(products.availableSize, types) : undefined,
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
            currentPage: parseInt(String(page)) ?? 1,
            totalProducts,
        };
    } catch (err) {
        console.log(err)
        return undefined
    }
}
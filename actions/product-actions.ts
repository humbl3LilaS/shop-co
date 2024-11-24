"use server"

import {db} from "@/database/drizzle";
import {products} from "@/database/schema";
import {IProductCategory} from "@/types/object.types";
import {eq} from "drizzle-orm";
import {calculatePageCounts} from "@/lib/utils";

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

export const getProductByCategory = async (category: IProductCategory, page: number) => {
    try {
        const offset = (
            page - 1
        ) * 10;
        const result = await db
            .select()
            .from(products)
            .where(eq(products.productCategory, category))
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
"use server"

import {db} from "@/database/drizzle";
import {productColors, products} from "@/database/schema";
import {eq, sql} from "drizzle-orm";
// import {productColors, products} from "@/database/schema";
// import {eq} from "drizzle-orm";

type ProductColor = {
    id: string;
    color: string;
    colorHex: string;
    imagesUrl: string[] | null;
}
type Product = {
    id: string;
    name: string;
    price: number;
    discount: number | null;
    description: string;
    coverImage: string;
    productCategory: string | null;
    productType: string | null;
    sizes: string[] | null;
}

export const getProductById = async (id: string) => {
    try {
        const rows = await db
            .select()
            .from(products)
            .leftJoin(productColors, eq(productColors.productId, products.id))
            .where(eq(products.id, id))
        if (!rows) {
            return undefined
        }

        const [result] = rows.reduce<Array<{ products: Product, product_colors: (ProductColor | null)[] }>>(
            (acc, row) => {
                const product = row.products;
                const color = row.product_colors;
                if (acc.length === 0) {
                    return [{products: product, product_colors: [color]}];
                } else {
                    return acc.map(item => {
                        return item.products.id === color?.productId ? {
                            ...item,
                            product_colors: [color, ...item.product_colors]
                        } : item;
                    })
                }
            }, [])
        return result;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}
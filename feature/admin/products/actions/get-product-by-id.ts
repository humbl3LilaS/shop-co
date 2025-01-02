"use server";
import { db } from "@/database/drizzle";
import { productColors, products } from "@/database/schema";
import { eq } from "drizzle-orm";

export const getProductById = async (id: string) => {
    const [product] = await db
        .select({
            id: products.id,
            name: products.name,
            price: products.price,
            description: products.description,
            coverImage: products.coverImage,
            discount: products.discount,
            colorHex: productColors.colorHex,
            productCategory: products.productCategory,
            productType: products.productType,
            sizes: products.sizes,
        })
        .from(products)
        .innerJoin(productColors, eq(products.id, productColors.productId))
        .where(eq(products.id, id));
    if (!product) {
        return undefined;
    }
    return product;
};

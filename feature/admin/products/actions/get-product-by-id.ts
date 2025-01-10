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
            details: products.details,
            description: products.description,
            coverImage: products.coverImage,
            discount: products.discount,
            productCategory: products.productCategory,
            productType: products.productType,
            sizes: products.sizes,
            imagesUrl: products.imagesUrl,
            colorHex: productColors.colorHex,
        })
        .from(products)
        .innerJoin(productColors, eq(products.id, productColors.productId))
        .where(eq(products.id, id));
    if (!product) {
        return undefined;
    }
    return product;
};

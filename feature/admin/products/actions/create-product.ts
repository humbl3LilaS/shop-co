"use server";


import { IProducts, products } from "@/database/schema";
import { uploadImage } from "@/feature/admin/products/actions/upload-image";
import { db } from "@/database/drizzle";
import { createProductColor } from "@/feature/admin/products/actions/create-product-color";

export const createProduct = async (payload: Omit<IProducts, "coverImage" | "imagesUrl"> & {
    coverImage: File,
    imagesUrl: File[]
    colorHex: string,
}) => {
    try {
        const { colorHex, ...productInfo } = payload;

        // Upload  cover image to cloudinary
        const coverImage = await uploadImage(productInfo.coverImage);
        if (coverImage.error && !coverImage.imageUrl) {
            return { error: true, message: "Error uploading cover image" };
        }

        // upload gallery images to cloudinary
        const galleryImages = await Promise.all(productInfo.imagesUrl.map(item => uploadImage(item)));
        const galleryImageUploadError = galleryImages.some(item => item.error);
        if (galleryImageUploadError) {
            return { error: true, message: "Error images gallery" };
        }
        const imagesUrl = galleryImages.map(item => item.imageUrl!);

        // create  product in the database
        const [product] = await db
            .insert(products)
            .values({
                ...productInfo,
                sizes: productInfo.sizes as unknown as string[],
                coverImage: coverImage.imageUrl!,
                imagesUrl: imagesUrl
            })
            .returning();
        if (!product) {
            return { error: true, message: "Error creating product" };
        }

        // create new product color in the product table
        const color = await createProductColor({
            colorHex,
            productId: product?.id ?? ""
        });

        if (!color) {
            return { error: true, message: "Product Creation Failed" };

        }

        return { error: false, message: "Product Created" };
    } catch (error) {
        if (error instanceof Error) {
            return { error: true, message: error.message };
        } else {
            return { error: true, message: "Error creating product" };
        }

    }
};
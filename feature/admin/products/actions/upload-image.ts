"use server";

import cloudinary from "@/lib/config/cloudinary";

export const uploadImage = async (file: File) => {
    try {
        const imageBuffer = await file.arrayBuffer();
        const imageArray = Array.from(new Uint8Array(imageBuffer));
        const imageData = Buffer.from(imageArray);
        const imageBase64 = imageData.toString("base64");
        const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
            folder: "shop-co",
        });
        if (!result) {
            return { error: true, imageUrl: undefined };
        }
        return { error: null, imageUrl: result.secure_url! };
    } catch (e) {
        console.log("Error uploading image", e);
        return { error: true, imageUrl: undefined };
    }
};

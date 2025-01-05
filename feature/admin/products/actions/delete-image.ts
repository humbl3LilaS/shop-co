"use server";
import cloudinary from "@/lib/config/cloudinary";

export const deleteImage = async (url: string) => {
    try {
        const parts = url.split("/");
        const versionIndex = parts.findIndex((part) => part.startsWith("v"));
        const publicIdWithExtension = parts.slice(versionIndex + 1).join("/");
        const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "");
        const result = await cloudinary.uploader.destroy(publicId);

        if (result?.result !== "ok") {
            return { error: true, message: "Error deleting image" };
        } else {
            return {
                error: false,
            };
        }
    } catch (error) {
        console.log("Error deleting image", error);
        return {
            error: true,
            message: "Error deleting image",
        };
    }
};

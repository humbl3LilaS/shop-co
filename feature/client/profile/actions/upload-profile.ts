"use server";

import cloudinary from "@/lib/config/cloudinary";
import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export const uploadProfile = async (prevState: any, formData: FormData) => {
    try {
        const session = await auth();

        const profileImage = formData.get("profile") as File;
        const imageBuffer = await profileImage.arrayBuffer();
        const imageArray = Array.from(new Uint8Array(imageBuffer));
        const imageData = Buffer.from(imageArray);
        const imageBase64 = imageData.toString("base64");
        const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
            folder: "shop-co",
        });
        if (!session) {
            return { status: "failed" };
        }
        await db
            .update(users)
            .set({ profileImage: result.secure_url })
            .where(eq(users.id, session.user.id));
        return { status: "success" };
    } catch (error) {
        console.log(error);
        return { status: "failed" };
    }
};

"use server"
import {AdminLoginSchemaType} from "@/validation/schema";
import {db} from "@/database/drizzle";
import {admins} from "@/database/schema";
import {eq} from "drizzle-orm";
import bcrypt from "bcryptjs";

export const authenticateAdmin = async (payload: AdminLoginSchemaType) => {
    try {
        const [admin] = await db.select().from(admins).where(eq(admins.adminId, payload.id))
        if (!admin) {
            return {error: true, message: "Invalid Credentials: Admin Id"};
        }
        const isAuthenticated = await bcrypt.compare(payload.passkey, admin.password);
        if (!isAuthenticated) {
            return {error: true, message: "Invalid Credentials: Passkey"};
        }
        //Todo: add session management for admin
        return {error: false, message: "Authenticated Successfully"};

    } catch (error) {
        console.log(error);
        return {error: true, message: "Error during authentication"}
    }
}
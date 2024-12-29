"use server";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

export const getAllCustomers = async () => {
    const customers = await db.select().from(users);
    if (!customers) {
        return [];
    }
    return customers;
};

"use server";
import { redis } from "@/database/redis";
import { IVisitsCount } from "@/types/api.types";

export const getVisitCount = async () => {
    try {
        return (await redis.json.get("visit")) as IVisitsCount;
    } catch (e) {
        console.log("Error fetching visit count", e);
        return undefined;
    }
};

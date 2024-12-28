import { redis } from "@/database/redis";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { IVisitsCount } from "@/types/api.types";

export const POST = async (req: Request) => {
    try {
        const visitCount = (await redis.json.get("visit")) as IVisitsCount;
        const session = (await req.json()) as { id: string | undefined };

        if (!session.id) {
            await redis.json.set("visit", "$", {
                ...visitCount,
                anonymous: visitCount.anonymous + 1,
            } as IVisitsCount);
        } else {
            const [gender] = await db
                .select({ gender: users.gender })
                .from(users)
                .where(eq(users.id, session.id));
            if (!gender) {
                await redis.json.set("visit", "$", {
                    ...visitCount,
                    anonymous: visitCount.anonymous + 1,
                } as IVisitsCount);
            } else {
                await redis.json.set("visit", "$", {
                    ...visitCount,
                    [gender.gender as keyof IVisitsCount]: visitCount.male + 1,
                } as IVisitsCount);
            }
        }
        return Response.json({ error: null }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return Response.json({ error: error.message }, { status: 400 });
        }
        return Response.json({ error: "Error in /visit" }, { status: 400 });
    }
};

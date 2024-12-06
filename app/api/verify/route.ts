import {db} from "@/database/drizzle";
import {users} from "@/database/schema";
import {eq} from "drizzle-orm";
import bcrypt from "bcryptjs";

export const POST = async (req: Request) => {
    try {
        const {email, password} = await req.json() as Record<string, any>;
        const [user] = await db.select().from(users).where(eq(users.email, email));
        if (!user) {
            return new Response(JSON.stringify({error: "User Not Found"}), {status: 404})
        }

        const verified = await bcrypt.compare(password, user.password);

        if (!verified) {
            return new Response(JSON.stringify({error: "Invalid Credentials"}), {status: 401})
        }

        return new Response(JSON.stringify({email: user.email, id: user.id}), {status: 200});

    } catch (error) {
        console.log("Error while logging in", error);
    }
}
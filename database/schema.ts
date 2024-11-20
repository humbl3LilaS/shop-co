import {pgTable, text, uuid} from "drizzle-orm/pg-core";
import {createId} from "@paralleldrive/cuid2";

export const users = pgTable(
    "users",
    {
        id: uuid().primaryKey().$default(() => createId()),
        email: text().notNull().unique(),
        password: text().notNull(),
        firstName: text("first_name").notNull(),
        lastName: text("last_name").notNull(),
        userName: text("user_name").notNull(),
    }
)


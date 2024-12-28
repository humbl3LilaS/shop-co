import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
    dialect: "postgresql",
    schema: "./database/schema.ts",
    out: "./drizzle",
    dbCredentials: {
        url: process.env.DB_URL!,
    },
});

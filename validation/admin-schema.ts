import {z} from "zod";

export const AdminLoginSchema = z.object({
    id: z.string().refine(arg => arg.length === 6),
    passkey: z.string(),
})

export type AdminLoginSchemaType = Zod.infer<typeof AdminLoginSchema>;
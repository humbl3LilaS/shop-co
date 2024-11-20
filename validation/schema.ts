import {z} from "zod";

export const ProductFormSchema = z.object(
    {
        name: z.string(),
        price: z.preprocess(
            (value) => (
                typeof value === "string" ? parseFloat(value) : value
            ),
            z.number().refine(arg => arg > 0)
        ),
        discount: z.preprocess(
            (value) => (
                typeof value === "string" ? parseFloat(value) : value
            ),
            z.number().refine(arg => arg >= 0 && arg <= 80)
        ),
        description: z.string(),
        coverImage: z.string(),
    })

export type ProductFormSchemaType = Zod.infer<typeof ProductFormSchema>
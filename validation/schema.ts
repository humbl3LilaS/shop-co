import {z} from "zod";
import {CATEGORIES} from "@/constants";
import {Writeable} from "@/types/util.types";


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
        productCategory: z.string().refine(arg => ([...CATEGORIES] as Writeable<any, any>).includes(arg)),
    })


export type ProductFormSchemaType = Zod.infer<typeof ProductFormSchema>
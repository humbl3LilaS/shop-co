import {z} from "zod";
import {CATEGORIES, SIZES, TYPES} from "@/constants";
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
        colorHex: z.string().refine(arg => arg.length === 6),
        productCategory: z.string().refine(arg => (
            [...CATEGORIES] as Writeable<any, any>
        ).includes(arg)),
        productType: z.string().refine(arg => (
            [...TYPES] as Writeable<any, any>
        ).includes(arg)),
        sizes: z.string().refine(arg => (
            [...SIZES] as Writeable<any, any>
        ).includes(arg)).array(),
    })


export const ProductFormSchemaDefaultValues: ProductFormSchemaType = {
    name: "",
    price: 0,
    description: "",
    discount: 0,
    coverImage: "",
    productCategory: "",
    productType: "",
    sizes: [],
    colorHex: ""
}

export type ProductFormSchemaType = Zod.infer<typeof ProductFormSchema>

export const FilterFormSchema = z.object({
    priceRange: z.custom<[number, number]>().refine(arg => arg[0] >= 0 && arg[1] <= 400),
    // color: z.string().max(6),
    sizes: z.string().refine(arg => (
        [...SIZES] as Writeable<any, any>
    ).includes(arg)).array(),
    types: z.string().refine(arg => (
        [...TYPES] as Writeable<any, any>
    ).includes(arg)).array(),
})

export type FilterFormSchemaType = Zod.infer<typeof FilterFormSchema>;

export const FilterFormDefaultValues: FilterFormSchemaType = {
    priceRange: [0, 400],
    sizes: [],
    types: [],
}


export const AddToCartFormSchema = z.object({
    color: z.string().optional(),
    size: z.string(),
    quantity: z.number().int().positive(),
})

export type AddToCartFormSchemaType = Zod.infer<typeof AddToCartFormSchema>;
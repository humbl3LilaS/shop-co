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
        productCategory: z.string().refine(arg => (
            [...CATEGORIES] as Writeable<any, any>
        ).includes(arg)),
        productType: z.string().refine(arg => (
            [...TYPES] as Writeable<any, any>
        ).includes(arg)),
        availableSize: z.string().refine(arg => (
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
    availableSize: [],
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
    priceRange: [50, 200],
    // color: "",
    sizes: [],
    types: [],
}
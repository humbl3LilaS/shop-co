import {IssueData, z} from "zod";
import {CATEGORIES, SIZES, TOWNSHIPS, TYPES, ZONES} from "@/constants";
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


export const CheckoutFormSchema = z.object({
    email: z.string().email(),
    deliveryMethod: z.string().refine(arg => arg === "delivery" || arg === "pickup"),
    firstName: z.string().min(1, {message: "First name is required"}),
    lastName: z.string().min(1, {message: "Last name is required"}),
    address: z.string(),
    state: z.string().refine(arg => ZONES.includes(arg)),
    township: z.string(),
    postalCode: z.string().refine(arg => arg.length === 6, {message: "Invalid Postal Code"}),
    phone: z.string().regex(/^09\d{9}$/, {message: "Invalid Phone Number"}),
    transactionMethod: z.string().refine(arg => arg === "card" || arg === "paypal")
}).superRefine((arg, ctx) => {
    const state = arg.state;
    if (!TOWNSHIPS[state].includes(arg.township)) {
        ctx.addIssue({
            path: ["township"],
        } as IssueData)
    }
})

export type CheckoutFormSchemaType = Zod.infer<typeof CheckoutFormSchema>;

export const CheckoutFormDefaultValues: CheckoutFormSchemaType = {
    email: "",
    deliveryMethod: "delivery",
    firstName: "",
    lastName: "",
    address: "",
    state: "Ayeyarwady",
    township: "",
    postalCode: "",
    phone: "",
    transactionMethod: "card",
}
import { IssueData, z } from "zod";
import { CATEGORIES, GENDERS, SIZES, TOWNSHIPS, TYPES, ZONES } from "@/constants/constants";
import { Writeable } from "@/types/util.types";
import { IGender } from "@/types/object.types";

export const ProductFormSchema = z.object({
    name: z.string(),
    price: z.preprocess(
        (value) => (typeof value === "string" ? parseFloat(value) : value),
        z.number().refine((arg) => arg > 0)
    ),
    discount: z
        .preprocess(
            (value) => (typeof value === "string" ? parseFloat(value) : value),
            z.number().refine((arg) => arg >= 0 && arg <= 80)
        ).optional().nullable(),
    description: z.string().optional(),
    coverImage: z.string(),
    colorHex: z.string().refine((arg) => arg.length === 6),
    productCategory: z
        .string()
        .refine((arg) => ([...CATEGORIES] as Writeable<any, any>).includes(arg)),
    productType: z.string().refine((arg) => ([...TYPES] as Writeable<any, any>).includes(arg)),
    sizes: z
        .string()
        .refine((arg) => ([...SIZES] as Writeable<any, any>).includes(arg))
        .array()
});

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
};

export type ProductFormSchemaType = Zod.infer<typeof ProductFormSchema>;

export const FilterFormSchema = z.object({
    priceRange: z.custom<[number, number]>().refine((arg) => arg[0] >= 0 && arg[1] <= 400),
    // color: z.string().max(6),
    sizes: z
        .string()
        .refine((arg) => ([...SIZES] as Writeable<any, any>).includes(arg))
        .array(),
    types: z
        .string()
        .refine((arg) => ([...TYPES] as Writeable<any, any>).includes(arg))
        .array()
});

export type FilterFormSchemaType = Zod.infer<typeof FilterFormSchema>;

export const FilterFormDefaultValues: FilterFormSchemaType = {
    priceRange: [0, 400],
    sizes: [],
    types: []
};

export const AddToCartFormSchema = z.object({
    color: z.string().optional(),
    size: z.string(),
    quantity: z.number().int().positive()
});

export type AddToCartFormSchemaType = Zod.infer<typeof AddToCartFormSchema>;

export const CheckoutFormSchema = z
    .object({
        email: z.string().email(),
        deliveryMethod: z.string().refine((arg) => arg === "delivery" || arg === "pickup"),
        firstName: z.string().min(1, { message: "First name is required" }),
        lastName: z.string().min(1, { message: "Last name is required" }),
        address: z.string(),
        state: z.string().refine((arg) => ZONES.includes(arg)),
        township: z.string(),
        postalCode: z
            .string()
            .refine((arg) => arg.length === 6, { message: "Invalid Postal Code" }),
        phone: z.string().regex(/^09\d{9}$/, { message: "Invalid Phone Number" }),
        transactionMethod: z.string().refine((arg) => arg === "card" || arg === "paypal")
    })
    .superRefine((arg, ctx) => {
        const state = arg.state;
        if (!TOWNSHIPS[state].includes(arg.township)) {
            ctx.addIssue({
                path: ["township"]
            } as IssueData);
        }
    });

export type CheckoutFormSchemaType = Zod.infer<typeof CheckoutFormSchema>;

export const SignUpSchema = z
    .object({
        firstName: z.string().min(1, { message: "First name is required" }),
        lastName: z.string().min(1, { message: "Last name is required" }),
        userName: z.string().min(5, { message: "User name must be at least 5 characters" }),
        email: z.string().email(),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .regex(/[A-Z]/, {
                message: "Password must contain at least one uppercase letter"
            })
            .regex(/[a-z]/, {
                message: "Password must contain at least one lowercase letter"
            })
            .regex(/[0-9]/, { message: "Password must contain at least one number" })
            .regex(/[@$!%*?&]/, {
                message: "Password must contain at least one special character (@$!%*?&)"
            }),
        confirmPassword: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .regex(/[A-Z]/, {
                message: "Password must contain at least one uppercase letter"
            })
            .regex(/[a-z]/, {
                message: "Password must contain at least one lowercase letter"
            })
            .regex(/[0-9]/, { message: "Password must contain at least one number" })
            .regex(/[@$!%*?&]/, {
                message: "Password must contain at least one special character (@$!%*?&)"
            })
    })
    .superRefine((arg, ctx) => {
        if (arg.confirmPassword !== arg.confirmPassword) {
            ctx.addIssue({
                path: ["password", "confirmPassword"],
                message: "Password and ConfirmPassword must be the same"
            } as IssueData);
        }
    });

export type SignUpSchemaType = Zod.infer<typeof SignUpSchema>;

export const SignUpSchemaDefaultValues: SignUpSchemaType = {
    email: "",
    lastName: "",
    firstName: "",
    userName: "",
    password: "",
    confirmPassword: ""
};

export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1)
});

export type SignInSchemaType = Zod.infer<typeof SignInSchema>;

export const ProfileEditFormSchema = z
    .object({
        email: z.string().email(),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        userName: z.string().min(1),
        phoneNumber: z
            .string()
            .regex(/^09\d{9}$/, { message: "Invalid Phone Number" })
            .optional(),
        state: z
            .string()
            .optional()
            .refine((arg) => !arg || ZONES.includes(arg)),
        township: z.string().optional(),
        address: z
            .string()
            .optional()
            .refine((arg) => !arg || arg.length > 10),
        postalCode: z
            .string()
            .optional()
            .refine((arg) => !arg || arg.length === 6, {
                message: "Invalid Postal Code"
            }),
        gender: z.string().refine((arg) => !arg || GENDERS.includes(arg as IGender))
    })
    .superRefine((arg, ctx) => {
        if (arg.state && arg.township && !TOWNSHIPS[arg.state]?.includes(arg.township)) {
            ctx.addIssue({
                path: ["township"]
            } as IssueData);
        }
    });

export type ProfileEditFormSchemaType = Zod.infer<typeof ProfileEditFormSchema>;

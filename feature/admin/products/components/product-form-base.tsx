"use client";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { SubmitHandler, type UseFormReturn } from "react-hook-form";
import { ProductFormSchemaType } from "@/validation/client-schema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { CATEGORIES, SIZES, TYPES } from "@/constants/constants";
import SizeCheckbox from "@/components/client/size-checkbox";
import MDEditor from "@uiw/react-md-editor";
import CoverImageUploader from "@/feature/admin/products/components/cover-image-uploader";

type ProductFormBaseProps = {
    form: UseFormReturn<ProductFormSchemaType, any, undefined>;
    onSubmit: SubmitHandler<ProductFormSchemaType>;
    disable?: boolean;
    mode: "edit" | "new"
};

const ProductFormBase = ({ form, onSubmit, disable, mode }: ProductFormBaseProps) => {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className={"grid grid-cols-2 gap-4"}>
                    {mode === "new" && <FormField
                        name={"coverImage"}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className={"col-span-2"}>
                                <FormLabel className={"sr-only"}>ProductImage</FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <CoverImageUploader
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />}
                    <FormField
                        name={"name"}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <Input {...field} placeholder={"Product name..."} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name={"price"}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder={"Price..."} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name={"discount"}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Discount</FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder={"Discount..."}
                                        value={field.value ?? 0}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name={"colorHex"}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Color hex</FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <Input {...field} placeholder={"#ffffff"} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name={"productCategory"}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Category</FormLabel>
                                <FormMessage />
                                <Select onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={field.value}
                                                className={"placeholder:capitalize"}
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {CATEGORIES.map((item) => (
                                            <SelectItem
                                                value={item}
                                                key={item}
                                                className={"capitalize"}
                                            >
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name={"productType"}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Type</FormLabel>
                                <FormMessage />
                                <Select onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={field.value}
                                                className={"placeholder:capitalize"}
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {TYPES.map((item) => (
                                            <SelectItem
                                                value={item}
                                                key={item}
                                                className={"capitalize"}
                                            >
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name={"sizes"}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className={"col-span-2"}>
                                <FormLabel>Select Available Sizes</FormLabel>
                                <FormControl>
                                    <ul className={"grid grid-cols-5"}>
                                        {SIZES.map((size, idx) => (
                                            <SizeCheckbox
                                                key={idx}
                                                value={size}
                                                checked={field.value.includes(size)}
                                                onCheckedChange={(value) => {
                                                    if (value) {
                                                        field.onChange([...field.value, size]);
                                                    } else {
                                                        const filterSizes = field.value.filter(
                                                            (item) => item !== size
                                                        );
                                                        field.onChange([...filterSizes]);
                                                    }
                                                }}
                                            />
                                        ))}
                                    </ul>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name={"description"}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className={"col-span-2"}>
                                <FormLabel className={"sr-only"}>Description</FormLabel>
                                <FormControl>
                                    <div className={"h-[500px]"}>
                                        {window !== undefined && (
                                            <MDEditor
                                                value={field.value}
                                                onChange={field.onChange}
                                                minHeight={300}
                                                style={{
                                                    minHeight: "500px",
                                                    backgroundColor: "white",
                                                    color: "black"
                                                }}
                                                preview={"edit"}
                                            />
                                        )}
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <Button className={"mt-4"} type={"submit"} disabled={disable}>
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default ProductFormBase;

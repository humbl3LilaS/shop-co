"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductFormSchema, ProductFormSchemaType } from "@/validation/client-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ProductFormBase from "@/feature/admin/products/components/product-form-base";

const EditProductForm = ({ defaultValues }: { defaultValues: ProductFormSchemaType }) => {
    const form = useForm<ProductFormSchemaType>({
        resolver: zodResolver(ProductFormSchema),
        mode: "onChange",
        defaultValues: {
            ...defaultValues,
            discount: defaultValues.discount ?? 0,
            description: defaultValues.description ?? "",
        },
    });

    const onSubmit: SubmitHandler<ProductFormSchemaType> = async (value) => {
        const dirtyFields = Object.keys(form.formState.dirtyFields) as unknown as Array<
            keyof ProductFormSchemaType
        >;
        console.log("dirtyFields", dirtyFields);
    };
    return <ProductFormBase form={form} onSubmit={onSubmit} />;
};

export default EditProductForm;

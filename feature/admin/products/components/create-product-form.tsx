"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    ProductFormSchema,
    ProductFormSchemaDefaultValues,
    ProductFormSchemaType,
} from "@/validation/client-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { createProduct } from "@/feature/admin/products/actions/create-product";
import ProductFormBase from "@/feature/admin/products/components/product-form-base";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { IProductCategory, IProductTypes } from "@/types/object.types";

const CreateProductForm = () => {
    const form = useForm<ProductFormSchemaType>({
        resolver: zodResolver(ProductFormSchema),
        mode: "onChange",
        defaultValues: { ...ProductFormSchemaDefaultValues },
    });

    const { toast } = useToast();
    const router = useRouter();
    const queryClient = useQueryClient();

    const onSubmit: SubmitHandler<ProductFormSchemaType> = async (value) => {
        if (!value.coverImage || !value.imagesUrl || value.imagesUrl === "edit") {
            return toast({ title: "Images are empty", variant: "destructive", duration: 500 });
        }
        const res = await createProduct({
            ...value,
            coverImage: value.coverImage,
            imagesUrl: value.imagesUrl,
            productType: value.productType as IProductTypes,
            productCategory: value.productCategory as IProductCategory,
        });
        if (res.error) {
            return toast({ title: res.message, variant: "destructive", duration: 500 });
        }
        toast({ title: "Product Created" });
        form.reset({ ...ProductFormSchemaDefaultValues });
        await queryClient.invalidateQueries({
            queryKey: ["products"],
        });
        router.push("/admin/dashboard/products");
    };

    return <ProductFormBase form={form} onSubmit={onSubmit} mode={"new"} />;
};

export default CreateProductForm;

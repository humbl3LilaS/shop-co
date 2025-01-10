"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductFormSchema, ProductFormSchemaType } from "@/validation/client-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ProductFormBase from "@/feature/admin/products/components/product-form-base";
import { useToast } from "@/hooks/use-toast";
import { updateProductById } from "@/feature/admin/products/actions/update-product-by-id";
import { useParams, useRouter } from "next/navigation";
import { getDirtyField } from "@/lib/utils";

import { IProductCategory, IProductTypes } from "@/types/object.types";
import { IProducts } from "@/database/schema";
import { useQueryClient } from "@tanstack/react-query";

const EditProductForm = ({ defaultValues }: { defaultValues: IProducts }) => {
    const form = useForm<ProductFormSchemaType>({
        resolver: zodResolver(ProductFormSchema),
        mode: "onChange",
        defaultValues: {
            ...defaultValues,
            discount: defaultValues.discount ?? 0,
            description: defaultValues.description ?? "",
            details: defaultValues.details ?? "",
            sizes: defaultValues.sizes as unknown as string[],
            coverImage: null,
            imagesUrl: "edit"
        }
    });

    const { productId } = useParams();
    const { toast } = useToast();
    const router = useRouter();
    const queryClient = useQueryClient();

    const onSubmit: SubmitHandler<ProductFormSchemaType> = async (values) => {
        const valuesChanges = getDirtyField<IProducts>(
            {
                ...values,
                productCategory: values.productCategory as IProductCategory,
                productType: values.productType as IProductTypes,
                coverImage: defaultValues.coverImage,
                imagesUrl: defaultValues.imagesUrl
            },
            form.formState.dirtyFields
        );
        const res = await updateProductById(productId as string, valuesChanges);
        if (res.error) {
            toast({ title: res.message, variant: "destructive", duration: 500 });
            return;
        } else {
            toast({ title: res.message, duration: 500 });
            await queryClient.invalidateQueries({ queryKey: ["products"] });
            router.replace(`/admin/dashboard/products/${productId}`);
        }
    };
    return <ProductFormBase form={form} onSubmit={onSubmit} mode={"edit"} />;
};

export default EditProductForm;

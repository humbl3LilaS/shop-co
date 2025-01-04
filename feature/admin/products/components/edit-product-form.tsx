"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductFormSchema, ProductFormSchemaType } from "@/validation/client-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ProductFormBase from "@/feature/admin/products/components/product-form-base";
import { IProducts } from "@/database/schema";
import { useToast } from "@/hooks/use-toast";
import { updateProductById } from "@/feature/admin/products/actions/update-product-by-id";
import { useParams, useRouter } from "next/navigation";

const EditProductForm = ({ defaultValues }: { defaultValues: ProductFormSchemaType }) => {
    const form = useForm<ProductFormSchemaType>({
        resolver: zodResolver(ProductFormSchema),
        mode: "onChange",
        defaultValues: {
            ...defaultValues,
            discount: defaultValues.discount ?? 0,
            description: defaultValues.description ?? "",
            details: defaultValues.details ?? "",
        },
    });
    console.log("details", defaultValues.details);
    const { productId } = useParams();
    const { toast } = useToast();
    const router = useRouter();
    const onSubmit: SubmitHandler<ProductFormSchemaType> = async (values) => {
        const dirtyFields = Object.keys(form.formState.dirtyFields) as unknown as Array<
            keyof ProductFormSchemaType
        >;
        const valuesChanges = dirtyFields.reduce((obj, key) => {
            return {
                ...obj,
                [key]: values[key as keyof typeof values],
            };
        }, {} as Partial<IProducts>);
        const res = await updateProductById(productId as string, valuesChanges);
        if (res.error) {
            toast({ title: res.message, variant: "destructive", duration: 500 });
            return;
        } else {
            toast({ title: res.message, duration: 500 });
            router.push(`/admin/dashboard/products/${productId}`);
        }
    };
    return <ProductFormBase form={form} onSubmit={onSubmit} mode={"edit"} />;
};

export default EditProductForm;

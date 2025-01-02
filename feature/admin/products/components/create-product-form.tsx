"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductFormSchema, ProductFormSchemaDefaultValues, ProductFormSchemaType } from "@/validation/client-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { createProduct } from "@/feature/admin/products/actions/create-product-action";
import { createProductColor } from "@/feature/admin/products/actions/create-product-color";
import ProductFormBase from "@/feature/admin/products/components/product-form-base";

const CreateProductForm = () => {
    const form = useForm<ProductFormSchemaType>({
        resolver: zodResolver(ProductFormSchema),
        mode: "onChange",
        defaultValues: { ...ProductFormSchemaDefaultValues }
    });

    const { toast } = useToast();

    const onSubmit: SubmitHandler<ProductFormSchemaType> = async (value) => {
        const { colorHex, ...payload } = value;
        const product = await createProduct({ ...payload });
        if (!product) {
            toast({ title: "Product Creation Failed", variant: "destructive" });
        }
        const color = await createProductColor({
            colorHex,
            productId: product?.id ?? ""
        });
        if (!color) {
            toast({ title: "Product Creation Failed", variant: "destructive" });
        }
        toast({ title: "Product Created" });
        form.reset({ ...ProductFormSchemaDefaultValues });
    };

    return (
        <ProductFormBase form={form} onSubmit={onSubmit} />
    );
};

export default CreateProductForm;
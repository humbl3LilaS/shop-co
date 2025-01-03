"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    ProductFormSchema,
    ProductFormSchemaDefaultValues,
    ProductFormSchemaType
} from "@/validation/client-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { createProduct } from "@/feature/admin/products/actions/create-product-action";
import { createProductColor } from "@/feature/admin/products/actions/create-product-color";
import ProductFormBase from "@/feature/admin/products/components/product-form-base";
import { uploadImage } from "@/feature/admin/products/actions/upload-image";
import { useRouter } from "next/navigation";

const CreateProductForm = () => {
    const form = useForm<ProductFormSchemaType>({
        resolver: zodResolver(ProductFormSchema),
        mode: "onChange",
        defaultValues: { ...ProductFormSchemaDefaultValues }
    });

    const { toast } = useToast();
    const router = useRouter();

    const onSubmit: SubmitHandler<ProductFormSchemaType> = async (value) => {
        const { colorHex, ...payload } = value;
        if (!value.coverImage) {
            return;
        }

        // Upload image to cloudinary
        const image = await uploadImage(value.coverImage);
        if (image.error && !image.imageUrl) {
            toast({ title: "Image Upload Failed", variant: "destructive" });
            return;
        }

        // create product in the product table
        // @ts-expect-error ignore typing
        const product = await createProduct({ ...payload, coverImage: image.imageUrl});
        if (!product) {
            toast({ title: "Product Creation Failed", variant: "destructive" });
            return;
        }

        // create new product color in the product table
        const color = await createProductColor({
            colorHex,
            productId: product?.id ?? ""
        });

        if (!color) {
            toast({ title: "Product Creation Failed", variant: "destructive" });
            return;
        }

        toast({ title: "Product Created" });
        form.reset({ ...ProductFormSchemaDefaultValues });
        router.push("/admin/dashboard/products");
    };

    return <ProductFormBase form={form} onSubmit={onSubmit} mode={"new"} />;
};

export default CreateProductForm;

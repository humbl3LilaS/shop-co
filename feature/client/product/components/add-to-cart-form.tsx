"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { AddToCartFormSchema, AddToCartFormSchemaType } from "@/validation/client-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import ColorSelector from "@/feature/client/product/components/color-selector";
import SizeSelector from "@/feature/client/product/components/size-selector";
import { Button } from "@/components/ui/button";
import QuantitySelector from "@/feature/client/product/components/quantity-selector";
import { ICart } from "@/types/object.types";
import { useCartStore } from "@/hooks/use-cart-store";

type AddToCartFormProps = {
    colors: Array<{ id: string; colorHex: string }>;
    sizes: string[];
    productId: string;
};

const AddToCartForm = ({ colors, sizes, productId }: AddToCartFormProps) => {
    const form = useForm<AddToCartFormSchemaType>({
        resolver: zodResolver(AddToCartFormSchema),
        mode: "onChange",
        defaultValues: {
            color: colors[0]?.id,
            size: sizes[0],
            quantity: 1,
        },
    });

    const cart = useCartStore((state) => state.cart);
    const addToCart = useCartStore((state) => state.addToCart);
    const increaseQuantity = useCartStore((state) => state.increaseQty);

    const onSubmit: SubmitHandler<AddToCartFormSchemaType> = (values) => {
        const newItem: ICart[number] = {
            pid: productId,
            cid: values.color ?? "no-option",
            s: values.size,
            q: values.quantity,
        };
        const isInCart = cart.find(
            (item) => item.pid === newItem.pid && item.cid === newItem.cid && item.s === newItem.s,
        );
        if (!isInCart) {
            addToCart(newItem);
        } else {
            increaseQuantity(newItem);
        }
    };

    return (
        <Form {...form}>
            <form className={"pt-6"} onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    name={"color"}
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className={"text-black/40"}>Select Colors</FormLabel>
                            <FormControl>
                                <ColorSelector
                                    options={colors}
                                    onChange={field.onChange}
                                    defaultValue={field.value}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <hr className={"my-6"} />

                <FormField
                    name={"size"}
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className={"text-black/40"}>Select Size</FormLabel>
                            <FormControl>
                                <SizeSelector
                                    options={sizes}
                                    onChange={field.onChange}
                                    defaultValue={field.value}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <hr className={"my-6"} />
                <div className={"flex items-center gap-x-4"}>
                    <FormField
                        name={"quantity"}
                        control={form.control}
                        render={({ field }) => (
                            <QuantitySelector
                                value={field.value}
                                onQuantityChange={field.onChange}
                            />
                        )}
                    />
                    <Button className={"w-full rounded-3xl"} type={"submit"}>
                        Add to cart
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default AddToCartForm;

"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import {AddToCartFormSchema, AddToCartFormSchemaType} from "@/validation/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import ColorSelector from "@/feature/public/product/components/color-selector";
import SizeSelector from "@/feature/public/product/components/size-selector";
import {Button} from "@/components/ui/button";
import QuantitySelector from "@/feature/public/product/components/quantity-selector";
import {ICart} from "@/types/object.types";

type AddToCartFormProps = {
    colors: Array<{ id: string; colorHex: string }>;
    sizes: string[];
    productId: string;
}

const AddToCartForm = ({colors, sizes, productId}: AddToCartFormProps) => {
    const form = useForm<AddToCartFormSchemaType>({
        resolver: zodResolver(AddToCartFormSchema),
        mode: "onChange",
        defaultValues: {
            color: colors[0].id,
            size: sizes[0],
            quantity: 1,
        }
    })


    const onSubmit: SubmitHandler<AddToCartFormSchemaType> = (values) => {
        console.log("values", values);
        if (window !== undefined && typeof window === "object") {
            const cart = JSON.parse(sessionStorage.getItem("cart") ?? "[]") as ICart;
            console.log("cart from session", cart)
            const newItem: ICart[number] = {
                pid: productId,
                cid: values.color,
                s: values.size,
                q: values.quantity
            }

            const newCart = [...cart, newItem].reduce(
                (acc, value) => {
                    if (acc.length === 0) {
                        return [value]
                    } else {
                        let isIncluded = false;
                        const processArr = acc.map(item => {
                            if (item.pid === value.pid && item.cid === value.cid && item.s === value.s) {
                                isIncluded = true;
                                return {
                                    ...item,
                                    q: item.q + value.q
                                }
                            }
                            return item;
                        })
                        return isIncluded ? processArr : [...processArr, value]
                    }

                }, [] as ICart)
            sessionStorage.setItem("cart", JSON.stringify([...newCart]));
        }
    }

    return (
        <Form {...form}>
            <form className={"py-6"} onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    name={"color"}
                    control={form.control}
                    render={({field}) =>
                        <FormItem>
                            <FormLabel className={"text-black/40"}>
                                Select Colors
                            </FormLabel>
                            <FormControl>
                                <ColorSelector
                                    options={colors}
                                    onChange={field.onChange}
                                    defaultValue={field.value}
                                />
                            </FormControl>
                        </FormItem>
                    }/>

                <hr className={"my-6"}/>

                <FormField
                    name={"size"}
                    control={form.control}
                    render={({field}) =>
                        <FormItem>
                            <FormLabel className={"text-black/40"}>
                                Select Size
                            </FormLabel>
                            <FormControl>
                                <SizeSelector
                                    options={sizes}
                                    onChange={field.onChange}
                                    defaultValue={field.value}
                                />
                            </FormControl>
                        </FormItem>
                    }/>

                <hr className={"my-6"}/>
                <div className={"flex items-center gap-x-4"}>
                    <FormField
                        name={"quantity"}
                        control={form.control}
                        render={({field}) =>
                            <QuantitySelector value={field.value} onQuantityChange={field.onChange}/>
                        }
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
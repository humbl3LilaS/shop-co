"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import {AddToCartFormSchema, AddToCartFormSchemaType} from "@/validation/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import ColorSelector from "@/feature/public/product/components/color-selector";
import SizeSelector from "@/feature/public/product/components/size-selector";
import {Button} from "@/components/ui/button";
import QuantitySelector from "@/feature/public/product/components/quantity-selector";

type AddToCartFormProps = {
    colors: Array<{ id: string; colorHex: string }>;
    sizes: string[];
}

const AddToCartForm = ({colors, sizes}: AddToCartFormProps) => {
    const form = useForm<AddToCartFormSchemaType>({
        resolver: zodResolver(AddToCartFormSchema),
        mode: "onChange",
        defaultValues: {
            color: colors[0].id,
            size: sizes[0],
            quantity: 1,
        }
    })

    // const colorOptions = colors
    //     ? colors.map(item => item?.colorHex)
    //         .filter(color => color !== undefined)
    //     : [];

    const onSubmit: SubmitHandler<AddToCartFormSchemaType> = (values) => {
        console.log(values);
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
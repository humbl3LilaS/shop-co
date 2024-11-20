"use client"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {SubmitHandler, useForm} from "react-hook-form";
import {ProductFormSchema, ProductFormSchemaType} from "@/validation/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";
import {createProduct} from "@/feature/product/actions/create-product-action";

const CreateProductForm = () => {
    const form = useForm<ProductFormSchemaType>(
        {
            resolver: zodResolver(ProductFormSchema),
            mode: "onChange",
            defaultValues: {
                name: "",
                price: 0,
                description: "",
                discount: 0
            }
        }
    )

    const {toast} = useToast();

    const onSubmit: SubmitHandler<ProductFormSchemaType> = async (value) => {
        const product = await createProduct({...value})
        if (!product) {
            toast({title: "Product Creation Failed", variant: "destructive"})
        }
        toast({title: "Product Created"})
    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className={"max-w-xl mx-auto py-10"}>

                    <FormField
                        name={"name"}
                        control={form.control}
                        render={({field}) =>
                            <FormItem>
                                <FormLabel>
                                    Name
                                </FormLabel>
                                <FormMessage/>
                                <FormControl>
                                    <Input {...field} placeholder={"Product name..."}/>
                                </FormControl>
                            </FormItem>
                        }
                    />


                    <FormField
                        name={"price"}
                        control={form.control}
                        render={({field}) =>
                            <FormItem>
                                <FormLabel>
                                    Price
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder={"Price..."}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        }
                    />

                    <FormField
                        name={"discount"}
                        control={form.control}
                        render={({field}) =>
                            <FormItem>
                                <FormLabel>
                                    Discount
                                </FormLabel>
                                <FormMessage/>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder={"Discount..."}
                                    />
                                </FormControl>
                            </FormItem>
                        }
                    />

                    <FormField
                        name={"description"}
                        control={form.control}
                        render={({field}) =>
                            <FormItem>
                                <FormLabel>
                                    Description
                                </FormLabel>
                                <FormMessage/>
                                <FormControl>
                                    <Input {...field} placeholder={"Description..."}/>
                                </FormControl>
                            </FormItem>
                        }
                    />


                    <Button className={"mt-4"} type={"submit"}>
                        Submit
                    </Button>
                </div>

            </form>
        </Form>
    );
};

export default CreateProductForm;
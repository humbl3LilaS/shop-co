"use client"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {SubmitHandler, useForm} from "react-hook-form";
import {ProductFormSchema, ProductFormSchemaType} from "@/validation/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";
import {createProduct} from "@/feature/product/actions/create-product-action";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {CATEGORIES, SIZES, TYPES} from "@/constants";
import SizeCheckbox from "@/components/size-checkbox";

const CreateProductForm = () => {
    const form = useForm<ProductFormSchemaType>(
        {
            resolver: zodResolver(ProductFormSchema),
            mode: "onChange",
            defaultValues: {
                name: "",
                price: 0,
                description: "",
                discount: 0,
                coverImage: "",
                productCategory: "",
                productType: "",
                availableSize: [],
            }
        }
    )

    const {toast} = useToast();
    console.log(form.formState.errors)

    const onSubmit: SubmitHandler<ProductFormSchemaType> = async (value) => {
        const product = await createProduct({...value})
        if (!product) {
            toast({title: "Product Creation Failed", variant: "destructive"})
        }
        toast({title: "Product Created"})
        form.reset()
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

                    <FormField
                        name={"coverImage"}
                        control={form.control}
                        render={({field}) =>
                            <FormItem>
                                <FormLabel>
                                    Cover Image Url
                                </FormLabel>
                                <FormMessage/>
                                <FormControl>
                                    <Input {...field} placeholder={"Description..."}/>
                                </FormControl>
                            </FormItem>
                        }
                    />

                    <FormField
                        name={"productCategory"}
                        control={form.control}
                        render={({field}) =>
                            <FormItem>
                                <FormLabel>
                                    Product Category
                                </FormLabel>
                                <FormMessage/>
                                <Select onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder={field.value}
                                                         className={"placeholder:capitalize"}/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            CATEGORIES.map(item =>
                                                               <SelectItem
                                                                   value={item} key={item}
                                                                   className={"capitalize"}>
                                                                   {item}
                                                               </SelectItem>
                                            )
                                        }
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        }
                    />

                    <FormField
                        name={"productType"}
                        control={form.control}
                        render={({field}) =>
                            <FormItem>
                                <FormLabel>
                                    Product Type
                                </FormLabel>
                                <FormMessage/>
                                <Select onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder={field.value}
                                                         className={"placeholder:capitalize"}/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            TYPES.map(item =>
                                                          <SelectItem
                                                              value={item} key={item}
                                                              className={"capitalize"}>
                                                              {item}
                                                          </SelectItem>
                                            )
                                        }
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        }
                    />

                    <FormField
                        name={"availableSize"}
                        control={form.control}
                        render={({field}) =>
                            <FormItem>
                                <FormLabel>
                                    Select Available Sizes
                                </FormLabel>
                                <FormControl>
                                    <ul>
                                        {
                                            SIZES.map((size, idx) =>
                                                          <SizeCheckbox
                                                              key={idx}
                                                              value={size}
                                                              onCheckedChange={(value) => {
                                                                  if (value) {
                                                                      form.setValue(
                                                                          "availableSize",
                                                                          [...field.value, size]
                                                                      )
                                                                  } else {
                                                                      const filterSizes = field.value.filter(
                                                                          item => item !== size);
                                                                      form.setValue(
                                                                          "availableSize",
                                                                          [...filterSizes]
                                                                      )
                                                                  }
                                                              }}/>
                                            )
                                        }
                                    </ul>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        }/>


                    <Button className={"mt-4"} type={"submit"}>
                        Submit
                    </Button>
                </div>

            </form>
        </Form>
    )
        ;
};

export default CreateProductForm;
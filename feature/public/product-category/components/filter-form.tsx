"use client"
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FilterFormDefaultValues, FilterFormSchema, FilterFormSchemaType} from "@/validation/schema";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {CATEGORIES, SIZES, TYPES} from "@/constants";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import PriceRangeSelector from "@/components/share/price-range-selector";
import {Button} from "@/components/ui/button";
import AccordionField from "@/feature/public/product-category/accordion-field";

function fieldArrayOnChange<T>(value: T, array: T[], callback: (value: T[]) => void) {
    if (array.includes(value)) {
        const newArray = array.filter(item => item !== value)
        callback([...newArray]);
    } else {
        callback([...array, value]);
    }
}

const FilterForm = () => {
    const form = useForm<FilterFormSchemaType>({
        resolver: zodResolver(FilterFormSchema),
        mode: "onChange",
        defaultValues: {...FilterFormDefaultValues}
    })

    const onSubmit: SubmitHandler<FilterFormSchemaType> = (values) => {
        console.log(values);
    }


    return (
        <div className={"mt-6"}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>

                    <FormField
                        name={"productType"}
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className={"sr-only"}>
                                    Product Type
                                </FormLabel>
                                <FormControl>
                                    <div className={"flex flex-col gap-y-4"}>
                                        {
                                            TYPES.map((type, idx) =>
                                                <div key={type + idx}
                                                     className={"flex items-center justify-between"}>
                                                    <Label htmlFor={type} className={"capitalize text-black/60"}>
                                                        {type}
                                                    </Label>
                                                    <Checkbox
                                                        id={type}
                                                        className={"size-5"}
                                                        onCheckedChange={() => {
                                                            fieldArrayOnChange(type, field.value, field.onChange)
                                                        }}
                                                        checked={field.value.includes(type)}
                                                    />
                                                </div>
                                            )
                                        }
                                    </div>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <hr className={"my-6"}/>

                    <AccordionField title={"Price"}>
                        <FormField
                            name={"priceRange"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <PriceRangeSelector
                                            value={field.value}
                                            onChange={field.onChange}
                                            step={50}
                                            min={0}
                                            max={400}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </AccordionField>

                    <AccordionField title={"Size"}>
                        <FormField
                            name={"sizes"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <div className={"flex flex-col gap-y-4"}>
                                            {
                                                SIZES.map((size, idx) =>
                                                    <div key={size + idx}
                                                         className={"flex items-center justify-between"}>
                                                        <Label htmlFor={size}
                                                               className={"capitalize text-black/60"}>
                                                            {size}
                                                        </Label>
                                                        <Checkbox
                                                            id={size}
                                                            className={"size-5"}
                                                            checked={field.value.includes(size)}
                                                            onCheckedChange={() => {
                                                                fieldArrayOnChange(size, field.value, field.onChange)
                                                            }}
                                                        />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                    </AccordionField>

                    <AccordionField title={"Dress Style"}>
                        <FormField
                            name={"productCategory"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <div className={"flex flex-col gap-y-4"}>
                                            {
                                                CATEGORIES.map((category, idx) =>
                                                    <div key={category + idx}
                                                         className={"flex items-center justify-between"}>
                                                        <Label htmlFor={category}
                                                               className={"capitalize text-black/60"}>
                                                            {category}
                                                        </Label>
                                                        <Checkbox
                                                            id={category}
                                                            className={"size-5"}
                                                            checked={field.value.includes(category)}
                                                            onCheckedChange={() => {
                                                                fieldArrayOnChange(category, field.value, field.onChange)
                                                            }}
                                                        />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                    </AccordionField>


                    <Button className={"mt-6 w-full rounded-3xl"}>
                        Apply Filter
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default FilterForm;
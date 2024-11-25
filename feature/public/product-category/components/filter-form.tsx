"use client"
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FilterFormDefaultValues, FilterFormSchema, FilterFormSchemaType} from "@/validation/schema";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {CATEGORIES, SIZES, TYPES} from "@/constants";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import PriceRangeSelector from "@/components/share/price-range-selector";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";


const FilterForm = () => {
    const form = useForm<FilterFormSchemaType>({
        resolver: zodResolver(FilterFormSchema),
        mode: "onChange",
        defaultValues: {...FilterFormDefaultValues}
    })

    const onSubmit: SubmitHandler<FilterFormSchemaType> = (values) => {
        console.log(values);
    }
    console.log(form.getValues("priceRange"));
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
                                                <div key={type + idx} className={"flex items-center justify-between"}>
                                                    <Label htmlFor={type} className={"capitalize text-black/60"}>
                                                        {type}
                                                    </Label>
                                                    <Checkbox id={type} className={"size-5"}/>
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

                    <Accordion type={"single"} collapsible={true}>
                        <AccordionItem value={"item-1"}>
                            <AccordionTrigger className={"mb-2 text-xl font-bold"}>
                                Price
                            </AccordionTrigger>
                            <AccordionContent className={"mb-6"}>
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
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Accordion type={"single"} collapsible={true}>
                        <AccordionItem value={"item-2"}>
                            <AccordionTrigger className={"mb-2 text-xl font-bold"}>
                                Size
                            </AccordionTrigger>
                            <AccordionContent className={"mb-4"}>
                                <FormField
                                    name={"sizes"}
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className={"flex flex-col gap-y-4"}>
                                                    {
                                                        SIZES.map((type, idx) =>
                                                            <div key={type + idx}
                                                                 className={"flex items-center justify-between"}>
                                                                <Label htmlFor={type}
                                                                       className={"capitalize text-black/60"}>
                                                                    {type}
                                                                </Label>
                                                                <Checkbox id={type} className={"size-5"}/>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Accordion type={"single"} collapsible={true}>
                        <AccordionItem value={"item-3"}>
                            <AccordionTrigger className={"mb-2 text-xl font-bold"}>
                                Dress Style
                            </AccordionTrigger>
                            <AccordionContent className={"mb-4"}>
                                <FormField
                                    name={"productCategory"}
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className={"flex flex-col gap-y-4"}>
                                                    {
                                                        CATEGORIES.map((type, idx) =>
                                                            <div key={type + idx}
                                                                 className={"flex items-center justify-between"}>
                                                                <Label htmlFor={type}
                                                                       className={"capitalize text-black/60"}>
                                                                    {type}
                                                                </Label>
                                                                <Checkbox id={type} className={"size-5"}/>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>


                    <Button className={"mt-6 w-full rounded-3xl"}>
                        Apply Filter
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default FilterForm;
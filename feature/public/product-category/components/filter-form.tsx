"use client"
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FilterFormDefaultValues, FilterFormSchema, FilterFormSchemaType} from "@/validation/schema";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {SIZES, TYPES} from "@/constants";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import PriceRangeSelector from "@/components/share/price-range-selector";
import {Button} from "@/components/ui/button";
import AccordionField from "@/feature/public/product-category/components/accordion-field";
import {arrayToSlug} from "@/lib/utils";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useFilterSheet} from "@/feature/public/product-category/hooks/use-filter-sheet";

function fieldArrayOnChange<T>(value: T, array: T[], callback: (value: T[]) => void) {
    if (array.includes(value)) {
        const newArray = array.filter(item => item !== value)
        callback([...newArray]);
    } else {
        callback([...array, value]);
    }
}

type FilterFormProps = {
    defaultValues?: FilterFormSchemaType
}

const FilterForm = ({defaultValues}: FilterFormProps) => {

    const form = useForm<FilterFormSchemaType>({
        resolver: zodResolver(FilterFormSchema),
        mode: "onChange",
        defaultValues: {...FilterFormDefaultValues, ...defaultValues},
    });

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const toggleFilterSheet = useFilterSheet(state => state.toggle);

    const onSubmit: SubmitHandler<FilterFormSchemaType> = (values) => {

        const processedValues = {
            types: arrayToSlug(values.types),
            sizes: arrayToSlug(values.sizes),
            min: values.priceRange[0],
            max: values.priceRange[1]
        }

        // only get the page params from the search params others are provided via defaultValues prop
        const params = new URLSearchParams(searchParams.get("page") ?? "");

        // set the searchParams object if the values[key] is not "" or undefined
        (Object.keys(processedValues) as (keyof typeof processedValues)[])
            .forEach(key => {
                if (processedValues[key]) {
                    params.set(key, processedValues[key].toString());
                }
            })

        //  Toggle the filter-sheet's state
        toggleFilterSheet();

        // push the searchParam to the current route
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <div className={"mt-6"}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>

                    <FormField
                        name={"types"}
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

                    <Button className={"mt-6 w-full rounded-3xl"}>
                        Apply Filter
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default FilterForm;
"use client"
import {SubmitHandler, useForm} from "react-hook-form";
import {CheckoutFormSchema, CheckoutFormSchemaType} from "@/validation/client-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Container from "@/components/client/container";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {CreditCard, Store, Truck} from "lucide-react";
import {cn} from "@/lib/utils";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {TOWNSHIPS, ZONES} from "@/constants/constants";
import CheckoutSummary from "@/feature/client/checkout/components/checkout-summary";
import {Button} from "@/components/ui/button";
import {IUserInfo} from "@/types/api.types";
import {useCartStore} from "@/hooks/use-cart-store";

const CheckoutForm = ({defaultValues}: { defaultValues: IUserInfo }) => {
    const cart = useCartStore(state => state.cart);
    const form = useForm<CheckoutFormSchemaType>({
        resolver: zodResolver(CheckoutFormSchema),
        mode: "onChange",
        defaultValues: {
            email: defaultValues.email ?? "",
            deliveryMethod: "delivery",
            firstName: defaultValues.firstName ?? "",
            lastName: defaultValues.lastName ?? "",
            address: defaultValues.address ?? "",
            state: defaultValues.state ?? "Ayeyarwady",
            township: defaultValues.township ?? "",
            postalCode: defaultValues.postalCode ?? "",
            phone: defaultValues.phoneNumber ?? "",
            transactionMethod: "card"
        },
    })

    const onSubmit: SubmitHandler<CheckoutFormSchemaType> = async (values) => {
        console.log(values);
        console.log(cart)
    }

    const state = form.watch("state");

    return (
        <Container>
            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <h3 className={"font-bold text-2xl mb-2"}>Contact</h3>
                    <FormField
                        name={"email"}
                        control={form.control}
                        render={({field}) =>
                            <FormItem className={"mb-8"}>
                                <FormLabel>
                                    Email
                                </FormLabel>
                                <FormMessage/>
                                <FormControl>
                                    <Input {...field} placeholder={"Eg: example@gmail.com"}/>
                                </FormControl>
                            </FormItem>
                        }
                    />

                    <h3 className={"font-bold text-2xl mb-2"}>Delivery</h3>
                    <FormField
                        name={"deliveryMethod"}
                        control={form.control}
                        render={({field}) =>
                            <FormItem className={"mb-8"}>
                                <FormLabel className={"sr-only"}>
                                    Delivery Method
                                </FormLabel>
                                <FormMessage/>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value}
                                                className={"gap-0"}>
                                        <FormItem
                                            className={
                                                cn(
                                                    "w-full px-3 py-2.5 flex items-center gap-x-2 rounded-tr-lg rounded-tl-lg border-[1.5px] border-red-300",
                                                    field.value === "delivery" ? "border-red-500" : "border-b-0"
                                                )
                                            }>
                                            <FormControl>
                                                <RadioGroupItem value={"delivery"}/>
                                            </FormControl>
                                            <FormLabel className={"w-full flex items-center justify-between !mt-0"}>
                                                <span>Deliver</span>
                                                <Truck/>
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem
                                            className={
                                                cn(
                                                    "w-full px-3 py-2.5 flex items-center gap-x-2 rounded-br-lg rounded-bl-lg border-[1.5px] border-red-300 border-t-0",
                                                    field.value === "pickup" && "border-red-500 border-t-1.5"
                                                )
                                            }>
                                            <FormControl>
                                                <RadioGroupItem value={"pickup"}/>
                                            </FormControl>
                                            <FormLabel className={"w-full flex items-center  justify-between !mt-0"}>
                                                <span>Pickup in Store</span>
                                                <Store/>
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        }
                    />

                    <FormField
                        name={"firstName"}
                        control={form.control}
                        render={({field}) =>
                            <FormItem className={"mb-8"}>
                                <FormLabel>
                                    First Name
                                </FormLabel>
                                <FormMessage/>
                                <FormControl>
                                    <Input {...field} placeholder={"Eg: Yamashita"}/>
                                </FormControl>
                            </FormItem>
                        }
                    />

                    <FormField
                        name={"lastName"}
                        control={form.control}
                        render={({field}) =>
                            <FormItem className={"mb-8"}>
                                <FormLabel>
                                    Last Name
                                </FormLabel>
                                <FormMessage/>
                                <FormControl>
                                    <Input {...field} placeholder={"Eg: Shirakawa"}/>
                                </FormControl>
                            </FormItem>
                        }
                    />

                    <FormField
                        name={"address"}
                        control={form.control}
                        render={({field}) =>
                            <FormItem className={"mb-8"}>
                                <FormLabel>
                                    Address
                                </FormLabel>
                                <FormMessage/>
                                <FormControl>
                                    <Input {...field} placeholder={"Address"}/>
                                </FormControl>
                            </FormItem>
                        }
                    />

                    <FormField
                        name={"state"}
                        control={form.control}
                        render={({field}) =>
                            <FormItem className={"mb-8"}>
                                <FormLabel className={"sr-only"}>
                                    State/ Division
                                </FormLabel>
                                <FormMessage/>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className={"py-2"}>
                                        <SelectTrigger className={"pb-7 pt-9 relative"}>
                                            <span className={"absolute top-1 left-3.5 text-xs"}>State/Division</span>
                                            <SelectValue placeholder={"State/Division"}/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            ZONES.map(item =>
                                                <SelectItem value={item} key={item}>{item}</SelectItem>
                                            )
                                        }
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        }
                    />

                    <FormField
                        name={"township"}
                        control={form.control}
                        render={({field}) =>
                            <FormItem className={"mb-8"}>
                                <FormLabel className={"sr-only"}>
                                    TownShip
                                </FormLabel>
                                <FormMessage/>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className={cn("relative", field.value && "pb-7 pt-9")}>
                                            {field.value &&
                                                <span className={"absolute top-1 left-3.5 text-xs"}>Township</span>}
                                            <SelectValue placeholder={"Township"}/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            TOWNSHIPS[state]?.map(item =>
                                                <SelectItem value={item} key={item}>{item}</SelectItem>
                                            )
                                        }
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        }
                    />

                    <FormField
                        name={"postalCode"}
                        control={form.control}
                        render={({field}) =>
                            <FormItem className={"mb-8"}>
                                <FormLabel>
                                    Postal Code
                                </FormLabel>
                                <FormMessage/>
                                <FormControl>
                                    <Input {...field} placeholder={"Eg: 111111"}/>
                                </FormControl>
                            </FormItem>
                        }
                    />

                    <FormField
                        name={"phone"}
                        control={form.control}
                        render={({field}) =>
                            <FormItem className={"mb-8"}>
                                <FormLabel>
                                    Phone Number
                                </FormLabel>
                                <FormMessage/>
                                <FormControl>
                                    <Input {...field} placeholder={"Eg: 09123456789"}/>
                                </FormControl>
                            </FormItem>
                        }
                    />

                    <h3 className={"font-bold text-2xl mb-2"}>Payment Method</h3>
                    <FormField
                        name={"transactionMethod"}
                        control={form.control}
                        render={({field}) =>
                            <FormItem className={"mb-8"}>
                                <FormLabel className={"sr-only"}>
                                    Delivery Method
                                </FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value}
                                                className={"gap-0"}>
                                        <FormItem
                                            className={
                                                cn(
                                                    "w-full px-3 py-2.5 flex items-center gap-x-2 rounded-tr-lg rounded-tl-lg border-[1.5px] border-red-300",
                                                    field.value === "card" ? "border-red-500" : "border-b-0"
                                                )
                                            }>
                                            <FormControl>
                                                <RadioGroupItem value={"card"}/>
                                            </FormControl>
                                            <FormLabel className={"w-full flex items-center justify-between !mt-0"}>
                                                <span>Card</span>
                                                <CreditCard/>
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem
                                            className={
                                                cn(
                                                    "w-full px-3 py-2.5 flex items-center gap-x-2 rounded-br-lg rounded-bl-lg border-[1.5px] border-red-300 border-t-0",
                                                    field.value === "paypal" && "border-red-500 border-t-1.5"
                                                )
                                            }>
                                            <FormControl>
                                                <RadioGroupItem value={"paypal"}/>
                                            </FormControl>
                                            <FormLabel className={"w-full flex items-center  justify-between !mt-0"}>
                                                <span>Paypal</span>
                                                <CreditCard/>
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        }
                    />
                    <h3 className={"font-bold text-2xl mb-2"}>Order Summary</h3>
                    <div className={"md:hidden"}>
                        <CheckoutSummary/>
                    </div>
                    <Button className={"mt-4 w-full rounded-3xl"}>
                        Checkout
                    </Button>
                </form>
            </Form>
        </Container>
    );
};

export default CheckoutForm;
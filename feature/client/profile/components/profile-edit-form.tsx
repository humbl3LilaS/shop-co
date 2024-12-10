"use client"
import {IUserInfo} from "@/types/api.types";
import {SubmitHandler, useForm} from "react-hook-form";
import {ProfileEditFormSchema, ProfileEditFormSchemaType} from "@/validation/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {TOWNSHIPS, ZONES} from "@/constants";
import {Button} from "@/components/ui/button";
import {updateUserInfo} from "@/feature/client/profile/actions/update-user-info";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";
import {useEditProfileSheet} from "@/feature/client/profile/hooks/use-edit-profile-sheet";
import {Loader2} from "lucide-react";


const ProfileEditForm = ({defaultValues}: { defaultValues: IUserInfo }) => {
    const form = useForm<ProfileEditFormSchemaType>({
        resolver: zodResolver(ProfileEditFormSchema),
        mode: "onChange",
        defaultValues: {
            ...defaultValues,
            state: defaultValues.state ?? "",
            phoneNumber: defaultValues.phoneNumber ?? "",
            township: defaultValues.township ?? "",
            address: defaultValues.address ?? "",
            postalCode: defaultValues.postalCode ?? "",
        },
    });

    const {toast} = useToast();
    const router = useRouter();
    const setOpen = useEditProfileSheet(state => state.setOpen);
    const disableSubmit = !form.formState.isDirty || form.formState.isSubmitting
    const onSubmit: SubmitHandler<ProfileEditFormSchemaType> = async (values) => {
        const dirtyField = Object.keys(form.formState.dirtyFields) as unknown as Array<keyof IUserInfo>;
        if (dirtyField.length === 0) {
            return;
        }
        const valuesChanges = dirtyField.reduce((obj, key) => {
            return {
                ...obj,
                [key]: values[key as keyof typeof values]
            }

        }, {} as Partial<IUserInfo>)
        const res = await updateUserInfo(valuesChanges);
        if (!res) {
            toast({title: "Failed to update info", variant: "destructive"});
        }
        toast({title: "Successfully updated profile"});
        router.refresh();
        setOpen(false)
    }

    const state = form.watch("state");

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"mt-4"}>
                <h2 className={"font-bold text-lg mb-3"}>Personal Info</h2>
                <FormField
                    name={"email"}
                    control={form.control}
                    render={({field}) =>
                        <FormItem className={"mb-8"}>
                            <FormLabel>
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input {...field} placeholder={"Eg: example@gmail.com"}/>
                            </FormControl>
                            <FormMessage/>
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
                            <FormControl>
                                <Input {...field} placeholder={"Eg: Yamashita"}/>
                            </FormControl>
                            <FormMessage/>
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
                            <FormControl>
                                <Input {...field} placeholder={"Eg: Shirakawa"}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    }
                />

                <FormField
                    name={"userName"}
                    control={form.control}
                    render={({field}) =>
                        <FormItem className={"mb-8"}>
                            <FormLabel>
                                User name
                            </FormLabel>
                            <FormControl>
                                <Input {...field} placeholder={"Eg: Super User"}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    }
                />

                <FormField
                    name={"phoneNumber"}
                    control={form.control}
                    render={({field}) =>
                        <FormItem className={"mb-8"}>
                            <FormLabel>
                                Phone Number
                            </FormLabel>
                            <FormControl>
                                <Input {...field} placeholder={"Eg: 09123456789"}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    }
                />

                <h2 className={"font-bold text-lg mb-3"}>Billing Info</h2>
                <FormField
                    name={"state"}
                    control={form.control}
                    render={({field}) =>
                        <FormItem className={"mb-8"}>
                            <FormLabel className={"sr-only"}>
                                State/ Division
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl className={"py-2"}>
                                    <SelectTrigger className={cn("relative", field.value && "pb-7 pt-9")}>
                                        {field.value &&
                                            <span className={"absolute top-1 left-3.5 text-xs"}>State/Division</span>}
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
                                        state && (TOWNSHIPS[state])?.map(item =>
                                            <SelectItem value={item} key={item}>{item}</SelectItem>
                                        )
                                    }
                                </SelectContent>
                            </Select>
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
                            <FormControl>
                                <Input {...field} placeholder={"Address"}/>
                            </FormControl>
                            <FormMessage/>
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
                            <FormControl>
                                <Input {...field} placeholder={"Eg: 111111"}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    }
                />


                <Button
                    className={"mt-4 w-full rounded-3xl"}
                    disabled={disableSubmit}
                >
                    {form.formState.isSubmitting
                        ? <>
                            <Loader2 className={"animate-spin"}/>
                            <span>Submitting</span>
                        </>
                        : <span>Save Changes</span>}
                </Button>
            </form>
        </Form>
    );
};

export default ProfileEditForm;
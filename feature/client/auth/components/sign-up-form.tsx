"use client"
import {SubmitHandler, useForm} from "react-hook-form";
import {SignUpSchema, SignUpSchemaDefaultValues, SignUpSchemaType} from "@/validation/client-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {signUp} from "@/feature/client/auth/actions/sign-up";
import {useRouter} from "next/navigation";
import {Loader2} from "lucide-react";
import PasswordField from "@/components/share/password-field";

const SignUpForm = () => {
    const form = useForm<SignUpSchemaType>({
        resolver: zodResolver(SignUpSchema),
        mode: "onChange",
        defaultValues: {...SignUpSchemaDefaultValues}
    })

    const router = useRouter();

    const onSubmit: SubmitHandler<SignUpSchemaType> = async (values) => {
        const user = await signUp(values);
        if (user) {
            router.push("/")
        }
    }

    return (
        <div className={"w-full max-w-screen-sm  px-4 py-6 rounded-2xl bg-white shadow-lg lg:max-w-screen-md md:p-10"}>
            <h1 className={"mb-3 text-2xl font-bold"}>Sign Up</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name={"email"}
                        control={form.control}
                        render={({field}) =>
                            <FormItem className={"mb-8"}>
                                <FormLabel className={"md:text-base"}>
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
                                <FormLabel className={"md:text-base"}>
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
                                <FormLabel className={"md:text-base"}>
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
                                <FormLabel className={"md:text-base"}>
                                    User Name
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder={"Eg: SuperEdelweiss"}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        }
                    />

                    <FormField
                        name={"password"}
                        control={form.control}
                        render={({field}) =>
                            <FormItem className={"mb-8"}>
                                <FormLabel className={"md:text-base"}>
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <PasswordField value={field.value} onChange={field.onChange}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        }
                    />

                    <FormField
                        name={"confirmPassword"}
                        control={form.control}
                        render={({field}) =>
                            <FormItem className={"mb-8"}>
                                <FormLabel className={"md:text-base"}>
                                    Confirm Password
                                </FormLabel>
                                <FormControl>
                                    <PasswordField value={field.value} onChange={field.onChange}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        }
                    />

                    <Button
                        className={"w-full rounded-3xl"}
                        disabled={form.formState.isSubmitting || !form.formState.isValid}
                    >
                        {
                            form.formState.isSubmitting
                                ? <>
                                    <span>Submitting</span>
                                    <Loader2 className={"animate-spin"}/>
                                </>
                                : "Sign Up"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default SignUpForm;
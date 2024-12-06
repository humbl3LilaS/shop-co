"use client"
import {SubmitHandler, useForm} from "react-hook-form";
import {SignUpSchema, SignUpSchemaDefaultValues, SignUpSchemaType} from "@/validation/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {signUp} from "@/feature/auth/actions/sign-up";
import {useRouter} from "next/navigation";

const SignUpForm = () => {
    const form = useForm<SignUpSchemaType>({
        resolver: zodResolver(SignUpSchema),
        mode: "onChange",
        defaultValues: {...SignUpSchemaDefaultValues}
    })

    const router = useRouter();

    const onSubmit: SubmitHandler<SignUpSchemaType> = async (values) => {
        const user = await signUp(values);
        console.log(user)
        if (user) {
            router.push("/")
        }
    }

    return (
        <div className={"w-full max-w-screen-sm  px-4 py-6 rounded-lg bg-white shadow-lg"}>
            <h1 className={"mb-3 text-2xl font-bold"}>Sign Up</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                <FormLabel>
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder={"Eg: Abc123@"}/>
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
                                <FormLabel>
                                    Confirm Password
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder={"Eg: Abc123@"}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        }
                    />

                    <Button
                        type="submit"
                        className={"w-full rounded-3xl"}
                    >
                        Sign Up
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default SignUpForm;
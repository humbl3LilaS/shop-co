"use client"
import {SubmitHandler, useForm} from "react-hook-form";
import {SignInSchema, SignInSchemaType} from "@/validation/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {signIn} from "@/feature/auth/actions/sign-in";
import {useRouter} from "next/navigation";
import PasswordField from "@/feature/auth/components/password-field";
import {useToast} from "@/hooks/use-toast";
import {Loader2} from "lucide-react";

const SignInForm = () => {

    const form = useForm<SignInSchemaType>({
        resolver: zodResolver(SignInSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const {toast} = useToast();

    const router = useRouter();

    const onSubmit: SubmitHandler<SignInSchemaType> = async (values) => {
        const auth = await signIn(values);
        if (!auth.success) {
            toast({title: `Login Failed Invalid ${auth.error}`, variant: "destructive", duration: 500})
        } else {
            router.push("/");
        }

    }

    return (
        <div className={"w-full max-w-screen-sm  px-4 py-6 rounded-2xl bg-white shadow-lg lg:max-w-screen-md md:p-10"}>
            <h1 className={"mb-3 text-2xl font-bold"}>Sign In</h1>
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
                    <Button className={"w-full rounded-3xl"}>
                        {
                            form.formState.isSubmitting
                                ? <>
                                    <span>Submitting</span>
                                    <Loader2 className={"animate-spin"}/>
                                </>
                                : "Sign In"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default SignInForm;
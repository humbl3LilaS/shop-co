"use client"
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import PasswordField from "@/components/share/password-field";
import {authenticateAdmin} from "@/feature/admin/auth/actions/authenticateAdmin";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";
import {AdminLoginSchema, AdminLoginSchemaType} from "@/validation/admin-schema";
import {Loader2} from "lucide-react";

const AdminAuthForm = () => {
    const form = useForm<AdminLoginSchemaType>({
        resolver: zodResolver(AdminLoginSchema),
        mode: "onChange",
        defaultValues: {
            passkey: "",
            id: "",
        }
    })
    const {toast} = useToast();
    const router = useRouter();
    const onSubmit: SubmitHandler<AdminLoginSchemaType> = async (value) => {
        const res = await authenticateAdmin(value);
        if (res.error) {
            toast({title: `Error: ${res.message}`, variant: "destructive", duration: 1500})
            return;
        }
        toast({title: res.message, duration: 1500})
        router.push("/admin/dashboard/overview")
    }

    return (
        <div className={"w-full max-w-screen-sm  px-4 py-6 rounded-2xl bg-white shadow-lg lg:max-w-screen-md md:p-10"}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name={"id"}
                        control={form.control}
                        render={({field}) =>
                            <FormItem className={"mb-8"}>
                                <FormLabel className={"md:text-base"}>
                                    Id:
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder={"Enter Id"}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        }
                    />
                    <FormField
                        name={"passkey"}
                        control={form.control}
                        render={({field}) =>
                            <FormItem className={"mb-8"}>
                                <FormLabel className={"md:text-base"}>
                                    Passkey:
                                </FormLabel>
                                <FormControl>
                                    <PasswordField value={field.value} onChange={field.onChange}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        }
                    />
                    <Button type="submit"
                            disabled={form.formState.isSubmitting || !form.formState.isValid}
                    >
                        {
                            form.formState.isSubmitting
                                ? <>
                                    <span>Authenticating</span>
                                    <Loader2 className={"animate-spin"}/>
                                </>
                                : "Authenticate"
                        }
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default AdminAuthForm;
"use server"
import {SignInSchemaType} from "@/validation/schema";
import {signIn as signInAuth} from "@/auth";
import {CredentialsSignin} from "next-auth";


export const signIn = async (payload: SignInSchemaType) => {
    try {
        // invoke auth.js signIn to get session data
        const res = await signInAuth("credentials", {
            email: payload.email,
            password: payload.password,
            redirect: false
        });
        console.log("res", res)
        return {success: true, error: undefined};

    } catch (error) {
        console.log("Error during Sign In", error)
        if (error instanceof CredentialsSignin) {
            console.log("cause", error.code)
            return {success: false, error: error.code};
        }
        return {success: false, error: "Failed"};
    }
}
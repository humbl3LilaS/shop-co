"use server"
import {SignInSchemaType} from "@/validation/schema";
import {signIn as signInAuth} from "@/auth";


export const signIn = async (payload: SignInSchemaType) => {
    try {
        // invoke auth.js signIn to get session data
        await signInAuth("credentials", {email: payload.email, password: payload.password, redirect: false});
        return true;

    } catch (error) {
        console.log("Error during Sign In", error)
    }
}
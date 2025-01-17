import SignInForm from "@/feature/client/auth/components/sign-in-form";

const SignInPage = () => {
    return (
        <section
            className={
                "w-dvw h-dvh md:w-screen md:h-screen px-4 flex items-center justify-center bg-[#f0f0f0]"
            }
        >
            <SignInForm />
        </section>
    );
};

export default SignInPage;

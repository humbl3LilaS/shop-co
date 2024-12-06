import SignUpForm from "@/feature/auth/components/sign-up-form";

const SignUpPage = () => {
    return (
        <section className={"w-dvw h-dvh md:w-screen md:h-screen px-4 flex items-center justify-center bg-[#f0f0f0]"}>
            <SignUpForm/>
        </section>
    );
};

export default SignUpPage;
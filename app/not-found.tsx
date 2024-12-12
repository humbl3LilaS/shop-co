import RedirectBtn from "@/components/share/redirect-btn";

const NotFound = () => {
    return (
        <body>
        <main>
            <section className={"w-screen h-screen flex justify-center items-center bg-[#f0f0f0]"}>
                <div className={"py-20 w-full max-w-screen-md bg-white shadow-lg rounded-lg"}>
                    <h1 className={"mb-3 text-4xl font-bold text-center "}>404: Not Found</h1>
                    <p className={"text-center text-lg font-semibold text-black/40"}>
                        Your requested page is invalid
                    </p>
                    <RedirectBtn/>
                </div>

            </section>
        </main>
        </body>
    );
};

export default NotFound;
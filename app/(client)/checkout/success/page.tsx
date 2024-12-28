import Container from "@/components/client/container";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { permanentRedirect, RedirectType } from "next/navigation";

const CheckoutSuccessPage = () => {
    return (
        <Container className={"pt-10 md:pt-12.5 lg:pt-25"}>
            <div
                className={
                    "h-[200px] flex flex-col items-center justify-center gap-y-4 border-2 border-black/40 rounded-xl md:h-[280px]"
                }
            >
                <h2
                    className={
                        "flex justify-center items-center gap-x-3 text-xl font-bold lg:text-3xl"
                    }
                >
                    <Check />
                    <span>Successfully Checkout</span>
                </h2>
                <Button
                    onClick={async () => {
                        "use server";
                        permanentRedirect("/transactions", RedirectType.replace);
                    }}
                >
                    See Transaction
                </Button>
            </div>
        </Container>
    );
};

export default CheckoutSuccessPage;

"use client";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import Container from "@/components/client/container";
import CheckoutSummary from "@/feature/client/checkout/components/checkout-summary";
import { useCartSummary } from "@/hooks/use-cart-summary";

const CheckoutSummaryDropDown = () => {
    const [active, setActive] = useState<string | undefined>(undefined);
    const summary = useCartSummary();
    return (
        <Container className={"lg:hidden"}>
            <div>
                <Accordion
                    type={"single"}
                    onValueChange={(value) => setActive(value)}
                    collapsible={true}
                >
                    <AccordionItem value={"order-summary"}>
                        <div className={"flex items-center justify-between"}>
                            <AccordionTrigger className={"shadow-none"}>
                                {active ? "Hide Order Summary" : "Show order Summary"}
                            </AccordionTrigger>
                            <div>{summary ? `$${summary.totalPrice}` : "..."}</div>
                        </div>
                        <AccordionContent className={"mb-4"}>
                            <CheckoutSummary />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </Container>
    );
};

export default CheckoutSummaryDropDown;

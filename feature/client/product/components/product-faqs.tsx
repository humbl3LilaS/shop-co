import Container from "@/components/client/container";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {FAQS} from "@/constants/client-constants";

const ProductFaqs = () => {
    return (
        <Container>
            <header className={"py-4"}>
                <h2 className={"text-lg font-bold lg:text-xl"}>Frequently Asked Questions</h2>
            </header>
            <Accordion type={"single"} collapsible={true}>
                {
                    FAQS.map((faq, idx) => (
                        <AccordionItem
                            value={`item-${idx + 1}`}
                            key={`item-${idx}`}
                            className={"py-4 text-lg md:text-xl"}
                        >
                            <AccordionTrigger>
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className={"md:text-lg md:text-black/60"}>
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))
                }
            </Accordion>
        </Container>
    );
};

export default ProductFaqs;
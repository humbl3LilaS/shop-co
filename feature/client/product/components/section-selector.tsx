"use client"
import ProductReviews from "@/feature/client/reviews/components/product-reviews";
import ProductDetails from "@/feature/client/product/components/product-details";
import ProductFaqs from "@/feature/client/product/components/product-faqs";
import {useChangeSection} from "@/feature/client/product/hook/use-change-section";
import {SECTIONS} from "@/constants";
import {cn} from "@/lib/utils";
import Container from "@/components/share/container";


const SectionSelector = ({details}:{details: string | null }) => {
    const activeSection = useChangeSection(state => state.activeSession);
    const setSection = useChangeSection(state => state.setSection)
    return (
        <>
            <Container className={"py-0 my-0 lg:mb-4"}>
                <div>
                    <ul className={"grid grid-cols-3"}>
                        {
                            SECTIONS.map(item =>
                                <li
                                    key={item.value}
                                    onClick={() => setSection(item.value)}
                                    className={cn("block pb-2 text-center text-sm cursor-pointer md:text-base lg:text-lg", item.value === activeSection && "border-b-[1.5px] border-b-black")}
                                >
                                    {item.title}
                                </li>
                            )
                        }
                    </ul>
                </div>
            </Container>
            {activeSection === "reviews" && <ProductReviews/>}
            {activeSection === "details" && <ProductDetails details={details}/>}
            {activeSection === "faqs" && <ProductFaqs/>}
        </>
    );
};

export default SectionSelector;
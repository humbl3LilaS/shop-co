"use client"
import ProductReviews from "@/feature/public/reviews/components/product-reviews";
import ProductDetails from "@/feature/public/product/components/product-details";
import ProductFaqs from "@/feature/public/product/components/product-faqs";
import {useChangeSection} from "@/feature/public/product/hook/use-change-section";
import {SECTIONS} from "@/constants";
import {cn} from "@/lib/utils";


const SectionSelector = () => {
    const activeSection = useChangeSection(state => state.activeSession);
    const setSection = useChangeSection(state => state.setSection)
    return (
        <div>
            <nav>
                <ul className={"grid grid-cols-3"}>
                    {
                        SECTIONS.map(item =>
                            <li
                                key={item.value}
                                onClick={() => setSection(item.value)}
                                className={cn("block pb-2 text-center text-sm cursor-pointer", item.value === activeSection && "border-b-[1.5px] border-b-black")}
                            >
                                {item.title}
                            </li>
                        )
                    }
                </ul>
            </nav>
            {activeSection === "reviews" && <ProductReviews/>}
            {activeSection === "details" && <ProductDetails/>}
            {activeSection === "faqs" && <ProductFaqs/>}
        </div>
    );
};

export default SectionSelector;
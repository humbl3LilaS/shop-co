import CheckoutSummaryDropDown from "@/feature/public/checkout/components/checkout-summary-drop-down";
import CheckoutForm from "@/feature/public/checkout/components/checkout-form";
import CheckoutSummary from "@/feature/public/checkout/components/checkout-summary";
import Container from "@/components/share/container";

const CheckoutPage = () => {
    return (
        <div className={"lg:grid grid-cols-2 lg:h-[90vh] lg:py-8"}>
            <CheckoutSummaryDropDown/>
            <div className={"overflow-y-scroll"}>
                <CheckoutForm/>
            </div>
            <Container className={"hidden lg:block lg:pr-25 lg:pl-10"}>
                <h3 className={"font-bold text-2xl mb-4"}>Order Summary</h3>
                <CheckoutSummary/>
            </Container>
        </div>
    );
};

export default CheckoutPage;
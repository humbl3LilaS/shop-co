import CheckoutSummaryDropDown from "@/feature/public/checkout/components/checkout-summary-drop-down";
import CheckoutForm from "@/feature/public/checkout/components/checkout-form";

const CheckoutPage = () => {
    return (
        <div>
            <CheckoutSummaryDropDown/>
            <CheckoutForm/>
        </div>
    );
};

export default CheckoutPage;
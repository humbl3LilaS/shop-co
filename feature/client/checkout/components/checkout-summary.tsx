"use client"
import CheckoutProductList from "@/feature/client/checkout/components/checkout-product-list";
import CheckoutDetails from "@/feature/client/checkout/components/checkout-details";

const CheckoutSummary = () => {
    return (
        <div className="p-4 border border-black/20 rounded-lg">
            <CheckoutProductList/>
            <CheckoutDetails/>
        </div>
    );
};

export default CheckoutSummary;
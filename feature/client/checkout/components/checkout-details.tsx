import {useCartSummary} from "@/hooks/use-cart-summary";

const CheckoutDetails = () => {
    const summary = useCartSummary();
    return (
        <div className={"mt-4"}>
            <p className={"flex items-end justify-between"}>
                <span className={"text-black/60 font-bold"}>Subtotal:</span>
                <span className={"font-bold"}>
                            {
                                summary ? `$${summary.totalPrice}` : "..."
                            }
                </span>
            </p>
        </div>
    );
};

export default CheckoutDetails;
import CheckoutSummaryDropDown from "@/feature/client/checkout/components/checkout-summary-drop-down";
import CheckoutForm from "@/feature/client/checkout/components/checkout-form";
import CheckoutSummary from "@/feature/client/checkout/components/checkout-summary";
import Container from "@/components/share/container";
import {auth} from "@/auth";
import {notFound, redirect} from "next/navigation";
import {getProfileData} from "@/feature/client/profile/actions/getProfileData";

const CheckoutPage = async () => {
    const session = await auth();
    if (!session) {
        redirect("/auth/sign-in");
    }
    const profile = await getProfileData(session.user.id);
    if (!profile) {
        notFound();
    }

    return (
        <div className={"lg:grid grid-cols-2 lg:h-[90vh] lg:py-8"}>
            <CheckoutSummaryDropDown/>
            <div className={"overflow-y-scroll"}>
                <CheckoutForm defaultValues={profile}/>
            </div>
            <Container className={"hidden lg:block lg:pr-25 lg:pl-10"}>
                <h3 className={"font-bold text-2xl mb-4"}>Order Summary</h3>
                <CheckoutSummary/>
            </Container>
        </div>
    );
};

export default CheckoutPage;
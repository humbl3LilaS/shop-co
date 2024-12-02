import Container from "@/components/share/container";
import CustomBreadcrumb from "@/components/share/custom-breadcrumb";
import Cart from "@/feature/public/cart/components/cart";

const Page = () => {


    return (
        <Container>
            <CustomBreadcrumb/>
            <div>
                <h2 className={"text-3xl font-bold font-title"}>Your cart</h2>
                <Cart/>
            </div>
        </Container>
    );
};

export default Page;
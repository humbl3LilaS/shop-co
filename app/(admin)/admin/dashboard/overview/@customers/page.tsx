import Container from "@/components/admin/Container";
import {Button} from "@/components/ui/button";
import {Settings2} from "lucide-react";
import CustomerChart from "@/feature/admin/overview/components/customer-chart";

const CustomerPage = () => {
    return (
        <Container className={"col-span-2 row-span-2"}>
            <div className={"w-full h-full p-8 bg-white rounded-xl shadow-md flex flex-col justify-center gap-y-4"}>
                <header className={"flex items-center justify-between"}>
                    <div>
                        <h2 className={"font-bold"}>Customers</h2>
                        <p className={"text-sm text-black/40 font-semibold"}>Information about customers</p>
                    </div>
                    <Button variant={"ghost"}>
                        <Settings2/>
                    </Button>
                </header>
                <div className={"flex-1"}>
                    <CustomerChart/>
                </div>
            </div>
        </Container>
    );
};

export default CustomerPage;
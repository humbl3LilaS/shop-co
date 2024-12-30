import Container from "@/components/admin/Container";
import OrdersTable from "@/feature/admin/orders/components/orders-table";

const OrdersPage = () => {
    return (
        <Container className={"h-auto p-8"}>
            <OrdersTable />
        </Container>
    );
};

export default OrdersPage;

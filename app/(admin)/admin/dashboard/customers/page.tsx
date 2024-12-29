import Container from "@/components/admin/Container";
import CustomersTable from "@/feature/admin/customers/components/customers-table";

const DashboardCustomersPage = () => {
    return (
        <Container className={"h-auto p-8"}>
            <CustomersTable />
        </Container>
    );
};

export default DashboardCustomersPage;

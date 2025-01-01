import Container from "@/components/admin/Container";
import TransactionsTable from "@/feature/admin/transactions/components/transactions-table";

const AdminTransactionPage = () => {
    return (
        <Container className={"h-auto p-8"}>
            <TransactionsTable />
        </Container>
    );
};

export default AdminTransactionPage;

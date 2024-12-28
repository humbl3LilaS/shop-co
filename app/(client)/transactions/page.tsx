import Container from "@/components/client/container";
import CustomBreadcrumb from "@/components/client/custom-breadcrumb";
import { getTransactions } from "@/feature/client/transactions/actions/get-transactions";
import { notFound } from "next/navigation";
import TransactionsList from "@/feature/client/transactions/components/transactions-list";

const TransactionPage = async () => {
    const transactions = await getTransactions();
    if (!transactions) {
        notFound();
    }
    return (
        <Container className={"pt-6 md:pt-10"}>
            <header className={"mb-4"}>
                <CustomBreadcrumb />
                <h2 className={"text-2xl font-bold"}>Transactions</h2>
            </header>
            <TransactionsList data={transactions} />
        </Container>
    );
};

export default TransactionPage;

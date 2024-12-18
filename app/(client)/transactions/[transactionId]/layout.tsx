import Container from "@/components/client/container";
import CustomBreadcrumb from "@/components/client/custom-breadcrumb";

const TransactionDetailLayout = ({
                                     children,
                                     details
                                 }: Readonly<{
    children: React.ReactNode;
    details: React.ReactNode;
}>) => {
    return (
        <Container>
            <CustomBreadcrumb/>
            {children}
            {details}
        </Container>
    );
};

export default TransactionDetailLayout;
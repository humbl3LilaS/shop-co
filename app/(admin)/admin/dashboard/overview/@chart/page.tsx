import Container from "@/components/admin/Container";
import SaleChart from "@/feature/admin/overview/components/sale-chart";

const Chart = () => {
    return (
        <Container className={"row-span-2 col-span-3"}>
            <SaleChart />
        </Container>
    );
};

export default Chart;

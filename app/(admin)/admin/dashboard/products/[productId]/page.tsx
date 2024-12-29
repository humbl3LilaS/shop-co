const DashboardProductDetailPage = async ({ params }: { params: Promise<{ productId: string }> }) => {
    const { productId } = await params;
    return (
        <div>
            {productId}
        </div>
    );
};

export default DashboardProductDetailPage;
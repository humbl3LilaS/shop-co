import Link from "next/link";

const DashboardProductDetailPage = async ({
    params,
}: {
    params: Promise<{ productId: string }>;
}) => {
    const { productId } = await params;
    return (
        <div>
            <p>{productId}</p>
            <Link
                href={`/admin/dashboard/products/edit/${productId}`}
                className={"absolute px-5 py-2 bg-black rounded-lg text-white"}
            >
                Edit Product
            </Link>
        </div>
    );
};

export default DashboardProductDetailPage;

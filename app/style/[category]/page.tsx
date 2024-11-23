import {STYLES} from "@/constants";
import {notFound} from "next/navigation";

const ProductCategoryPage = async ({params}: { params: Promise<{ category: string }> }) => {
    const {category} = await params;

    if (STYLES.every(item => item.title !== category)) {
        return notFound();
    }

    return (
        <div>
            <h1>{category}</h1>
        </div>
    );
};

export default ProductCategoryPage;
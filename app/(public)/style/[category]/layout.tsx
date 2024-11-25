import {AntdRegistry} from "@ant-design/nextjs-registry";


const ProductCategoryPageLayout = ({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <AntdRegistry>
            {children}
        </AntdRegistry>
    );
};

export default ProductCategoryPageLayout;
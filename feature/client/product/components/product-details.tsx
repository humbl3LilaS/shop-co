import Container from "@/components/client/container";

import markdownit from "markdown-it";

const ProductDetails = ({ details }: { details: string | null }) => {
    const md = new markdownit();
    console.log(details);
    //TODO: remove addLineBreaks after adding markdown parser in create-products-from in admin panel
    const parsedHtml = md.render(details ?? "");
    return (
        <Container className={"py-8"}>
            <div
                dangerouslySetInnerHTML={{ __html: parsedHtml }}
                className={"prose-base break-after-all"}
            />
        </Container>
    );
};

export default ProductDetails;

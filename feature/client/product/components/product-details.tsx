import Container from "@/components/client/container";

import markdownit from "markdown-it";

const ProductDetails = ({ details }: { details: string | null }) => {
    const md = new markdownit();
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

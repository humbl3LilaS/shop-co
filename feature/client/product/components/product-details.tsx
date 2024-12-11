import Container from "@/components/client/container";

import markdownit from "markdown-it";
import {addLineBreaks} from "@/lib/utils";


const ProductDetails = ({details}: { details: string | null }) => {

    const md = new markdownit();
    //TODO: remove addLineBreaks after adding markdown parser in create-product-from in admin panel
    const parsedHtml = md.render(addLineBreaks(details ?? ""));
    return (
        <Container>
            <div dangerouslySetInnerHTML={{__html: parsedHtml}} className={"prose-base break-after-all"}/>
        </Container>
    );
};

export default ProductDetails;
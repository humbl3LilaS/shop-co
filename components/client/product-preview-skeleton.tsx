import {Skeleton} from "@/components/ui/skeleton";

const ProductPreviewSkeleton = ({title}: {title: string}) => {
    return (
        <section className={"py-10 px-4"}>
            <h2 className={"mb-8 text-4xl text-center font-bold font-title uppercase tracking-wide"}>{title}</h2>
            <div className={"md:px-25 md:grid grid-cols-2 gap-6 lg:grid-cols-4"}>
                {
                    new Array(4).fill(0).map((_, i) =>
                        <div key={i} className={"h-[280px]"}>
                            <Skeleton className={"w-full h-full"}/>
                        </div>
                    )
                }
            </div>
        </section>
);
};

export default ProductPreviewSkeleton;
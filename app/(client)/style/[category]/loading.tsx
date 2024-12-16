import Container from "@/components/client/container";
import CustomBreadcrumb from "@/components/client/custom-breadcrumb";
import {Skeleton} from "@/components/ui/skeleton";

const CategoryLoadingPage = () => {
    return (
        <Container className={"w-screen h-[65vh]"}>
            <CustomBreadcrumb/>
            <div className={"w-full h-full grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:grid-rows-2"}>
                <Skeleton className="hidden lg:block row-span-2"/>
                {
                    (new Array(3).fill(0)).map((_, index) => (
                       <div key={index} className={"flex flex-col gap-y-2"}>
                           <Skeleton className={"w-full max-w-[300px] mx-auto aspect-square"} />
                           <Skeleton className={"w-full h-5"} />
                           <Skeleton className={"w-full h-5"} />
                           <Skeleton className={"w-2/5 h-5"} />
                       </div>
                    ))
                }
            </div>
        </Container>
    );
};

export default CategoryLoadingPage;
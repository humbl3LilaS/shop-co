import Container from "@/components/client/container";
import {Skeleton} from "@/components/ui/skeleton";

const Loading = () => {
    return (
        <Container className={"w-screen h-[70vh] py-10"}>
            <div className={"w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-6"}>
                <Skeleton className={"w-full h-full min-h-[350px] rounded-2xl"}/>
                <div className={"w-full h-full flex flex-col gap-y-4"}>
                    <Skeleton className="w-4/5 h-10 rounded-lg"/>
                    <Skeleton className="w-3/5 h-[30px] rounded-lg"/>
                    <Skeleton className="w-2/5 h-[30px] rounded-lg"/>
                    <div className={"w-full"}>
                        <Skeleton className="mb-2 w-full h-[15px] rounded-lg"/>
                        <Skeleton className="mb-2 w-10/12 h-[15px] rounded-lg"/>
                        <Skeleton className="mb-2 w-8/12 h-[15px] rounded-lg"/>
                    </div>
                    <Skeleton className="flex-1 mb-2 w-full h-auto rounded-lg"/>
                    <Skeleton className="flex-1 mb-2 w-full h-auto rounded-lg"/>

                </div>
            </div>
        </Container>
    );
};

export default Loading;
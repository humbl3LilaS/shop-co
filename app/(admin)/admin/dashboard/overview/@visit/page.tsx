import Container from "@/components/admin/Container";
import {ChevronRight, User} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Progress} from "@/components/ui/progress";

const VisitPage = () => {
    return (
        <Container className={"col-span-2 row-span-2"}>
            <div className={"w-full h-full p-8 bg-white rounded-xl shadow-md flex flex-col"}>
                <header className={"mb-6"}>
                    <h2 className={"font-semibold"}>
                        Store Visits
                    </h2>
                    <p className={"text-black/40 text-sm"}>Detail about your store visits</p>
                </header>
                <div className={"flex gap-x-4"}>
                    <div className={"w-12 h-12 flex items-center justify-center bg-blue-200/30 rounded-lg"}>
                        <User color="#99c1f1"/>
                    </div>
                    <p className={"*:block"}>
                        <span className={"mb-1 font-bold"}>Pro Analytics</span>
                        <span className={"font-bold text-blue-400"}>2.5m</span>
                    </p>
                    <Button variant={"link"} className={"ml-auto"}>
                        <ChevronRight color="#99c1f1"/>
                    </Button>
                </div>
                <div className={"mt-8 flex flex-col justify-center gap-y-4"}>
                    <div>
                        <p className={"mb-1 flex justify-between text-sm "}>
                            <span>Man</span>
                            <span className={"text-black/50"}>30%</span>
                        </p>
                        <Progress value={30} className={"*:bg-orange-500 *:rounded-r-xl h-2"}/>
                    </div>
                    <div>
                        <p className={"mb-1 flex justify-between text-sm "}>
                            <span>Women</span>
                            <span className={"text-black/50"}>60%</span>
                        </p>
                        <Progress value={70} className={"*:bg-blue-700 *:rounded-r-xl h-2"}/>
                    </div>
                    <div>
                        <p className={"mb-1 flex justify-between text-sm "}>
                            <span>Others Genders</span>
                            <span className={"text-black/50"}>10%</span>
                        </p>
                        <Progress value={30} className={"*:bg-green-500 *:rounded-r-xl h-2"}/>
                    </div>
                    <div>
                        <p className={"mb-1 flex justify-between text-sm "}>
                            <span>Visits/days</span>
                            <span className={"text-black/50"}>60%</span>
                        </p>
                        <Progress value={60} className={"*:bg-red-600 *:rounded-r-xl h-2"}/>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default VisitPage;
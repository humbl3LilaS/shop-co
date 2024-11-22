import Container from "@/components/share/container";
import {Label} from "@/components/ui/label";
import {Mail} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const NewsletterFrom = () => {
    return (
        <Container>
            <div className={"px-6 py-8 rounded-3xl bg-black md:grid md:grid-cols-2 gap-x-4 lg:grid-cols-3"}>
                <h2 className={"max-w-[550px] mb-8 text-3xl font-bold font-title uppercase text-white lg:col-span-2"}>
                    stay upto date about our latest offers
                </h2>
                {/*TODO: implement function later*/}
                <form>
                    <div className={"px-4 mb-3 flex items-center rounded-3xl bg-white"}>
                        <Label>
                            <span className={"sr-only"}>email</span>
                            <Mail className={"text-black/60"}/>
                        </Label>
                        <Input
                            placeholder={"Enter your email address"}
                            className={"outline-none border-none ring-0 focus-visible:ring-0 focus:outline-none focus-visible:ring-offset-0 placeholder:text-black/60"}
                        />
                    </div>
                    <Button className={"w-full rounded-3xl font-bold bg-white text-black"}>
                        Subscribe to Newsletter
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default NewsletterFrom;
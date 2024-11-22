import {STYLES} from "@/constants";
import Image from "next/image";
import Link from "next/link";
import {cn} from "@/lib/utils";
import Container from "@/components/share/container";

const BrowseStyle = () => {
    return (
        <Container>
            <div className={"py-10 px-6 rounded-xl bg-bgSecondary lg:px-16"}>
                <h2 className={"px-8 mb-7 text-center text-3xl font-bold font-title mb:mb-10 lg:mb-16"}>
                    browse by dress style
                </h2>
                <div className={"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-4"}>
                    {
                        STYLES.map((item, idx) =>
                                       <div
                                           key={item.title}
                                           className={cn("relative rounded-2xl overflow-hidden", (
                                               idx === 1 || idx == 2
                                           ) && "lg:col-span-2")}>
                                           <Image
                                               src={item.imgUrl}
                                               alt={`image for style ${item.title}`}
                                               width={750}
                                               height={500}
                                               className={"w-full h-[200px] lg:h-[320px]"}
                                           />
                                           <h3 className={"absolute top-4 left-7  z-20 text-2xl font-bold capitalize lg:text-4xl"}>
                                               <Link href={"/"}>
                                                   {item.title}
                                               </Link>
                                           </h3>
                                       </div>)
                    }
                </div>
            </div>
        </Container>
    );
};

export default BrowseStyle;
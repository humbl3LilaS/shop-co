import Image from "next/image";
import {PARTNER_ICONS} from "@/constants/ui-constants";

const Partners = () => {
    return (
        <section className={"py-10 px-4  bg-black "}>
            <ul className={"flex items-center justify-center flex-wrap gap-x-4 gap-y-4 md:gap-x-6 lg:gap-x-28"}>
                {PARTNER_ICONS.map((icon) => (
                    <Image
                        src={icon.path}
                        alt={icon.alt}
                        width={110}
                        height={30}
                        key={icon.alt}
                        className={"max-w-[110px] max-h-[30px]"}
                    />
                ))}
            </ul>
        </section>
    );
};

export default Partners;
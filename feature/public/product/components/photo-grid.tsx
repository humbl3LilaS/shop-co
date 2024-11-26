import Image from "next/image";
import {cn} from "@/lib/utils";

type PhotoGridProps = {
    coverImage: string;
    colorImages: string[];
}
const PhotoGrid = ({colorImages, coverImage}: PhotoGridProps) => {
    return (
        <div className={"grid grid-cols-3 grid-rows-4 gap-3 md:grid-cols-4 md:grid-rows-3"}>
            {
                colorImages.map((item, idx) =>
                    <div
                        key={idx}
                        className={cn(`w-full aspect-square`)}
                    >
                        <Image
                            src={item}
                            alt={"photo"}
                            width={300}
                            height={300}
                            className={"w-full h-full"}
                        />
                    </div>
                )
            }
            <div
                className={"w-full aspect-square col-span-3 row-span-3 row-start-1 md:col-start-2"}
            >
                <Image
                    src={coverImage}
                    alt={"photo"}
                    width={600}
                    height={600}
                    className={"w-full h-full"}
                />
            </div>
        </div>
    );
};

export default PhotoGrid;
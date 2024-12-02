import Image from "next/image";
import {cn} from "@/lib/utils";

type PhotoGridProps = {
    coverImage: string;
    colorImages: string[];
}
const PhotoGrid = ({colorImages, coverImage}: PhotoGridProps) => {
    console.log(colorImages)
    return (
        <div className={"grid grid-cols-3 grid-rows-4 gap-3 md:grid-cols-4 md:grid-rows-3"}>
            {
                colorImages.length > 0 && colorImages.map((item, idx) =>
                    <div
                        key={idx}
                        className={cn(`w-full h-full aspect-square`)}
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
                className={
                    cn(
                        "w-full h-full aspect-square col-span-3 row-span-3 row-start-1 md:col-start-2",
                        colorImages.length === 0 && "col-start-1 row-start-1 col-span-4 row-span-4 md:col-start-1 max-h-[500px]"
                    )}
            >
                <Image
                    src={coverImage}
                    alt={"photo"}
                    width={600}
                    height={600}
                    className={"w-full h-full rounded-xl"}
                />
            </div>
        </div>
    );
};

export default PhotoGrid;
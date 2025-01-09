import { ChangeEventHandler } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Image as ImageIcon } from "lucide-react";

type ImageGalleryUploaderProps = {
    value: Array<File> | null;
    onChange: (value: Array<File>) => void;
};
const ImageGalleryUploader = ({ value, onChange }: ImageGalleryUploaderProps) => {
    const imageUrls = value ? value.map((item) => URL.createObjectURL(item)) : null;
    const placeholderLen = 4 - (imageUrls?.length ?? 0);
    const onUpload: ChangeEventHandler<HTMLInputElement> = (evt) => {
        if (evt.target.files && evt.target.files[0]) {
            onChange(value ? [...value, evt.target.files[0]] : [evt.target.files[0]]);
        }
    };

    const onReUpload =
        (idx: number): ChangeEventHandler<HTMLInputElement> =>
        (evt) => {
            if (evt.target.files && evt.target.files[0]) {
                const newFiles = changeImageAt(value!, evt.target.files[0], idx);
                onChange(newFiles);
            }
        };

    const changeImageAt = (value: Array<File>, file: File, idx: number) => {
        return [...value.slice(0, idx), file, ...value.slice(idx + 1)];
    };
    return (
        <div>
            <div className={"flex gap-x-3"}>
                {imageUrls &&
                    imageUrls.map((url, idx) => (
                        <div
                            key={url}
                            className={"relative w-[150px] aspect-square rounded-2xl z-10 group"}
                        >
                            <Image
                                src={url}
                                alt={"preview image"}
                                width={300}
                                height={300}
                                key={url}
                                className={"w-[150px] aspect-square rounded-2xl"}
                            />
                            <Label
                                htmlFor={`image-gallery-edit-${idx}`}
                                className={
                                    "absolute top-1/2 left-1/2 hidden w-3/4 px-2 py-3 bg-black text-white font-semibold rounded-lg -translate-x-1/2 -translate-y-1/2 group-hover:block"
                                }
                            >
                                Change Image
                            </Label>
                            <input
                                id={`image-gallery-edit-${idx}`}
                                type={"file"}
                                accept={"images/*"}
                                hidden={true}
                                onChange={onReUpload(idx)}
                            />
                        </div>
                    ))}
                {new Array(placeholderLen).fill(0).map((item, idx) => (
                    <Label
                        key={idx}
                        htmlFor={`image-gallery`}
                        className={
                            "w-[150px] aspect-square flex flex-col items-center justify-center rounded-2xl bg-gray-200/40 cursor-pointer"
                        }
                    >
                        <ImageIcon className={"size-10"} />
                        <span className={"fond-bold font-black/40"}>Upload Preview</span>
                    </Label>
                ))}
                <input
                    id={"image-gallery"}
                    type={"file"}
                    accept={"images/*"}
                    hidden={true}
                    onChange={onUpload}
                />
            </div>
        </div>
    );
};

export default ImageGalleryUploader;

"use client";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Image as ImageIcon } from "lucide-react";
import { ChangeEventHandler, useState } from "react";

type CoverImageUploaderProps = {
    value: File | null;
    onChange: (value: File) => void;
};

const CoverImageUploader = ({ value, onChange }: CoverImageUploaderProps) => {
    const [imageUrl, setImageUrl] = useState(() => (value ? URL.createObjectURL(value) : null));

    const addImageHandler: ChangeEventHandler<HTMLInputElement> = (evt) => {
        if (evt.target.files && evt.target.files[0]) {
            const url = URL.createObjectURL(evt.target.files[0]);
            setImageUrl(url);
            onChange(evt.target.files[0]);
        }
    };

    return (
        <div className={"flex gap-x-6 items-center"}>
            {!imageUrl && (
                <div>
                    <Label
                        htmlFor={"add-image"}
                        className={
                            "w-[150px] aspect-square flex flex-col items-center justify-center rounded-2xl bg-gray-200/40 cursor-pointer"
                        }
                    >
                        <ImageIcon className={"size-10"} />
                        <span className={"fond-bold font-black/40"}>Upload</span>
                    </Label>
                    <input
                        id={"add-image"}
                        type={"file"}
                        accept={"images/*"}
                        hidden={true}
                        onChange={addImageHandler}
                    />
                </div>
            )}

            {imageUrl && (
                <>
                    <Image
                        src={imageUrl}
                        alt={`CoverImage of product`}
                        width={500}
                        height={500}
                        className={"w-[150px] h-[150px] rounded-2xl"}
                    />
                </>
            )}
        </div>
    );
};

export default CoverImageUploader;

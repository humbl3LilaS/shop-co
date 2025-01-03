"use client";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Image as ImageIcon } from "lucide-react";
import { ChangeEventHandler, useState } from "react";
import { uploadImage } from "@/feature/admin/products/actions/upload-image";
import { Button } from "@/components/ui/button";

type CoverImageUploaderProps = {
    value: string | undefined;
    onChange: (value: string) => void;
};
const CoverImageUploader = ({ value, onChange }: CoverImageUploaderProps) => {
    const [imageUrl, setImageUrl] = useState(value);
    const [file, setFile] = useState<File | null>(null);
    const [btnVisible, setBtnVisible] = useState<boolean>(true);

    const editImageHandler: ChangeEventHandler<HTMLInputElement> = async (evt) => {
        if (evt.target.files && evt.target.files.length > 0) {
            setFile(evt.target.files[0]);
            const url = URL.createObjectURL(evt.target.files[0]);
            setImageUrl(url);
            setBtnVisible(true);
        }
    };

    const editSubmitBtnHandler = async (file: File) => {
        const url = await uploadImage(file);
        console.log("upload", url);
        if (!url.error) {
            onChange(url.imageUrl!);
            setBtnVisible(false);
        }
    };

    const addImageHandler: ChangeEventHandler<HTMLInputElement> = async (evt) => {
        if (evt.target.files && evt.target.files.length > 0) {
            const url = await uploadImage(evt.target.files[0]);
            if (!url.error) {
                setImageUrl(url.imageUrl);
                onChange(url.imageUrl!);
            }
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
                    <div>
                        {value === imageUrl && (
                            <div>
                                <Label
                                    htmlFor={"edit-image"}
                                    className={
                                        "px-4 py-2 rounded-lg bg-black text-white font-semibold"
                                    }
                                >
                                    Upload another Image
                                </Label>
                                <input
                                    id={"edit-image"}
                                    type={"file"}
                                    accept={"images/*"}
                                    hidden={true}
                                    onChange={editImageHandler}
                                />
                            </div>
                        )}
                        {value !== imageUrl && file && btnVisible && (
                            <Button
                                className={"mt-4"}
                                type={"button"}
                                onClick={async () => editSubmitBtnHandler(file)}
                            >
                                Submit
                            </Button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default CoverImageUploader;

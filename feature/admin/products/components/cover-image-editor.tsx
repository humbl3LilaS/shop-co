"use client";
import { ChangeEventHandler, useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { uploadImage } from "@/feature/admin/products/actions/upload-image";
import { useToast } from "@/hooks/use-toast";
import { updateProductById } from "@/feature/admin/products/actions/update-product-by-id";
import { deleteImage } from "@/feature/admin/products/actions/delete-image";
import ActionButton from "@/components/share/action-button";

type CoverImageEditorProps = {
    defaultUrl: string;
};
type UrlState = {
    previous: string | undefined;
    current: string;
};

const CoverImageEditor = ({ defaultUrl }: CoverImageEditorProps) => {
    const [imageUrl, setImageUrl] = useState<UrlState>(() => ({
        previous: undefined,
        current: defaultUrl,
    }));
    const [newImage, setNewImage] = useState<File | null>(null);

    const router = useRouter();
    const { productId } = useParams();
    const { toast } = useToast();
    const onImageChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
        if (evt.target.files && evt.target.files[0]) {
            const url = URL.createObjectURL(evt.target.files[0]);
            setImageUrl((prev) => ({
                previous: prev.current,
                current: url,
            }));
            setNewImage(evt.target.files[0]);
        }
    };

    const onSubmit = async () => {
        const upload = await uploadImage(newImage!);
        if (upload.error) {
            toast({ title: "Error uploading image", variant: "destructive", duration: 500 });
            return;
        }
        const res = await updateProductById(productId as string, { coverImage: upload.imageUrl });
        if (res.error) {
            toast({ title: "Error updating database", variant: "destructive", duration: 500 });
            return;
        }
        const del = await deleteImage(imageUrl.previous!);
        if (del.error) {
            return;
        }
        toast({ title: "Image uploaded successfully", duration: 500 });
        setNewImage(null);
        router.push(`/admin/dashboard/products/${productId}`);
    };

    const onCancel = () => {
        setNewImage(null);
        setImageUrl((prev) => ({
            previous: undefined,
            current: prev.previous!,
        }));
    };

    return (
        <div className={"mb-4 flex gap-x-4 items-center"}>
            <Image
                src={imageUrl.current}
                alt={`CoverImage of product`}
                width={500}
                height={500}
                className={"w-[150px] h-[150px] rounded-2xl"}
            />
            {newImage ? (
                <div>
                    <ActionButton className={"inline-flex bg-blue-400 mr-2"} onClick={onSubmit}>
                        <Check />
                    </ActionButton>
                    <Button type={"button"} onClick={onCancel} className={"bg-red-400"}>
                        <X />
                    </Button>
                </div>
            ) : (
                <div>
                    <Label
                        htmlFor={"edit-image"}
                        className={"block px-4 py-2 bg-black text-white font-semibold rounded-xl"}
                    >
                        Choose another image
                    </Label>
                    <input
                        id={"edit-image"}
                        type={"file"}
                        accept={"images/*"}
                        hidden={true}
                        onChange={onImageChange}
                    />
                </div>
            )}
        </div>
    );
};

export default CoverImageEditor;

"use client"
import {Check, Upload, X} from "lucide-react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {uploadProfile} from "@/feature/client/profile/actions/upload-profile";
import {useState} from "react";

const ProfileUploader = () => {
    const [profile, setProfile] = useState<File[] | null>(null);

    return (
        <form className={"relative"} action={uploadProfile} encType={"multipart/form-data"}>
            <div
                className={"w-[100px] aspect-square flex items-center justify-center rounded-full bg-gray-300"}
            >
                <input
                    name={"profile"}
                    id={"profile"}
                    type={"file"}
                    accept={"images/*"}
                    hidden={true}
                    onChange={(evt) => {
                        if (evt.target.files) {
                            setProfile(Array.from(evt.target.files));
                        }
                    }}/>
                {
                    !profile
                        ? <div className={"w-3/4 flex flex-col justify-center items-center"}>

                            <label htmlFor={"profile"}>
                                <Upload/>
                                <span className={"text-xs"}>
                                Upload
                            </span>
                            </label>
                        </div>
                        :
                        <Image src={URL.createObjectURL(profile[0])} alt={"profile image"} width={500} height={500}
                               className={"w-full max-w-[100px] rounded-full"}
                        />
                }
            </div>

            {
                profile && <div className={"absolute w-full -bottom-12 right-0 flex items-center gap-x-2"}>
                    <Button type={"submit"} className={"bg-blue-400"}>
                        <Check/>
                    </Button>
                    <Button
                        type={"button"}
                        onClick={() => {
                            setProfile(null)
                        }}
                        className={"bg-red-400"}
                    >

                        <X/>
                    </Button>
                </div>
            }
        </form>
    );
};

export default ProfileUploader;
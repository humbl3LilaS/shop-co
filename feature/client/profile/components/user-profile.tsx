import {IUserInfo} from "@/types/api.types";
import Image from "next/image";
import ProfileUploader from "@/feature/client/profile/components/profile-uploader";
import ProfileEditSheet from "@/feature/client/profile/components/profile-edit-sheet";

const UserProfile = ({data}: { data: IUserInfo }) => {
    return (
        <div className={"px-6 py-4 flex items-center gap-x-4 border border-black/40 rounded-3xl shadow-md"}>
            <div>
                {data.profileImage
                    ? <Image
                        src={data.profileImage}
                        alt={`profile of user ${data.userName}`}
                        width={500}
                        height={500}
                        className={"w-full max-w-[100px] rounded-full"}
                    />
                    : <ProfileUploader/>
                }
            </div>
            <div>
                <p className={"font-bold text-xl"}>{data.firstName} {data.lastName}</p>
                <p className={"text-black/40 font-semibold"}>@{data.userName}</p>
            </div>
            <ProfileEditSheet/>
        </div>
    );
};

export default UserProfile;
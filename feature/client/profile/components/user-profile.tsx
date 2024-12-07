import {IUserInfo} from "@/types/api.types";
import Image from "next/image";
import ProfileUploader from "@/feature/client/profile/components/profile-uploader";

const UserProfile = ({data}: { data: IUserInfo }) => {
    return (
        <div className={"flex items-center gap-x-4"}>
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
        </div>
    );
};

export default UserProfile;
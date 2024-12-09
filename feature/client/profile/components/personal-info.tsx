import {IUserInfo} from "@/types/api.types";

const PersonalInfo = ({data}: { data: IUserInfo }) => {
    return (
        <div className={"px-6 py-4 mt-4  border border-black/40 rounded-2xl shadow-md lg:px-14 lg:py-10"}>
            <h3 className={"mb-3 text-xl font-bold lg:mb-5 lg:text-2xl"}>Personal Info</h3>
            <div className={"grid grid-cols-2 gap-y-4"}>
                <div className={"*:block"}>
                    <span className={"mb-1.5 text-black/40 text-sm font-semibold lg:text-base"}>
                        First Name
                    </span>
                    <span className={"font-semibold lg:text-lg"}>
                        {data.firstName}
                    </span>
                </div>
                <div className={"*:block"}>
                    <span className={"mb-1.5 text-black/40 text-sm font-semibold lg:text-base"}>
                        Last Name
                    </span>
                    <span className={"font-semibold lg:text-lg"}>
                        {data.lastName}
                    </span>
                </div>
                <div className={"col-span-2 *:block lg:col-span-1"}>
                    <span className={"mb-1.5 text-black/40 text-sm font-semibold lg:text-base"}>
                        Email
                    </span>
                    <span className={"font-semibold lg:text-lg"}>
                        {data.email}
                    </span>
                </div>
                <div className={"*:block"}>
                    <span className={"mb-1.5 text-black/40 text-sm font-semibold lg:text-base"}>
                        Phone Number
                    </span>
                    <span className={"font-semibold lg:text-lg"}>
                        Not provided
                    </span>
                </div>

            </div>

        </div>
    );
};

export default PersonalInfo;
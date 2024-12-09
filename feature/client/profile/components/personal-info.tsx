import {IUserInfo} from "@/types/api.types";

const PersonalInfo = ({data}: { data: IUserInfo }) => {
    return (
        <div className={"px-6 py-4 mt-4  border border-black/40 rounded-2xl shadow-md"}>
            <h3 className={"mb-3 text-xl font-bold"}>Personal Info</h3>
            <div className={"grid grid-cols-2 gap-y-4"}>
                <div className={"*:block"}>
                    <span className={"mb-1.5 text-black/40 text-sm font-semibold"}>
                        First Name
                    </span>
                    <span className={"font-semibold"}>
                        {data.firstName}
                    </span>
                </div>
                <div className={"*:block"}>
                    <span className={"mb-1.5 text-black/40 text-sm font-semibold"}>
                        Last Name
                    </span>
                    <span className={"font-semibold"}>
                        {data.lastName}
                    </span>
                </div>
                <div className={"col-span-2 *:block"}>
                    <span className={"mb-1.5 text-black/40 text-sm font-semibold"}>
                        Email
                    </span>
                    <span className={"font-semibold"}>
                        {data.email}
                    </span>
                </div>
                <div className={"*:block"}>
                    <span className={"mb-1.5 text-black/40 text-sm font-semibold"}>
                        Phone Number
                    </span>
                    <span className={"font-semibold"}>
                        Not provided
                    </span>
                </div>

            </div>

        </div>
    );
};

export default PersonalInfo;
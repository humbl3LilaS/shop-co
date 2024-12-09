import {IUserInfo} from "@/types/api.types";

const BillingInfo = ({data}: { data: IUserInfo }) => {
    return (
        <div className={"px-6 py-4 mt-4  border border-black/40 rounded-2xl shadow-md lg:px-14 lg:py-10"}>
            <h3 className={"mb-3 text-xl font-bold lg:mb-5 lg:text-2xl"}>Billing Info</h3>
            <div className={"grid grid-cols-2 gap-y-4"}>
                <div className={"*:block"}>
                    <span className={"mb-1.5 text-black/40 text-sm font-semibold lg:text-base"}>
                        Division/State
                    </span>
                    <span className={"font-semibold lg:text-lg"}>
                        Not provided
                    </span>
                </div>
                <div className={"*:block"}>
                    <span className={"mb-1.5 text-black/40 text-sm font-semibold lg:text-base"}>
                        Township
                    </span>
                    <span className={"font-semibold lg:text-lg"}>
                        Not provided
                    </span>
                </div>
                <div className={"*:block col-span-2 lg:col-span-1"}>
                    <span className={"mb-1.5 text-black/40 text-sm font-semibold lg:text-base"}>
                        Address
                    </span>
                    <span className={"font-semibold lg:text-lg"}>
                        Not provided
                    </span>
                </div>

                <div className={"*:block"}>
                    <span className={"mb-1.5 text-black/40 text-sm font-semibold lg:text-base"}>
                        Postal Code
                    </span>
                    <span className={"font-semibold lg:text-lg"}>
                        Not provided
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BillingInfo;
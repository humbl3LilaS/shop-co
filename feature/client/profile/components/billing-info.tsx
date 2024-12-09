import {IUserInfo} from "@/types/api.types";

const BillingInfo = ({data}: { data: IUserInfo }) => {
    return (
        <div className={"px-6 py-4 mt-4  border border-black/40 rounded-2xl shadow-md"}>
            <h3 className={"mb-3 text-xl font-bold"}>Billing Info</h3>
            <div className={"grid grid-cols-2 gap-y-4"}>
                <div className={"*:block"}>
                    <span className={"mb-1.5 text-black/40 text-sm font-semibold"}>
                        Division/State
                    </span>
                    <span className={"font-semibold"}>
                        Not provided
                    </span>
                </div>
                <div className={"*:block"}>
                    <span className={"mb-1.5 text-black/40 text-sm font-semibold"}>
                        Township
                    </span>
                    <span className={"font-semibold"}>
                        Not provided
                    </span>
                </div>
                <div className={"*:block col-span-2"}>
                    <span className={"mb-1.5 text-black/40 text-sm font-semibold"}>
                        Address
                    </span>
                    <span className={"font-semibold"}>
                        Not provided
                    </span>
                </div>

                <div className={"*:block"}>
                    <span className={"mb-1.5 text-black/40 text-sm font-semibold"}>
                        Postal Code
                    </span>
                    <span className={"font-semibold"}>
                        Not provided
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BillingInfo;
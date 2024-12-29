import { createColumnHelper } from "@tanstack/table-core";
import { IUser } from "@/database/schema";
import PlaceholderProfile from "@/components/share/placeholder-profile";
import Image from "next/image";

const columnHelper = createColumnHelper<IUser>();

export const columns = [
    columnHelper.accessor("profileImage", {
        header: () => <span></span>,
        cell: ({ getValue }) => {
            const src = getValue();
            return src ? (
                <Image
                    src={src}
                    alt={"profileImage"}
                    width={40}
                    height={40}
                    className={"aspect-square size-10 rounded-full"}
                />
            ) : (
                <PlaceholderProfile />
            );
        },
    }),
    columnHelper.accessor("userName", {
        header: () => <span>Username</span>,
        cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor("email", {
        header: () => <span>Email</span>,
        cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor("phoneNumber", {
        header: () => <span>Phone No.</span>,
        cell: ({ getValue }) => <span>{getValue() ?? "Not Provided"}</span>,
    }),
];

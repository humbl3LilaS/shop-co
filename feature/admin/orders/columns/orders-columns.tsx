import { createColumnHelper } from "@tanstack/table-core";
import { IOrderInfo } from "@/feature/admin/orders/actions/get-all-orders";
import Image from "next/image";

const columnHelper = createColumnHelper<IOrderInfo>();

export const columns = [
    columnHelper.accessor("id", {
        header: () => <span>Order Id</span>,
        cell: ({ getValue }) => (
            <span className={"max-w-[200px] line-clamp-1"}>Order#{getValue()}</span>
        ),
    }),
    columnHelper.accessor("productPreview", {
        header: () => <span>Product</span>,
        cell: ({ getValue }) => (
            <Image
                src={getValue()}
                alt={"products preview image"}
                width={50}
                height={50}
                className={"w-12.5 aspect-square rounded-lg"}
            />
        ),
    }),
    columnHelper.accessor("colorHex", {
        header: () => <span>Color</span>,
        cell: ({ getValue }) => (
            <span
                className={"block size-10 rounded-full"}
                style={{ backgroundColor: `#${getValue()}` }}
            />
        ),
    }),
    columnHelper.accessor("quantity", {
        header: () => <span>Qty</span>,
        cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor("size", {
        header: () => <span>Size</span>,
        cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
];

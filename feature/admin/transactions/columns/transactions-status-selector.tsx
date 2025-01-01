import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ORDER_STATUS } from "@/constants/constants";
import { Updater } from "@tanstack/table-core";

type TransactionsStatusSelectorProps = {
    onChange: (((updater: Updater<any>) => void) | undefined) | ((value: string) => void);
};
const TransactionsStatusSelector = ({ onChange }: TransactionsStatusSelectorProps) => {
    return (
        <Select onValueChange={onChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter By Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Transaction Status</SelectLabel>
                    {ORDER_STATUS.map((item) => (
                        <SelectItem value={item} key={item} className={"capitalize"}>
                            {item}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default TransactionsStatusSelector;

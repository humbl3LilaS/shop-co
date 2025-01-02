import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type SizeCheckboxProps = {
    value: string;
    onCheckedChange: (value: boolean) => void;
    checked?: boolean;
};

const SizeCheckbox = ({ value, onCheckedChange, checked }: SizeCheckboxProps) => {
    return (
        <li className={"mb-3 flex items-center gap-x-2"}>
            <Checkbox id={value} onCheckedChange={onCheckedChange} checked={checked} />
            <Label htmlFor={value} className={"capitalize"}>
                {value}
            </Label>
        </li>
    );
};

export default SizeCheckbox;

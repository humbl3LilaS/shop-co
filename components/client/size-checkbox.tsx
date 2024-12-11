import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";

type SizeCheckboxProps = {
    value: string;
    onCheckedChange: (value: boolean) => void;
}

const SizeCheckbox = ({value, onCheckedChange}: SizeCheckboxProps) => {
    return (
        <li className={"mb-3 flex items-center gap-x-2"}>
            <Checkbox id={value} onCheckedChange={onCheckedChange}/>
            <Label htmlFor={value} className={"capitalize"}>{value}</Label>
        </li>
    );
};

export default SizeCheckbox;
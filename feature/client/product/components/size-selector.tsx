import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type SizeSelectorProps = {
    options: string[];
    onChange: (value: string | undefined) => void;
    defaultValue: string;
};

const SizeSelector = ({ options, onChange, defaultValue }: SizeSelectorProps) => {
    //TODO: add sort function for sizes
    return (
        <RadioGroup onValueChange={onChange} defaultValue={defaultValue}>
            <div className={"mt-4 flex gap-x-2"}>
                {options.map((item, idx) => (
                    <FormItem key={idx}>
                        <FormControl className={"hidden"}>
                            <RadioGroupItem value={item} />
                        </FormControl>
                        <FormLabel
                            className={cn(
                                "px-5 py-3 bg-[#f0f0f0] capitalize rounded-3xl text-black/40",
                                defaultValue === item && "text-white bg-black font-bold",
                            )}
                        >
                            {item}
                        </FormLabel>
                    </FormItem>
                ))}
            </div>
        </RadioGroup>
    );
};

export default SizeSelector;

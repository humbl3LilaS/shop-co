"use client"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {FormControl, FormItem, FormLabel} from "@/components/ui/form";
import {Check} from "lucide-react";

type ColorSelectorProps = {
    options: string[],
    onChange: (value: string | undefined) => void,
    defaultValue: string,
}
const ColorSelector = ({options, onChange, defaultValue}: ColorSelectorProps) => {

    return (
        <RadioGroup onValueChange={onChange} defaultValue={defaultValue}>
            <div className={"flex gap-x-2"}>
                {
                    options.map((item, idx) =>
                        <FormItem key={idx}>
                            <FormControl className={"hidden"}>
                                <RadioGroupItem value={item}/>
                            </FormControl>
                            <FormLabel
                                className={"block aspect-square w-10 rounded-full relative"}
                                style={{
                                    backgroundColor: `#${item}`
                                }}
                            >
                                <span className={"sr-only"}>#{item}</span>
                                {defaultValue === item && <Check color="#ffffff" strokeWidth={2.5} className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}/>}
                            </FormLabel>
                        </FormItem>
                    )
                }
            </div>
        </RadioGroup>
    );
};

export default ColorSelector;
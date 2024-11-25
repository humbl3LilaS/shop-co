"use client";
import {Slider} from "antd";
import {ConfigProvider} from "antd";

type PriceRangeSelectorProps = {
    value: [number, number];
    onChange: (value: number[]) => void;
    step: number;
    min: number;
    max: number;
}

const PriceRangeSelector = (
    {
        value,
        onChange,
        step,
        min,
        max
    }: PriceRangeSelectorProps
) => {


    const handleSliderChange = (value: number[]) => {
        if (value.length === 2) {
            onChange([value[0], value[1]])
        }
    }

    return (
        <div className={"relative w-full max-w-md"}>
            <ConfigProvider
                theme={{
                    components: {
                        Slider: {
                            trackBg: "black",
                            handleColor: "black",
                            trackHoverBg: "black",
                            railBg: "rgba(0,0,0,0.1)",
                            handleActiveColor: "black",
                            dotActiveBorderColor: "black",
                        }
                    }
                }}
            >
                <Slider
                    key={value.join('-')}
                    range={true}
                    min={min}
                    max={max}
                    step={step}
                    defaultValue={value}
                    onChange={handleSliderChange}
                />
            </ConfigProvider>
            <span
                className={"block text-sm absolute top-4/5 -translate-x-1/2  font-bold"}
                style={{
                    left: `${(value[0] / max) * 100}%`,
                }}
            >
                ${value[0]}
            </span>
            <span className={"block text-sm absolute top-4/5 -translate-x-1/2 font-bold"}
                  style={{
                      left: `${(value[1] / max) * 100}%`,
                  }}>
                ${value[1]}
            </span>
        </div>
    );
};

export default PriceRangeSelector;
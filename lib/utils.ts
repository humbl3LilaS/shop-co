import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const calculateDiscount = (price: number, discount: number) => {
    return price - (
        price * (
            discount / 100
        )
    )
}

export const getValidPathnameArray = (pathname: string) => {
    return pathname.split("/").filter(x => x !== "style" && x !== "")
}

export const calculatePageCounts = (items: number) => {
    const div = items / 10
    const floor = Math.floor(items / 10);
    const abs = Math.abs(floor);
    return abs < div ? floor + 1 : floor;
}


export const arrayToSlug = <T>(items: T[]) => {
    return items.join("_")
}

export const slugToArray = (slug?: string) => {
    if (!slug) return [];
    return slug.split("_").filter(item => !!item);
}


export const addLineBreaks = (input: string): string => {
    return input.replace(/  /g, `\n`);
}

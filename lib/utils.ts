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
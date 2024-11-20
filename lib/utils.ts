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
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

/*
* This method is used to test if the pagination if work or not
* */
export const makeshiftPagination = <T>(results: T[], page: number) => {
    return results.slice((
                             page - 1
                         ) * 10, page * 10);
}

export const populateData = <T>(items: T[], times: number) => {
    const data: T[] = [];
    for (let i = 0; i < times; i++) {
        data.push(...items);
    }
    return data;
}

export const calculatePageCounts = (items: number) => {
    const div = items / 10
    const floor = Math.floor(items / 10);
    const abs = Math.abs(floor);
    return abs < div ? floor + 1 : floor;
}


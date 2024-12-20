import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import {ICart} from "@/types/object.types";

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


export const arrayToSlug = <T>(items: T[]) => {
    return items.join("_")
}

export const slugToArray = (slug?: string) => {
    if (!slug) return [];
    return slug.split("_").filter(item => !!item);
}

export const getQuantityInCart = () => {
    if (window !== undefined && typeof window === "object") {
        const cart = JSON.parse(sessionStorage.getItem("cart") ?? "[]") as ICart;
        return cart.reduce((quantity, cartItem) => quantity + cartItem.q, 0)
    } else {
        return 0;
    }

}

export const addLineBreaks = (input: string): string => {
    return input.replace(/  /g, `\n`);
}


export const runOnceAsync = (() => {
    let hasRun = false;
    return async (callback: () => Promise<void>) => {
        if (!hasRun) {
            hasRun = true;
            console.log("seeding run")
            await callback();
        }
    };
})();
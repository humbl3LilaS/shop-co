import {MONTHS} from "@/constants/constants";

export const getSalePeriod = () => {
    const currentMonth = new Date().getMonth();
    const lastSixMonths = currentMonth > 5 ? currentMonth - 5 : 0;
    return MONTHS.slice(lastSixMonths, currentMonth + 1);
}

export const formatVisitCount = (visitCount: number) => {
    const kilo = visitCount / 1000;
    if (kilo > 1000) {
        return (kilo / 1000).toFixed(2) + "M";
    }
    return kilo + "K"
}

export const calculateVisitPercentage = (total: number, x: number) => {

    return Math.round((x / total) * 100);
}

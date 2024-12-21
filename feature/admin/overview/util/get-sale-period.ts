import {MONTHS} from "@/constants/constants";
import {Faker, en} from "@faker-js/faker";

export const getSalePeriod = () => {
    const currentMonth = new Date().getMonth();
    const lastSixMonths = currentMonth > 5 ? currentMonth - 5 : 0;
    return MONTHS.slice(lastSixMonths, currentMonth + 1);
}

export const getSalePlaceHolder = () => {
    const period = getSalePeriod();
    const faker = new Faker({locale: [en]});
    const data = period.reduce((arr, month) => {
        const sales = faker.helpers.rangeToNumber({min: 2000, max: 5000})
        return [...arr, {month, revenue: sales}];
    }, [] as unknown as Array<{ month: string, revenue: number }>)
    return data;
}
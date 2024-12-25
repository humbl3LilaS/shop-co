
import {Faker, en} from "@faker-js/faker";
import {getSalePeriod} from "@/feature/admin/overview/lib/util";


export const getSalePlaceHolder = () => {
    const period = getSalePeriod();
    const faker = new Faker({locale: [en]});
    const data = period.reduce((arr, month) => {
        const sales = faker.helpers.rangeToNumber({min: 2000, max: 5000})
        return [...arr, {month, revenue: sales}];
    }, [] as unknown as Array<{ month: string, revenue: number }>)
    return data;
}
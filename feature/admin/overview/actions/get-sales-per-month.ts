"use server"
import {MONTHS} from "@/constants/constants";
import {db} from "@/database/drizzle";
import {transactions} from "@/database/schema";
import {between} from "drizzle-orm/sql/expressions/conditions";
import {getMonth, subDays} from "date-fns";
import {getSalePeriod} from "@/feature/admin/overview/lib/util";


export const getSalesPerMonth = async () => {
    const trans = await db.select().from(transactions).where(between(transactions.createdAt, subDays(new Date(), 180), new Date()));

    const period = getSalePeriod();
    const data = period.reduce((arr, month) => {
        const sales = trans.filter(item => getMonth(item.createdAt) === MONTHS.indexOf(month)).reduce((acc, item) => acc + item.amount, 0);
        return [...arr, {month, revenue: sales}];
    }, [] as unknown as Array<{ month: string, revenue: number }>)
    return data;
}


import { db } from "@/database/drizzle";
import { Faker, en } from "@faker-js/faker";
import { v4 as generateUUID } from "uuid";
import {
    IOrders,
    IReviews,
    ITransactionDetails,
    IUser,
    orders,
    productColors,
    products,
    reviews,
    transactionDetails,
    transactions,
    users,
} from "@/database/schema";
import { GENDERS, ORDER_STATUS, SIZES } from "@/constants/constants";
import { notInArray } from "drizzle-orm/sql/expressions/conditions";
import { addDays, subDays } from "date-fns";
import { calculateDiscount } from "@/lib/utils";

const RESERVED_ID = [
    "b9426b2d-5fd5-475d-97d2-c34bfcd6e85d",
    "bf8fb0ca-2b61-4885-bd3e-64525b141ee6",
    "0180aa3d-2999-467d-93f7-30954c509dd0",
    "c6d9c75e-9c16-4ce1-9b28-ad7553caf02c",
];

async function main() {
    console.log("Seeding....");
    const faker = new Faker({ locale: [en] });
    const generatedUsers: IUser[] = new Array(10).fill(0).map((_) => ({
        id: generateUUID(),
        email: faker.internet.email(),
        password: "$2a$10$eMpQdntHDNewRfktsueC8.98tjG8EIEv/l71cFWwfAdS3AfAKhoDC",
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        userName: faker.internet.username(),
        profileImage:
            "https://res.cloudinary.com/dhhllchck/image/upload/v1733646489/shop-co/wwe74xiwqid84gmwtg2w.jpg",
        state: faker.location.state(),
        township: faker.location.city(),
        address: faker.location.streetAddress(),
        postalCode: faker.location.zipCode(),
        phoneNumber: faker.phone.number(),
        gender: GENDERS[Math.floor(Math.random() * GENDERS.length)],
    }));
    await db.delete(reviews);
    await db.delete(transactionDetails);
    await db.delete(transactions);
    await db.delete(users).where(notInArray(users.id, RESERVED_ID));
    await db.insert(users).values(generatedUsers);

    const usersId = [...(generatedUsers.map((item) => item.id) as string[]), ...RESERVED_ID];
    const prod = await db
        .select({
            id: products.id,
            price: products.price,
            discount: products.discount,
        })
        .from(products);
    const productId = prod.map((item) => item.id);
    const generatedReviews: IReviews[] = new Array(50).fill(0).map((_) => ({
        id: generateUUID(),
        productId: productId[Math.floor(Math.random() * productId.length)],
        userId: usersId[Math.floor(Math.random() * usersId.length)],
        rating: 4,
        createAt: faker.date.between({
            from: subDays(new Date(), 180),
            to: new Date(),
        }),
        content: faker.lorem.lines(3),
    }));

    await db.insert(reviews).values(generatedReviews);

    const colors = await db.select().from(productColors);
    const generatedOrders: IOrders[] = new Array(300).fill(0).map((_) => {
        const pid = productId[Math.floor(Math.random() * productId.length)];
        const cids = colors.filter((color) => color.productId == pid).map((item) => item.id);
        return {
            id: generateUUID(),
            productId: pid,
            quantity: Math.floor(Math.random() * 4) + 1,
            colorId: cids[Math.floor(Math.random() * cids.length)],
            size: SIZES[Math.floor(Math.random() * SIZES.length)],
        };
    });
    await db.delete(orders);
    await db.insert(orders).values(generatedOrders);

    const ordersId = generatedOrders.map((item) => item.id) as string[];
    const alreadyAddedId: string[] = [];
    const generatedTransactions = new Array(100).fill(0).map((_) => {
        const availableId = ordersId.filter((id) => !alreadyAddedId.includes(id));
        const orders = faker.helpers.arrayElements(availableId, 3);
        const amount = orders.reduce((acc, nxt) => {
            const order = generatedOrders.find((order) => order.id === nxt)!;
            const prodInfo = prod.find((item) => item.id === order?.productId)!;
            return order.quantity * calculateDiscount(prodInfo.price, prodInfo.discount ?? 0) + acc;
        }, 0);
        alreadyAddedId.push(...orders);
        const createdAt = faker.date.between({
            from: subDays(new Date(), 120),
            to: addDays(new Date(), 60),
        });
        return {
            id: generateUUID(),
            amount,
            status: ORDER_STATUS[Math.floor(Math.random() * (ORDER_STATUS.length - 1))],
            customerId: usersId[Math.floor(Math.random() * usersId.length)],
            createdAt,
            orders: orders,
        };
    });
    await db.insert(transactions).values(generatedTransactions);

    const transitionId = generatedTransactions.map((item) => item.id) as string[];

    const generatedTranstionDetails: ITransactionDetails[] = transitionId.map((item) => {
        return {
            id: generateUUID(),
            transactionId: item,
            phoneNumber: faker.phone.number(),
            region: faker.location.state(),
            township: faker.location.city(),
            address: faker.location.streetAddress(),
            postalCode: faker.location.zipCode(),
            email: faker.internet.email(),
            deliveryMethod: faker.helpers.arrayElement(["delivery", "pickup"]),
            transactionMethod: faker.helpers.arrayElement(["card", "paypal"]),
        };
    });

    await db.insert(transactionDetails).values(generatedTranstionDetails);

    console.log("seeding success");
}

try {
    await main();
} catch (error) {
    console.log(error);
}

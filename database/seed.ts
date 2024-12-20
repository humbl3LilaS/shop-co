import {db} from "@/database/drizzle";
import {Faker, en} from "@faker-js/faker";
import {v4 as generateUUID} from "uuid";
import {IOrders, IReviews, IUser, orders, productColors, products, reviews, users} from "@/database/schema";
import {GENDERS, SIZES} from "@/constants/constants";
import {notInArray} from "drizzle-orm/sql/expressions/conditions";
import {subDays} from "date-fns";

const RESERVED_ID = ["b9426b2d-5fd5-475d-97d2-c34bfcd6e85d", "bf8fb0ca-2b61-4885-bd3e-64525b141ee6", "0180aa3d-2999-467d-93f7-30954c509dd0", "c6d9c75e-9c16-4ce1-9b28-ad7553caf02c"]


async function main() {
    console.log("Seeding....")
    const faker = new Faker({locale: [en]});
    const generatedUsers: IUser[] = new Array(10).fill(0).map(_ => ({
        id: generateUUID(),
        email: faker.internet.email(),
        password: "$2a$10$eMpQdntHDNewRfktsueC8.98tjG8EIEv/l71cFWwfAdS3AfAKhoDC",
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        userName: faker.internet.username(),
        profileImage: "https://res.cloudinary.com/dhhllchck/image/upload/v1733646489/shop-co/wwe74xiwqid84gmwtg2w.jpg",
        state: faker.location.state(),
        township: faker.location.city(),
        address: faker.location.streetAddress(),
        postalCode: faker.location.zipCode(),
        phoneNumber: faker.phone.number(),
        gender: GENDERS[Math.floor(Math.random() * GENDERS.length)],
    }))
    await db.delete(reviews);
    await db.delete(users).where(notInArray(users.id, RESERVED_ID));
    await db.insert(users).values(generatedUsers)

    const usersId = [...generatedUsers.map(item => item.id) as string[], ...RESERVED_ID];
    const productId = (await db.select({id: products.id}).from(products)).map(item => item.id);
    const generatedReviews: IReviews[] = new Array(50).fill(0).map(_ => ({
        id: generateUUID(),
        productId: productId[Math.floor(Math.random() * productId.length)],
        userId: usersId[Math.floor(Math.random() * usersId.length)],
        rating: 4,
        createAt: faker.date.between({from: subDays(new Date(), 90), to: new Date()}),
        content: faker.lorem.lines(3),
    }))

    await db.insert(reviews).values(generatedReviews);

    const colors = await db.select().from(productColors);
    const generatedOrders: IOrders[] = new Array(75).fill(0).map(_ => {
        const pid = productId[Math.floor(Math.random() * productId.length)]
        const cids = colors.filter(color => color.productId == pid).map(item => item.id)
        return ({
            id: generateUUID(),
            productId: pid,
            quantity: Math.floor(Math.random() * 4) + 1,
            colorId: cids[Math.floor(Math.random() * cids.length)],
            size: SIZES[Math.floor(Math.random() * SIZES.length)],
        })
    })
    await db.delete(orders);
    await db.insert(orders).values(generatedOrders);


    console.log("seeding success")
}


try {
    await main();
} catch (error) {
    console.log(error)
}
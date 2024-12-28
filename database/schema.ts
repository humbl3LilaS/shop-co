import { check, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { v4 as createUUID } from "uuid";
import { relations, sql } from "drizzle-orm";
import { CATEGORIES, GENDERS, ORDER_STATUS, TYPES } from "@/constants/constants";
import { createInsertSchema } from "drizzle-zod";

export const users = pgTable("users", {
    id: text("id")
        .primaryKey()
        .$default(() => createUUID()),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    userName: text("user_name").notNull(),
    profileImage: text("profile_image"),
    phoneNumber: text("phone_number"),
    state: text("state"),
    township: text("township"),
    address: text("address"),
    postalCode: text("postal_code"),
    gender: text("gender", { enum: [...GENDERS] })
});

export const admins = pgTable("admins", {
    id: text("id")
        .primaryKey()
        .$default(() => createUUID()),
    adminId: text("admin_id").unique().notNull(),
    password: text("password").notNull()
});

export const products = pgTable("products", {
    id: text("id")
        .primaryKey()
        .$default(() => createUUID()),
    name: text("name").notNull(),
    price: integer("price").notNull(),
    discount: integer("discount"),
    description: text("description").notNull(),
    details: text("details"),
    coverImage: text("cover_image").notNull(),
    imagesUrl: text("images_url").array(),
    arrivedAt: timestamp("arrived_at").defaultNow().notNull(),
    productCategory: text("product_category", {
        enum: [...CATEGORIES]
    }).notNull(),
    productType: text("product_type", { enum: [...TYPES] }).notNull(),
    sizes: text("sizes").array().notNull()
});

export const productColorsRelation = relations(products, ({ many }) => ({
    colors: many(productColors)
}));

export const productReviewsRelation = relations(products, ({ many }) => ({
    reviews: many(reviews)
}));

export const userReviewsRelation = relations(users, ({ many }) => ({
    reviews: many(reviews)
}));

export const productColors = pgTable("product_colors", {
    id: text()
        .primaryKey()
        .$default(() => createUUID()),
    productId: text("product_id")
        .references(() => products.id)
        .notNull(),
    colorHex: varchar("color_hex", { length: 6 }).notNull()
});

export const colorsProductRelation = relations(productColors, ({ one }) => ({
    product: one(products, {
        fields: [productColors.productId],
        references: [products.id]
    })
}));

export const reviews = pgTable(
    "reviews",
    {
        id: text()
            .primaryKey()
            .$default(() => createUUID()),
        productId: text("product_id")
            .references(() => products.id)
            .notNull(),
        userId: text("user_id")
            .references(() => users.id)
            .notNull(),
        content: text("content").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        rating: integer().notNull()
    },
    (table) => ({
        ratingConstraint: check("rating_check", sql`${table.rating} >= 1 AND ${table.rating}<= 5`)
    })
);

export const reviewProductRelation = relations(reviews, ({ one }) => ({
    product: one(products, {
        fields: [reviews.productId],
        references: [products.id]
    })
}));

export const reviewUserRelation = relations(reviews, ({ one }) => ({
    user: one(users, {
        fields: [reviews.userId],
        references: [users.id]
    })
}));

export const orders = pgTable("orders", {
    id: text("id")
        .primaryKey()
        .$default(() => createUUID()),
    productId: text("product_id")
        .references(() => products.id)
        .notNull(),
    colorId: text("color_id")
        .references(() => productColors.id)
        .notNull(),
    size: text("size").notNull(),
    quantity: integer("quantity").notNull()
});

export const orderProductRelation = relations(orders, ({ one }) => ({
    product: one(products, {
        fields: [orders.productId],
        references: [products.id]
    })
}));

export const productOrderRelation = relations(products, ({ many }) => ({
    orders: many(orders)
}));

export const orderColorRelation = relations(orders, ({ one }) => ({
    color: one(productColors, {
        fields: [orders.colorId],
        references: [productColors.id]
    })
}));

export const colorOrderRelation = relations(products, ({ many }) => ({
    orders: many(orders)
}));

export const transactions = pgTable("transactions", {
    id: text("id")
        .primaryKey()
        .$default(() => createUUID()),
    customerId: text("customer_id")
        .references(() => users.id)
        .notNull(),
    orders: text("orders").array().notNull(),
    status: text("status", { enum: [...ORDER_STATUS] }).notNull(),
    amount: integer("amount").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
});

export const transactionsCustomerRelation = relations(transactions, ({ one }) => ({
    customer: one(users, {
        fields: [transactions.customerId],
        references: [users.id]
    })
}));

export const customerTransactionRelation = relations(users, ({ many }) => ({
    transactions: many(transactions)
}));

export const transactionDetails = pgTable("transaction_details", {
    id: text("id")
        .primaryKey()
        .$default(() => createUUID()),
    transactionId: text("transaction_id")
        .references(() => transactions.id)
        .notNull(),
    region: text("region").notNull(),
    township: text("township").notNull(),
    address: text("address").notNull(),
    postalCode: text("postalCode").notNull(),
    phoneNumber: text("phoneNumber").notNull(),
    deliveryMethod: text("delivery_method").notNull(),
    transactionMethod: text("transaction_method").notNull(),
    email: text("email").notNull()
});

export const tDetailsAndTransactionRelation = relations(transactionDetails, ({ one }) => ({
    transactions: one(transactions, {
        fields: [transactionDetails.transactionId],
        references: [transactions.id]
    })
}));

export const userInsertSchema = createInsertSchema(users);
export const reviewInsertSchema = createInsertSchema(reviews);
export const orderInsertSchema = createInsertSchema(orders);
export const transactionInsertSchema = createInsertSchema(transactions);
export const transactionDetailInsertSchema = createInsertSchema(transactionDetails);
export const productInsertSchema = createInsertSchema(products);

export type IUser = Zod.infer<typeof userInsertSchema>;
export type IReviews = Zod.infer<typeof reviewInsertSchema>;
export type IOrders = Zod.infer<typeof orderInsertSchema>;
export type ITransactions = Zod.infer<typeof transactionInsertSchema>;
export type IProducts = Zod.infer<typeof productInsertSchema>;
export type ITransactionDetails = Zod.infer<typeof transactionDetailInsertSchema>;

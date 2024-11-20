import {check, integer, pgTable, text, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import {createId} from "@paralleldrive/cuid2";
import {relations, sql} from "drizzle-orm";

export const users = pgTable(
    "users",
    {
        id: uuid().primaryKey().$default(() => createId()),
        email: text().notNull().unique(),
        password: text().notNull(),
        firstName: text("first_name").notNull(),
        lastName: text("last_name").notNull(),
        userName: text("user_name").notNull(),
    }
)

export const products = pgTable(
    "products",
    {
        id: uuid().primaryKey().$default(() => createId()),
        name: text().notNull(),
        price: integer().notNull(),
        discount: integer(),
        description: text().notNull(),
        size: text().array().notNull(),
    }
)

export const productColorsRelation = relations(products, ({many}) => (
    {
        colors: many(productColors)
    }
))

export const productReviewsRelation = relations(products, ({many}) => (
    {
        reviews: many(reviews)
    }
))

export const userReviewsRelation = relations(users, ({many}) => (
    {
        reviews: many(reviews)
    }
))

export const productColors = pgTable(
    "product_colors",
    {
        id: uuid().primaryKey().$default(() => createId()),
        productId: uuid("product_id").references(() => products.id),
        color: text().notNull(),
        colorHex: varchar("color_hex", {length: 6}).notNull(),
        imagesUrl: text("images_url").array()
    }
)

export const colorsProductRelation = relations(productColors, ({one}) => (
    {
        product: one(products, {
            fields: [productColors.productId],
            references: [products.id]
        })
    }
))

export const reviews = pgTable(
    "reviews",
    {
        id: uuid().primaryKey().$default(() => createId()),
        productId: uuid("product_id").references(() => products.id),
        userId: uuid("user_id").references(() => users.id),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        rating: integer().notNull(),
    },
    (table) => (
        {
            ratingConstraint: check("rating_check", sql`${table.rating} >= 1 AND ${table.rating}<= 5`),
        }
    )
)

export const reviewProductRelation = relations(reviews, ({one}) => (
    {
        product: one(products, {
            fields: [reviews.productId],
            references: [products.id]
        })
    }
))

export const reviewUserRelation = relations(reviews, ({one}) => (
    {
        user: one(users, {
            fields: [reviews.userId],
            references: [users.id]
        })
    }
))
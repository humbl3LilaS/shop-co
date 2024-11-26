import {check, integer, pgTable, text, timestamp, varchar} from "drizzle-orm/pg-core";
import {v4 as createUUID} from "uuid";
import {relations, sql} from "drizzle-orm";
import {CATEGORIES, TYPES} from "@/constants";


export const users = pgTable(
    "users",
    {
        id: text("id").primaryKey().$default(() => createUUID()),
        email: text("email").notNull().unique(),
        password: text("password").notNull(),
        firstName: text("first_name").notNull(),
        lastName: text("last_name").notNull(),
        userName: text("user_name").notNull(),
    }
)


export const products = pgTable(
    "products",
    {
        id: text("id").primaryKey().$default(() => createUUID()),
        name: text("name").notNull(),
        price: integer("price").notNull(),
        discount: integer("discount"),
        description: text("description").notNull(),
        coverImage: text("cover_image").notNull(),
        arrivedAt: timestamp("arrived_at").defaultNow().notNull(),
        productCategory: text("product_category", {enum: [...CATEGORIES]}),
        productType: text("product_type", {enum: [...TYPES]}),
        sizes: text("sizes").array(),
    },
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
        id: text().primaryKey().$default(() => createUUID()),
        productId: text("product_id").references(() => products.id),
        color: text().notNull(),
        colorHex: varchar("color_hex", {length: 6}).notNull(),
        imagesUrl: text("images_url").array(),
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
        id: text().primaryKey().$default(() => createUUID()),
        productId: text("product_id").references(() => products.id),
        userId: text("user_id").references(() => users.id),
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

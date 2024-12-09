ALTER TABLE "product_colors" ALTER COLUMN "product_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "product_category" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "product_type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "sizes" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "product_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "user_id" SET NOT NULL;
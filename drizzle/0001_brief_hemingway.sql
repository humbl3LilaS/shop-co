ALTER TABLE "products" ADD COLUMN "images_url" text[];--> statement-breakpoint
ALTER TABLE "product_colors" DROP COLUMN IF EXISTS "color_hex";--> statement-breakpoint
ALTER TABLE "product_colors" DROP COLUMN IF EXISTS "images_url";
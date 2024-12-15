ALTER TABLE "orders" ADD COLUMN "color_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "size" text NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction_details" ADD COLUMN "delivery_method" text NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction_details" ADD COLUMN "transaction_method" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_color_id_product_colors_id_fk" FOREIGN KEY ("color_id") REFERENCES "public"."product_colors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

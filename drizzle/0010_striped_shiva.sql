CREATE TABLE IF NOT EXISTS "orders" (
	"id" text PRIMARY KEY NOT NULL,
	"product_id" text NOT NULL,
	"quantity" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transaction_details" (
	"id" text PRIMARY KEY NOT NULL,
	"order_id" text NOT NULL,
	"region" text NOT NULL,
	"township" text NOT NULL,
	"address" text NOT NULL,
	"postalCode" text NOT NULL,
	"phoneNumber" text NOT NULL,
	"email" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"customer_id" text NOT NULL,
	"orders" text[] NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"status" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transaction_details" ADD CONSTRAINT "transaction_details_order_id_transactions_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."transactions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

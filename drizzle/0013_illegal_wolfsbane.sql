ALTER TABLE "transaction_details" RENAME COLUMN "order_id" TO "transaction_id";--> statement-breakpoint
ALTER TABLE "transaction_details" DROP CONSTRAINT "transaction_details_order_id_transactions_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transaction_details" ADD CONSTRAINT "transaction_details_transaction_id_transactions_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."transactions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

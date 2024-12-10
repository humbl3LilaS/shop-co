CREATE TABLE IF NOT EXISTS "admins" (
	"id" text PRIMARY KEY NOT NULL,
	"admin_id" text,
	"password" text NOT NULL,
	CONSTRAINT "admins_admin_id_unique" UNIQUE("admin_id")
);

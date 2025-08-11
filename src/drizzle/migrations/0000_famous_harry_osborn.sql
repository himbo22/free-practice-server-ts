CREATE TABLE "users" (
	"id" integer PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"email" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);

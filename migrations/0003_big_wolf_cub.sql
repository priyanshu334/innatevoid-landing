CREATE TABLE "prompts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"content" text NOT NULL,
	"tags" text,
	"difficulty" varchar(50),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "prompts_title_unique" UNIQUE("title")
);

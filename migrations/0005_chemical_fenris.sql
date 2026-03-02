ALTER TABLE "prompts" ADD COLUMN "slug" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_slug_unique" UNIQUE("slug");
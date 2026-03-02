CREATE TYPE "public"."prompt_status" AS ENUM('draft', 'published');--> statement-breakpoint
ALTER TABLE "prompts" DROP CONSTRAINT "prompts_title_unique";--> statement-breakpoint
ALTER TABLE "prompts" ADD COLUMN "status" "prompt_status" DEFAULT 'draft' NOT NULL;--> statement-breakpoint
ALTER TABLE "prompts" ADD COLUMN "views" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "prompts" ADD COLUMN "deleted_at" timestamp;
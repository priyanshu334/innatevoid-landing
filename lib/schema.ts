import { pgTable, uuid, varchar, timestamp, boolean, text, pgEnum, integer } from "drizzle-orm/pg-core";
export const roleEnum = pgEnum("role", ["admin", "user"]);
export const promptStatusEnum = pgEnum("prompt_status", ["draft", "published"]);
export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    role: roleEnum("role").default("user").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull().references(() => users.id),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    revoked: boolean("revoked").default(false).notNull(),
})



export const prompts = pgTable("prompts", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description").notNull(),
    content: text("content").notNull(),
    tags: text("tags"),
    difficulty: varchar("difficulty", { length: 50 }),

    status: promptStatusEnum("status")
        .default("draft")
        .notNull(),

    views: integer("views").default(0).notNull(),

    deletedAt: timestamp("deleted_at"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contact = pgTable("contact", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Roadmaps table
export const roadmaps = pgTable("roadmaps", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Skills table (belongs to a roadmap)
export const skills = pgTable("skills", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    roadmapId: uuid("roadmap_id").references(() => roadmaps.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

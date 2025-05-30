import { InferSelectModel, relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  serial,
  timestamp,
  varchar,
  numeric,
} from "drizzle-orm/pg-core";

export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Cart = InferSelectModel<typeof carts>;
export type NewCart = InferSelectModel<typeof carts>;

export const cartLineItems = pgTable("cart_line_items", {
  id: serial("id").primaryKey(),
  productId: integer("productId").notNull(),
  cartId: integer("cart_id")
    .references(() => carts.id, { onDelete: "cascade" })
    .notNull(),
  itemName: varchar("item_name").notNull(),
  variant: varchar("variant"),
  qty: integer("qty").notNull(),
  price: numeric("amount").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type CartLineItem = InferSelectModel<typeof cartLineItems>;

export const cartRelations = relations(carts, ({ many }) => ({
  lineItems: many(cartLineItems),
}));

export const lineItemsRelations = relations(cartLineItems, ({ one }) => ({
  cart: one(carts, {
    fields: [cartLineItems.cartId],
    references: [carts.id],
  }),
}));

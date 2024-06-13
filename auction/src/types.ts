import { bids, items, users } from "./db/schema";

export type user = (typeof users.$inferSelect)
export type item = (typeof items.$inferSelect)
export type bid = (typeof bids.$inferSelect)
export type bidWithUser = bid & { user: user }
"use server";

import { auth } from "@/auth";

export async function getCurrentSession() {
  const session = await auth();

  if (!session || !session.user) {
    return { user: null, session: null };
  }

  return { user: session.user, session };
}

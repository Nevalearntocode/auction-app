import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.string().min(1),
    ACCESS_KEY_ID: z.string().min(1),
    SECRET_ACCESS_KEY: z.string().min(1),
    ACCOUNT_ID: z.string().min(1),
    BUCKET_NAME: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_BUCKET_URL: z.string().min(1),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    ACCOUNT_ID: process.env.ACCOUNT_ID,
    BUCKET_NAME: process.env.BUCKET_NAME,
    NEXT_PUBLIC_BUCKET_URL: process.env.NEXT_PUBLIC_BUCKET_URL,
  },
});

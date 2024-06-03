/**
 * This module sets up the database connection and exports it for use in the application.
 * It uses the `drizzle-orm` library to handle the database connection and schema definition.
 * It also handles the connection in both production and development environments.
 */
import { env } from "@/env"; // Import the environment variables
import * as schema from "./schema"; // Import the schema definition
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js"; // Import the database ORM
import postgres from "postgres"; // Import the postgres driver

// Declare a global variable for the database connection
declare global {
  // eslint-disable-next-line no-var -- only var works here
  var database: PostgresJsDatabase<typeof schema> | undefined;
}

// Initialize the database connection
let database: PostgresJsDatabase<typeof schema>;
let pg: ReturnType<typeof postgres>;

// If running in production environment
if (env.NODE_ENV === "production") {
  // Create a new postgres driver using the database URL
  pg = postgres(env.DATABASE_URL);
  // Create a new database connection using the driver and schema
  database = drizzle(pg, { schema });
} else {
  // If running in development environment and the database connection is not already set up
  if (!global.database) {
    // Create a new postgres driver using the database URL
    pg = postgres(env.DATABASE_URL);
    // Create a new database connection using the driver and schema
    global.database = drizzle(pg, { schema });
  }
  // Use the existing database connection
  database = global.database;
}

// Export the database connection and the postgres driver
export { database, pg };

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
const configuredBaseURL =
  process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL;
const configuredBaseIsLocal = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/?$/i.test(
  configuredBaseURL || "",
);
const deploymentBaseURL =
  process.env.URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

// Vercel: Project → Settings → Environment Variables → Production-এ
// BETTER_AUTH_URL ও NEXT_PUBLIC_APP_URL-এ live site URL দিন এবং
// BETTER_AUTH_SECRET-এ নতুন random secret দিন। পরিবর্তনের পর redeploy করুন।
// Secret বা database connection string কখনো source control-এ commit করবেন না।
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error("MONGODB_URI is required to use Better Auth.");
}
const authSecret = process.env.BETTER_AUTH_SECRET;
if (!authSecret || authSecret.length < 32) {
  throw new Error("BETTER_AUTH_SECRET must contain at least 32 characters.");
}

const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
};
const mongoClient =
  globalForMongo.mongoClient ?? new MongoClient(mongoUri);
if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = mongoClient;
}

const database = mongoClient.db(process.env.MONGODB_DB_NAME || "bazar_dor");

export const auth = betterAuth({
  appName: "বাজার দর",
  baseURL:
    (process.env.NODE_ENV === "production" && configuredBaseIsLocal
      ? undefined
      : configuredBaseURL) ||
    deploymentBaseURL ||
    "http://localhost:3000",
  secret: authSecret,
  database: mongodbAdapter(database, { client: mongoClient }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  // OAuth চালু করলে Google/GitHub console-এ callback URL দিন:
  // <BETTER_AUTH_URL>/api/auth/callback/google অথবা /github।
  socialProviders: {
    ...(googleClientId && googleClientSecret
      ? {
          google: {
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          },
        }
      : {}),
    ...(githubClientId && githubClientSecret
      ? {
          github: {
            clientId: githubClientId,
            clientSecret: githubClientSecret,
          },
        }
      : {}),
  },
});

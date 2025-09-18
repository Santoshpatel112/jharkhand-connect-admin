// Clerk configuration for the Jharkhand Government Dashboard
export const CLERK_PUBLISHABLE_KEY = "pk_test_bW9yZS1nbnUtOTUuY2xlcmsuYWNjb3VudHMuZGV2JA";

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
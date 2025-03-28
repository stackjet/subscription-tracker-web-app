import { initializeApp, getApps, cert } from "firebase-admin/app";
import { auth } from "firebase-admin";

var admin = require("firebase-admin");
var fs = require("fs");

export function initializeFirebaseAdmin() {
  const serviceAccountPath = process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY_JSON;
  if (!serviceAccountPath) {
    throw new Error("Environment variable NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY_JSON is not set.");
  }

  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    console.log("Firebase Admin already initialized.");
  }
}
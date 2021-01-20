import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import admin from "firebase-admin";
import config from "./service.json";

// const firebaseConfig = {
// 	apiKey: process.env.NEXT_PUBLIC_API_KEY,
// 	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
// 	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
// 	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
// 	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
// 	appId: process.env.NEXT_PUBLIC_APP_ID,
// 	measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
// };
// Initialize Firebase

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert({
			projectId: config.project_id,
			clientEmail: config.client_email,
			privateKey: config.private_key,
		}),
		storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
	});
} else {
	admin.app();
}

export const db = admin.firestore();

export enum FirebaseCollections {
	Data = "data",
}

export const firebase = admin.firestore();
export const storage = admin
	.storage()
	.bucket(process.env.NEXT_PUBLIC_STORAGE_BUCKET);

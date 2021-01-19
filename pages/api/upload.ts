import { firebase, FirebaseCollections } from "./../../lib/firebase";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { DocumentData } from "../../contracts";
import { nanoid } from "nanoid";

export const config = {
	api: {
		bodyParser: false,
	},
};

interface DocumentDataRequest {
	readonly textContent?: string;
	readonly storageURL?: string;
	readonly deleteDate: Date;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			if (err) throw new Error(err);
			const deleteOn = new Date(String(fields.deleteDate));

			const docRef = firebase
				.collection(`${FirebaseCollections.Data}`)
				.doc();

			const code = nanoid(6);
			const savingDocument: DocumentData = {
				id: docRef.id,
				deleteDate: deleteOn,
				code: code,
			};

			if (fields.textContent) {
				savingDocument.textContent = String(fields.textContent);
			}

			console.log("in progress ", savingDocument, files.length);

			// if (files) {
			// 	if (Array.isArray(files)) {
			// 		console.log("coming here");
			// 		const uploadFiles = files.map(async (file) => {
			// 			const firebaseStorageRef = firebase
			// 				.storage()
			// 				.ref(`${docRef.id}/${files.name}`);
			// 			await firebaseStorageRef.put(file);
			// 		});

			// 		await Promise.all(uploadFiles);
			// 	} else {
			// 		console.log("coming there");
			// 		const firebaseStorageRef = storage.ref(
			// 			`${docRef.id}/${files.name}`
			// 		);
			// 		await firebaseStorageRef.put(files as any);
			// 	}
			// }

			await docRef.set({
				...savingDocument,
			});

			console.log("all done ---> ", savingDocument);

			return res.status(200).json({ code });
		});
	} catch (error) {
		console.error(error);
		return res.json(error);
	}
};

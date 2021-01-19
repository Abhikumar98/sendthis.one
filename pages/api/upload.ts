import { firebase, FirebaseCollections, storage } from "../../lib/server";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { DocumentData } from "../../contracts";
import { nanoid } from "nanoid";
import { uuid } from "uuidv4";

export const config = {
	api: {
		bodyParser: false,
	},
};

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
				isPasswordProtected: false, // fields.isPasswordProtected
			};

			if (fields.textContent) {
				savingDocument.textContent = String(fields.textContent);
			}

			if (files) {
				Object.keys(files).map(async (fileKey) => {
					const file = files[fileKey] as any;
					const token = uuid();
					console.log(token);
					await storage.upload(file.path, {
						destination: `${docRef.id}/${file.name}`,
						metadata: {
							firebaseStorageDownloadTokens: token,
						},
					});
				});
			}

			await docRef.set({
				...savingDocument,
			});

			return res.status(200).json({ code });
		});
	} catch (error) {
		console.error(error);
		return res.json(error);
	}
};
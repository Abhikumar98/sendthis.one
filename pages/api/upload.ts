import { firebase, FirebaseCollections, storage } from "../../lib/server";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { DocumentData } from "../../contracts";
import { customAlphabet, nanoid } from "nanoid";
import { uuid } from "uuidv4";
import bodyParser from "body-parser";

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
			const requirePassword =
				fields.isPasswordProtected === "true" ? true : false;
			const password = fields.password ?? false;

			const docRef = firebase.collection(`${FirebaseCollections.Data}`).doc();

			const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			const generateCode = customAlphabet(alphabet, 6);

			const code = generateCode();

			const savingDocument: DocumentData = {
				id: docRef.id,
				deleteDate: deleteOn,
				code: code,
				isPasswordProtected: requirePassword,
				password: String(password),
			};

			if (fields.textContent) {
				savingDocument.textContent = String(fields.textContent);
			}

			const fileNames: string[] = [];

			if (files) {
				Object.keys(files).map(async (fileKey) => {
					const file = files[fileKey] as any;
					fileNames.push(file.name);
					const token = uuid();

					await storage.upload(file.path, {
						destination: `${docRef.id}/${file.name}`,
						metadata: {
							firebaseStorageDownloadTokens: token,
						},
					});
				});
			}

			if (fileNames.length) {
				savingDocument.fileNames = fileNames;
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

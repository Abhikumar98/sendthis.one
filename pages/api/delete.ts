import { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import { firebase, FirebaseCollections, storage } from "../../lib/server";

export default async (
	_req: NextApiRequest,
	res: NextApiResponse
): Promise<any> => {
	try {
		console.log("starting --->");

		const allDocuments = await firebase
			.collection(FirebaseCollections.Data)
			.get();

		const data = allDocuments.docs.map((doc) => doc.data());

		data.forEach(async (doc) => {
			try {
				const date = new Date(doc.deleteDate.toDate());

				const isPastDate = date <= new Date();

				console.log("in document -> ", doc.id);

				if (isPastDate) {
					console.log("deleting -> ", doc.id);
					await firebase
						.collection(FirebaseCollections.Data)
						.doc(doc.id)
						.delete();

					doc.fileNames?.forEach(async (data) => {
						await storage.file(`${doc.id}/${data}`).delete();
					});
				}
			} catch (error) {
				console.error(error);
			}
		});

		return res.status(200);
	} catch (error) {
		console.error(error);
	}
};

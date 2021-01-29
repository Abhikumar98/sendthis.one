import { firebase, FirebaseCollections, storage } from "../../lib/server";

export default async (): Promise<any> => {
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

				if (isPastDate) {
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

		console.log("finished stuff");
	} catch (error) {
		console.error(error);
	}
};

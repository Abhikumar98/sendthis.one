import { firebase, FirebaseCollections } from "../../lib/server";
import { NextApiRequest, NextApiResponse } from "next";
import { DocumentData } from "../../contracts";

export default async (
	req: NextApiRequest,
	res: NextApiResponse
): Promise<any> => {
	try {
		const { code } = req.query;

		console.log("coming here ---> ", code);

		const document = await firebase
			.collection(FirebaseCollections.Data)
			.where("code", "==", code)
			.where("deleted", "!=", true)
			.get();

		if (document.empty) {
			return res.status(200).json({ deleted: true });
		}

		const data = document.docs[0].data() as DocumentData;

		console.log("data --> ", data);

		if (data.isPasswordProtected) {
			return res.status(200).json({ isPasswordProtected: true });
		} else {
			return res.status(200).json({ ...data });
		}
	} catch (error) {
		return res.json(error);
	}
};

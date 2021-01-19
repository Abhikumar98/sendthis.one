import { firebase, FirebaseCollections } from "../../lib/server";
import { NextApiRequest, NextApiResponse } from "next";
import { DocumentData } from "../../contracts";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { code, password } = req.query;

		const document = await firebase
			.collection(FirebaseCollections.Data)
			.where("code", "==", code)
			.get();

		const data = document.docs[0].data() as DocumentData;

		if (data.password === password) {
			return res.status(200).json({ ...data });
		} else {
			return res.status(200).json({ message: "incorrect_password" });
		}
	} catch (error) {
		return res.json(error);
	}
};

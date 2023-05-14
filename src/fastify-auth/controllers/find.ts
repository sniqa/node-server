import { UserModel } from '../db.js'

export const find_accounts = async (query?: any) => {
	const res = await UserModel.find(query, {
		projection: { password: 0 },
	}).toArray()

	return res
}

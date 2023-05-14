import { NetworkGroupModel } from '../../db.js'

export const find_network_group = async (query?: any) => {
	const res = await NetworkGroupModel.find(query, {
		projection: {},
	}).toArray()

	return res
}

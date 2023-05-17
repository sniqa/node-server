import { defaultQueryOptions } from '#types/common.js'
import { UserAuthModel } from '../../../db.js'

export const find_accounts = async (
	{ fuzzy }: { fuzzy: string },
	{ length, page } = defaultQueryOptions
) => {
	console.log(fuzzy)

	const skip = page <= 0 ? 0 : length * (page - 1)

	const regex = new RegExp(fuzzy, 'i')

	const res = await UserAuthModel.aggregate([
		{
			$lookup: {
				from: 'user_infos',
				localField: 'user_info_id',
				foreignField: '_id',
				as: 'user_info',
			},
		},
		{
			$match: {
				$or: [
					{ account: { $regex: regex } },
					{ 'user_info.username': { $regex: regex } },
					{ 'user_info.realname': { $regex: regex } },
					{ 'user_info.nickname': { $regex: regex } },
					{ 'user_info.number': { $regex: regex } },
				],
			},
		},
		{
			$project: {
				password: 0,
				user_info_id: 0,
				role_id: 0,
			},
		},
		{
			$unwind: '$user_info',
		},
	])
		.limit(length)
		.skip(skip)
		.toArray()

	return res
}

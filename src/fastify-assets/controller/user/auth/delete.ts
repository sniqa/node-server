import { UserAuthWithId } from '#types/user.js'
import { isNotExistInMongodb, Joi, validate } from '#utils/process.js'
import { ObjectId } from '@fastify/mongodb'
import { UserAuthModel, UserInfoModel } from '../../../db.js'

// delete account
const validSchema = Joi.object({
	_id: Joi.string().required(),
	account: Joi.string(),
	password: Joi.string(),
})

export const delete_account = async (query: UserAuthWithId) => {
	validate(validSchema, query)

	const queryWithId = { _id: new ObjectId(query._id) }

	const user = await isNotExistInMongodb(() =>
		UserAuthModel.findOne(queryWithId)
	)

	const res = await UserAuthModel.deleteOne(queryWithId)

	res.deletedCount === 1 &&
		user.user_info_id &&
		(await UserInfoModel.deleteOne({ _id: user.user_info_id }))

	return res
}

// delete accounts
const v = Joi.array()

export const delete_accounts = async (query: UserAuthWithId[]) => {
	// validate(validSchema, query)

	const queryWithIds = query.map((q) => ({ _id: new ObjectId(q._id) }))

	// await isNotExistInMongodb(UserInfoModel, queryWithId)

	const res = await UserInfoModel.deleteMany(queryWithIds)

	return res
}

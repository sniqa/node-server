import { UserWithId } from '#types/user.js'
import { isNotExistInMongodb, Joi, validate } from '#utils/process.js'
import { ObjectId } from '@fastify/mongodb'
import { UserModel } from '../db.js'

// delete account
const validSchema = Joi.object({
	_id: Joi.string().required(),
	username: Joi.string(),
	password: Joi.string(),
})

export const delete_account = async (query: UserWithId) => {
	validate(validSchema, query)

	const queryWithId = { _id: new ObjectId(query._id) }

	await isNotExistInMongodb(() => UserModel.findOne(queryWithId))

	const res = await UserModel.deleteOne(queryWithId)

	return res
}

// delete accounts
const v = Joi.array()

export const delete_accounts = async (query: UserWithId[]) => {
	// validate(validSchema, query)

	const queryWithIds = query.map((q) => ({ _id: new ObjectId(q._id) }))

	// await isNotExistInMongodb(UserModel, queryWithId)

	const res = await UserModel.deleteMany(queryWithIds)

	return res
}

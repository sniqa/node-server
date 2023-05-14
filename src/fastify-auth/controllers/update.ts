import { UserWithId } from '#types/user.js'
import { hashSync } from '#utils/crypt.js'
import { isNotExistInMongodb, Joi, validate } from '#utils/process.js'
import { ObjectId } from '@fastify/mongodb'
import { UserModel } from '../db.js'

const validSchema = Joi.object({
	_id: Joi.string().required(),
	username: Joi.string(),
	password: Joi.string(),
})

export const update_account = async (query: UserWithId) => {
	validate(validSchema, query)

	const { _id, ...newQuery } = query

	const queryWithId = { _id: new ObjectId(_id) }

	await isNotExistInMongodb(() => UserModel.findOne(queryWithId))

	if (newQuery.password) {
		newQuery.password = hashSync(newQuery.password)
	}

	const res = await UserModel.updateOne(queryWithId, { $set: newQuery })

	return res
}

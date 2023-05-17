import { UserAuthWithId } from '#types/user.js'
import { hashSync } from '#utils/crypt.js'
import { isNotExistInMongodb, Joi, validate } from '#utils/process.js'
import { ObjectId } from '@fastify/mongodb'
import { UserInfoModel } from '../../../db.js'

const validSchema = Joi.object({
	_id: Joi.string().required(),
	account: Joi.string(),
	password: Joi.string(),
})

export const update_account = async (query: UserAuthWithId) => {
	validate(validSchema, query)

	const { _id, ...newQuery } = query

	const queryWithId = { _id: new ObjectId(_id) }

	await isNotExistInMongodb(() => UserInfoModel.findOne(queryWithId))

	if (newQuery.password) {
		newQuery.password = hashSync(newQuery.password)
	}

	const res = await UserInfoModel.updateOne(queryWithId, { $set: newQuery })

	return res
}

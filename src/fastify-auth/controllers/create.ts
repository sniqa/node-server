import { UserBase } from '#types/user.js'
import { hashSync } from '#utils/crypt.js'
import { isExistInMongodb, Joi, validate } from '#utils/process.js'
import { UserModel } from '../db.js'

const validSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
})

export const create_account = async (query: UserBase) => {
	validate(validSchema, query)

	await isExistInMongodb(() =>
		UserModel.findOne({ username: query.username.trim() })
	)

	const account = await UserModel.insertOne({
		...query,
		password: hashSync(query.password),
	})

	return account.insertedId
}

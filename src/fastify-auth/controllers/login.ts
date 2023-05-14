import { UserBase } from '#types/user.js'
import { compare } from '#utils/crypt.js'
import { signSync } from '#utils/jwt.js'
import { isNotExistInMongodb, Joi, validate } from '#utils/process.js'
import { UserModel } from '../db.js'

const validSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
})

export const login = async (query: UserBase) => {
	validate(validSchema, query)

	const account = await isNotExistInMongodb(() =>
		UserModel.findOne({ account: query.username.trim() })
	)

	if (!compare(query.password, account.password)) {
		throw `password error`
	}

	return signSync({ id: account._id })
}

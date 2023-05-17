import { UserAuth } from '#types/user.js'
import { compare } from '#utils/crypt.js'
import { signSync } from '#utils/jwt.js'
import { isNotExistInMongodb, Joi, validate } from '#utils/process.js'
import { UserAuthModel } from '../../../db.js'

const validSchema = Joi.object({
	account: Joi.string().required(),
	password: Joi.string().required(),
})

export const login = async (query: UserAuth) => {
	validate(validSchema, query)

	const account = await isNotExistInMongodb(() =>
		UserAuthModel.findOne({ account: query.account.trim() })
	)

	if (!compare(query.password, account.password)) {
		throw `password error`
	}

	return signSync({ id: account._id })
}

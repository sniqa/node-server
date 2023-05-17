import { UserAuth, UserInfo } from '#types/user.js'
import { hashSync } from '#utils/crypt.js'
import { getCurrentTimestamp } from '#utils/date.js'
import { isExistInMongodb, Joi, validate } from '#utils/process.js'
import { UserAuthModel, UserInfoModel } from '../../../db.js'

const validSchema = Joi.object({
	account: Joi.string().required(),
	password: Joi.string().required(),
})

export const create_account = async (query: UserAuth) => {
	validate(validSchema, query)

	await isExistInMongodb(() =>
		UserAuthModel.findOne({ account: query.account.trim() })
	)

	// create user info
	const userInfo = await UserInfoModel.insertOne({
		number: '',
		username: '',
		realname: '',
		nickname: '',
		phone: '',
		remark: '',
	} as UserInfo)

	const account = await UserAuthModel.insertOne({
		...query,
		password: hashSync(query.password),
		user_info_id: userInfo.insertedId,
		create_time: getCurrentTimestamp(),
		state: false,
	})

	return account.insertedId
}

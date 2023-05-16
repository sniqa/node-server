import { getCurrentTimestamp } from '#utils/date.js'
import { isNotExistInMongodb, validate } from '#utils/process.js'
import { ObjectId } from '@fastify/mongodb'
import Joi from 'joi'
import { IpAddressModel } from '../../db.js'

const validSchema = Joi.object({
	_id: Joi.string().required(),
	user_id: Joi.string().allow(''),
	asset_id: Joi.string().allow(''),
	remark: Joi.string().allow(''),
})

export const update_ip_address = async (query: any) => {
	validate(validSchema, query)

	const { _id, ...newQuery } = query

	const queryWithId = { _id: new ObjectId(_id) }

	await isNotExistInMongodb(() => IpAddressModel.findOne(queryWithId))

	const res = await IpAddressModel.updateOne(queryWithId, {
		$set: { ...newQuery, update_time: getCurrentTimestamp() },
	})

	return res
}

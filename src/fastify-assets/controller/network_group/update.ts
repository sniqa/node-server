import { NetworkGroupWithId } from '#types/network_group.js'
import { getCurrentTimestamp } from '#utils/date.js'
import { isNotExistInMongodb, Joi, validate } from '#utils/process.js'
import { ObjectId } from '@fastify/mongodb'
import { NetworkGroupModel } from '../../db.js'

const validSchema = Joi.object({
	_id: Joi.string().required(),
	group: Joi.string(),
	gateway: Joi.string().ip().allow(''),
	dns: Joi.string().ip().allow(''),
	remark: Joi.string().allow(''),
})

export const update_network_group = async (query: NetworkGroupWithId) => {
	validate(validSchema, query)

	const { _id, ...newQuery } = query

	const queryWithId = { _id: new ObjectId(_id) }

	await isNotExistInMongodb(() => NetworkGroupModel.findOne(queryWithId))

	const res = await NetworkGroupModel.updateOne(queryWithId, {
		$set: { ...newQuery, update_time: getCurrentTimestamp() },
	})

	return res
}

import { NetworkGroupWithId } from '#types/network_group.js'
import { isNotExistInMongodb, Joi, validate } from '#utils/process.js'
import { ObjectId } from '@fastify/mongodb'
import { IpAddressModel, NetworkGroupModel } from '../../db.js'

const validSchema = Joi.object({
	_id: Joi.string().required(),
})

export const delete_network_group = async (query: NetworkGroupWithId) => {
	validate(validSchema, query)

	const queryWithId = { _id: new ObjectId(query._id) }

	await isNotExistInMongodb(() => NetworkGroupModel.findOne(queryWithId))

	IpAddressModel.deleteMany({ network_group_id: query._id })

	const res = await NetworkGroupModel.deleteOne(queryWithId)

	return res
}

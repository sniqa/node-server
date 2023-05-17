import { IpAddressBase } from '#types/ip_address.js'
import { NetworkGroupBase } from '#types/network_group.js'
import { getCurrentTimestamp } from '#utils/date.js'
import { createIpRange, subnet } from '#utils/ip.js'
import { isExistInMongodb, Joi, validate } from '#utils/process.js'
import { IpAddressModel, NetworkGroupModel } from '../../db.js'

// create
const validSchema = Joi.object({
	group: Joi.string().required(),
	firstAddress: Joi.string().ip().required(),
	subnetMask: [Joi.string().ip().required(), Joi.number().required()],
	gateway: Joi.string().ip().allow(''),
	dns: Joi.string().ip().allow(''),
})

export const create_network_group = async (query: NetworkGroupBase) => {
	validate(validSchema, query)

	await isExistInMongodb(() =>
		NetworkGroupModel.findOne({ group: query.group.trim() })
	)

	const cidr = subnet(query.firstAddress, query.subnetMask)

	const timestamp = getCurrentTimestamp()

	const res = await NetworkGroupModel.insertOne({
		...query,
		...cidr,
		create_time: timestamp,
		update_time: timestamp,
		remark: '',
	})

	res.insertedId &&
		IpAddressModel.insertMany(
			createIpRange<IpAddressBase>(cidr, (ipAddress) => ({
				ip_address: ipAddress,
				user_id: '',
				asset_id: '',
				network_group_id: res.insertedId,
				create_time: timestamp,
				update_time: timestamp,
				state: false,
				remark: '',
			}))
		)

	return res.insertedId
}

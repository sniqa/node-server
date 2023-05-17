import { ObjectId } from '@fastify/mongodb'
import { WithId } from './common.js'

export interface IpAddressBase {
	ip_address: string
	user_id: ObjectId | ''
	asset_id: ObjectId | ''
	network_group_id: ObjectId | ''
	create_time: number
	update_time: number
	state: boolean
	remark: string
}

export type IpAddressWithId = IpAddressBase & WithId

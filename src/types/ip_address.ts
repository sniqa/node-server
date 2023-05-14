import { WithId } from './common.js'

export interface IpAddressBase {
	ip_address: string
	user_id: string
	asset_id: string
	network_group_id: string
	create_time: number
	update_time: number
	remark: string
}

export type IpAddressWithId = IpAddressBase & WithId

import { SubnetInfo } from 'ip'
import { WithId } from './common.js'

export interface NetworkGroupBase extends SubnetInfo {
	group: string
	gateway: string
	dns: string
	create_time: number
	update_time: number
	remark: string
}

export type NetworkGroupWithId = NetworkGroupBase & WithId

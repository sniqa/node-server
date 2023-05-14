import { IpAddressBase } from '#types/ip_address.js'
import { NetworkGroupBase } from '#types/network_group.js'
import { connectDb } from '#utils/mongodb.js'

const db = connectDb('assets')

// mongodb ip address shcema
export const IpAddressModel = db.collection<IpAddressBase>('ip_address')

// mongodb network group shcema
export const NetworkGroupModel =
	db.collection<NetworkGroupBase>('network_group')
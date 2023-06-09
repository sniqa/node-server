import { IpAddressBase } from '#types/ip_address.js'
import { NetworkGroupBase } from '#types/network_group.js'
import { UserAuth, UserInfo, UserRole } from '#types/user.js'
import { connectDb } from '#utils/mongodb.js'

const db = connectDb('assets')

// mongodb ip address shcema
export const IpAddressModel = db.collection<IpAddressBase>('ip_address')

// mongodb network group shcema
export const NetworkGroupModel =
	db.collection<NetworkGroupBase>('network_group')

// mongodb user shcema
export const UserAuthModel = db.collection<UserAuth>('user_auths')

export const UserInfoModel = db.collection<UserInfo>('user_infos')

export const UserRoleModel = db.collection<UserRole>('user_roles')

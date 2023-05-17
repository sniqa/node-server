import { ObjectId } from '@fastify/mongodb'
import { WithId } from './common.js'

export interface UserAuth {
	account: string
	password: string
	create_time: number
	last_login_time: number
	user_info_id: ObjectId | ''
	role_id: ObjectId | ''
	state: boolean
}

export type UserAuthWithId = UserAuth & WithId

export interface UserInfo {
	username: string
	user_id: ObjectId | ''
	department_id: ObjectId | ''
	realname: string
	nickname: string
	number: string
	phone: string
	remark: string
}

export type UserInfoWithId = UserInfo & WithId

export interface UserRole {}

export type UserRoleWithId = UserRole & WithId

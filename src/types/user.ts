import { WithId } from './common.js'

export interface UserBase {
	username: string
	password: string
}

export type UserWithId = UserBase & WithId

export interface UserInfo {
	user_id: string
	department_id: string
	real_name: string
	nick_name: string
	number: number
	phone: number
	role: string
}

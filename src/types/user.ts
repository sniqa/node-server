import { WithId } from './common.js'

export interface UserBase {
	username: string
	password: string
}

export type UserWithId = UserBase & WithId

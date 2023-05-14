import { UserBase } from '#types/user.js'
import { connectDb } from '#utils/mongodb.js'

const db = connectDb('user')

// mongodb account shcema
export const UserModel = db.collection<UserBase>('users')

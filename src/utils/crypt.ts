import bcrypt from 'bcrypt'

const saltRounds = 10

export const hashSync = (data: string | Buffer) =>
	bcrypt.hashSync(data, saltRounds)

export const compare = bcrypt.compareSync

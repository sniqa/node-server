import Joi from 'joi'
// import { string as JoiString } from "joi";

export { Joi }

export const validate = (
	schema: Joi.ObjectSchema<any>,
	value: any,
	options?: Joi.ValidationOptions
) => {
	const { error } = schema.validate(value, options)

	if (error) {
		throw error.message
	}
}

// is repeat
// export const isExistInMongodb = async <T extends Document>(
// 	collection: Collection<T>,
// 	filter: Filter<T>,
// 	options?: FindOptions
// ) => {
// 	const isExist = await collection.findOne(filter, options)

// 	if (isExist) {
// 		throw `already exist`
// 	}

// 	return isExist
// }

export const isExistInMongodb = async <T = null>(fn: () => Promise<T>) => {
	const isExist = await fn()

	if (isExist) {
		throw `already exist`
	}

	return isExist as unknown as Exclude<T, null | undefined>
}

// is not repeat
// export const isNotExistInMongodb = async <T extends Document>(
// 	collection: Collection<T>,
// 	filter: Filter<T>,
// 	options?: FindOptions<T>
// ) => {
// 	const isExist = await collection.findOne(filter, options)

// 	if (!isExist) {
// 		throw `not exist`
// 	}

// 	return isExist
// }

// is not repeat
export const isNotExistInMongodb = async <T = null>(fn: () => Promise<T>) => {
	const isExist = await fn()

	if (!isExist) {
		throw `not exist`
	}

	return isExist as unknown as Exclude<T, null | undefined>
}

import { RouteHandlerMethod } from 'fastify'
import { IncomingMessage, Server, ServerResponse } from 'node:http'
import { faildResult2, succesResult } from './response.js'

export const fastifyHandler = (fn: (body: any) => Promise<any>) => {
	const handler: RouteHandlerMethod<
		Server<typeof IncomingMessage, typeof ServerResponse>
	> = async (req, res) => {
		const body = req.body

		const result = await fn(body as any)
			.then((res) => succesResult(res))
			.catch((res) => faildResult2(res))

		res.send(result)
	}

	return handler
}

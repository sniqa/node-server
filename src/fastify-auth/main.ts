import { fastifyHandler } from '#utils/fastify.js'
import cors from '@fastify/cors'
import mongodb from '@fastify/mongodb'
import fastify from 'fastify'
import { create_account } from '../fastify-assets/controller/user/auth/create.js'
import { delete_account } from '../fastify-assets/controller/user/auth/delete.js'
import { find_accounts } from '../fastify-assets/controller/user/auth/find.js'
import { login } from '../fastify-assets/controller/user/auth/login.js'
import { update_account } from '../fastify-assets/controller/user/info/update.js'
import { client } from '../utils/mongodb.js'

const app = fastify({ logger: true })

app.register(cors)

app.register(mongodb, {
	client,
})

app.post('/create_account', fastifyHandler(create_account))

app.post('/find_accounts', fastifyHandler(find_accounts))

app.post('/update_account', fastifyHandler(update_account))

app.post('/delete_account', fastifyHandler(delete_account))

app.post('/login', fastifyHandler(login))

app.listen({ port: 8000 })

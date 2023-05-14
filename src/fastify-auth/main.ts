import { fastifyHandler } from '#utils/fastify.js'
import cors from '@fastify/cors'
import mongodb from '@fastify/mongodb'
import fastify from 'fastify'
import { client } from '../utils/mongodb.js'
import { create_account } from './controllers/create.js'
import { delete_account } from './controllers/delete.js'
import { find_accounts } from './controllers/find.js'
import { login } from './controllers/login.js'
import { update_account } from './controllers/update.js'

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

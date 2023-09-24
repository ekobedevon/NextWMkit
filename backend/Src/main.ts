import express from 'express'
import cors from 'cors'
const app = express()
import corsOptions from '../utils/cors.js'
import authCheck from '../utils/middleware.js'
import { drizzle } from 'drizzle-orm/postgres-js'
import { luciaClient } from '../db.js'
import { users, invites } from '../utils/schema/authSchema.js'
import { eq } from 'drizzle-orm'
import SetupCheck, { adminCheck } from '../utils/Setup'
// import testRouter from './test'; // Import your route file
import inviteRouter from './invite.js'

const port = 8080
app.use(express.json()) // for application/json
app.use(cors(corsOptions))
app.use(authCheck)

SetupCheck()

// Use the imported route in your Express app
app.use('/invite', inviteRouter);

const db = drizzle(luciaClient)

const testAsync = async () => {
    const allUsers = await db
        .select()
        .from(users)
        .where(eq(users.role, 'Admin'))
    return allUsers
}

app.get('/', async (_req, res) => {
    //const sample = await testAsync()
    res.json({test:"test"})
})


app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`)
})



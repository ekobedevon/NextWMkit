import express from 'express'
import cors from 'cors'
const app = express()
import { auth } from '../auth/lucia.js'

// Now you can access your environment variables with process.env
// import testRouter from './test'; // Import your route file

const port = 8080
app.use(express.json()) // for application/json

const authCheck = async (req, res, next) => {
    const authRequest = auth.handleRequest(req, res)
    const session = await authRequest.validate()
    if (!session) {
        res.sendStatus(401)
    } else {
        next()
    }
}
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies and credentials
    optionsSuccessStatus: 204, // No content response for preflight requests
}
// Use the imported route in your Express app
// app.use('/test', testRouter);
app.use(cors(corsOptions))
app.use(authCheck)

app.get('/', async (req, res) => {
    const authRequest = auth.handleRequest(req, res)
    const session = await authRequest.validate()
    if (!session) {
        res.send({ text: 'Hello Worlds!' })
    } else {
        res.send({ text: 'YO' })
    }
})

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`)
})

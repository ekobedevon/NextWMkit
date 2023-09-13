import express from 'express'
import cors from 'cors'
const app = express()
import { auth } from '../auth/lucia.js'

// Now you can access your environment variables with process.env
// import testRouter from './test'; // Import your route file

const port = 8080

const corsOptions = {
    origin: '*', // Replace with the allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies and credentials
    optionsSuccessStatus: 204, // No content response for preflight requests
}
// Use the imported route in your Express app
// app.use('/test', testRouter);
app.use(cors(corsOptions))

app.get('/', async (req, res) => {
    const authRequest = auth.handleRequest(req, res)
    const session = await authRequest.validate()
    if (!session) {
        res.send('Hello Worlds!')
    } else {
        res.send(session.user.username)
    }
})

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`)
})

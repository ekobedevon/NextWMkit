import express from 'express'
import cors from 'cors'
const app = express()

const port = 8000

const corsOptions = {
    origin: '*', // Replace with the allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies and credentials
    optionsSuccessStatus: 204, // No content response for preflight requests
}

app.use(cors(corsOptions))

app.get('/', (_req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`)
})

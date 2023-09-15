import express from 'express'
import cors from 'cors'
const app = express()
import corsOptions from '../utils/cors.js'
import authCheck from '../utils/middleware.js'
// import testRouter from './test'; // Import your route file

const port = 8080
app.use(express.json()) // for application/json
app.use(cors(corsOptions))
app.use(authCheck)


// Use the imported route in your Express app
// app.use('/test', testRouter);

app.get('/', async (_req, res) => {
    res.send(res.locals.session)
})

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`)
})

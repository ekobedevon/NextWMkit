import postgres from 'postgres'
const luciaClient = postgres({
    user: process.env.PG_USER,
    database: 'lucia',
    hostname: 'localhost',
    port: 5432,
    password: process.env.PG_PASSWORD,
})

export default luciaClient
import ck from 'ckey'

const url = `${(ck.HTTPS === '1' ? 'https' : 'http')}://${ck.WEB_URL}`

const corsOptions = {
    origin: url, // Replace with the allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies and credentials
    optionsSuccessStatus: 204, // No content response for preflight requests
}

export default corsOptions

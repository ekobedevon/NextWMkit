const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies and credentials
    optionsSuccessStatus: 204, // No content response for preflight requests
}

export default corsOptions

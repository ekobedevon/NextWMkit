import express from 'express';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { notes, users } from '../schema';
import cors from 'cors';
import { eq } from 'drizzle-orm';
const app = express();

const port = 8000;

const corsOptions = {
	origin: '*', // Replace with the allowed origin
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true, // Enable cookies and credentials (if needed)
	optionsSuccessStatus: 204 // No content response for preflight requests
};

app.use(cors(corsOptions));
const client = postgres({
	user: 'postgres',
	database: 'test',
	hostname: 'localhost',
	port: 5433,
	password: 'example'
});
const db = drizzle(client);
const testAsync = async () => {
	const allUsers = await db.select().from(users);
	console.log(allUsers);
	return allUsers;
};

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/names', async (req, res) => {
	const data = await testAsync();
	console.log(data);
	res.json({ data });
});

app.get('/notes', async (req, res) => {
	const data = await db.select().from(notes);
	console.log(data);
	res.json({ data });
});

app.post('/newNote', async (req, res) => {
	console.log(req.query);
	const text = req.query.text as string;
	console.log('HERE');
	console.log(text);
	const data = await db.insert(notes).values({ text: text });
	const datas = await db.select().from(notes);
	res.status(200).json({ datas });
});

app.post('/deleteNote',async (req,res) => {
	console.log(req.query);
	const id:number = +req.query.id;
	console.log(typeof(id))
	console.log(id)
	const deleted = await db.delete(notes).where(eq(notes.id,id))
	.returning()
	res.status(200).json({deleted})
})

app.listen(port, () => {
	return console.log(`Express is listening at http://localhost:${port}`);
});

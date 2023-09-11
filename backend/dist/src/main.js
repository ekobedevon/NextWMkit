"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postgres_js_1 = require("drizzle-orm/postgres-js");
const postgres_1 = __importDefault(require("postgres"));
const schema_1 = require("../schema");
const cors_1 = __importDefault(require("cors"));
const drizzle_orm_1 = require("drizzle-orm");
const app = (0, express_1.default)();
const port = 8000;
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204 // No content response for preflight requests
};
app.use((0, cors_1.default)(corsOptions));
const client = (0, postgres_1.default)({
    user: 'postgres',
    database: 'test',
    hostname: 'localhost',
    port: 5433,
    password: 'example'
});
const db = (0, postgres_js_1.drizzle)(client);
const testAsync = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield db.select().from(schema_1.users);
    console.log(allUsers);
    return allUsers;
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/names', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield testAsync();
    console.log(data);
    res.json({ data });
}));
app.get('/notes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield db.select().from(schema_1.notes);
    console.log(data);
    res.json({ data });
}));
app.post('/newNote', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query);
    const text = req.query.text;
    console.log('HERE');
    console.log(text);
    const data = yield db.insert(schema_1.notes).values({ text: text });
    const datas = yield db.select().from(schema_1.notes);
    res.status(200).json({ datas });
}));
app.post('/deleteNote', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query);
    const id = +req.query.id;
    console.log(typeof (id));
    console.log(id);
    const deleted = yield db.delete(schema_1.notes).where((0, drizzle_orm_1.eq)(schema_1.notes.id, id))
        .returning();
    res.status(200).json({ deleted });
}));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=main.js.map
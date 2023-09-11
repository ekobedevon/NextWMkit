"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notes = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    fullName: (0, pg_core_1.text)('full_name'),
    phone: (0, pg_core_1.varchar)('phone', { length: 256 })
});
exports.notes = (0, pg_core_1.pgTable)('notes', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    text: (0, pg_core_1.varchar)('text', { length: 60 })
});
//# sourceMappingURL=schema.js.map
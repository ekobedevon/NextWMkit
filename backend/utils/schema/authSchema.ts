import { pgTable, serial, text, varchar,pgEnum } from 'drizzle-orm/pg-core'

export const roleEnum = pgEnum('roles',['Admin', 'Moderator', 'GM', 'Player'])

export const users = pgTable('auth_user', {
    id: text('id').primaryKey(),
    display: varchar('display', { length: 32 }),
    userId: varchar('user_id', { length: 255 }),
	icon: varchar('icon',{length: 32}),
	role: roleEnum('role')
})
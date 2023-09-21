import { drizzle } from 'drizzle-orm/postgres-js'
import { luciaClient } from '../db.js'
import { users } from '../utils/schema/authSchema.js'
import { eq } from 'drizzle-orm'
const db = drizzle(luciaClient)


const adminCheck = async () => {
    const allUsers = await db
        .select()
        .from(users)
        .where(eq(users.role, 'Admin'))
    return allUsers.length >= 1
}

const SetupAdminCheck = () => {
    const intervalId = setInterval(async () => {
        const isAdmin = await adminCheck()

        if (isAdmin) {
            console.log('Admin found. Stopping the check.')
            clearInterval(intervalId) // Stop the interval
        } else {
            const awaitUser = await db
                .select({ id: users.id })
                .from(users)
                .limit(1)
            if (awaitUser.length === 1) {
                await db
                    .update(users)
                    .set({ role: 'Admin' })
                    .where(eq(users.id, awaitUser[0].id))
            }
        }
    }, 5000) // 5000 milliseconds = 5 seconds
}

// Call the function to start checking for admins

export default SetupAdminCheck
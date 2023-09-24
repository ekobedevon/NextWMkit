import express from 'express'
import { users, invites } from '../utils/schema/authSchema'
import { drizzle } from 'drizzle-orm/postgres-js'
import { luciaClient } from '../db'
import { eq } from 'drizzle-orm'
const inviteRouter = express.Router()

const db = drizzle(luciaClient)

inviteRouter.get('/check', async (req, res) => {
    const ID = req.query.ID as string
	let done = false
    const data = await db
        .select({ id: invites.id, uses: invites.uses, max: invites.max_uses })
        .from(invites)
        .where(eq(invites.id, ID))
		
    if (data.length > 0) {
        const invite = data[0]
		console.log('HERE')
        if (
            invite.max === null ||
            invite.max === 0 ||
            invite.max >= invite.uses + 1
        ) {
			console.log('HERE')
			done = true
            res.status(200).send(true)
			
        }
    }

    
	if (!done) {
        console.log('SENDING')
        res.status(402).send(false)
    }
})

inviteRouter.post('/spoil', async (req, res) => {
    const ID = req.query.ID as string
    let done = false
    const data = await db
        .select({ id: invites.id, uses: invites.uses, max: invites.max_uses })
        .from(invites)
        .where(eq(invites.id, ID))
    if (data.length > 0) {
        console.log(data)
        const invite = data[0]
        if (invite.max === null || invite.max === 0) {
            res.status(200).send()
        } else {
            const update = invite.uses + 1
            console.log(update >= invite.max)
            if (update >= invite.max) {
                await db.delete(invites).where(eq(invites.id, ID))
                res.status(200).send()
                done = true
            } else {
                await db
                    .update(invites)
                    .set({ uses: update })
                    .where(eq(invites.id, ID))
                res.status(200).send()
                done = true
            }
        }
    }

    if (!done) {
        console.log('SENDING')
        res.status(402).send('Invalid Invite Code')
    }
})

export default inviteRouter

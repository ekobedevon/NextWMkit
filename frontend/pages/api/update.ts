import { auth } from '@/auth/lucia'
import { LuciaError } from 'lucia'

import type { NextApiRequest, NextApiResponse } from 'next'

const iconList: string[] = [
    'GiBarbarian',
    'GiBarbute',
    'GiBrutalHelm',
    'GiCowled',
    'GiCultist',
    'GiDiabloSkull',
    'GiVampireDracula',
    'Gi3DGlasses',
    'GiDragonHead',
    'GiDwarfFace',
    'GiDwarfHelmet',
    'GiDwarfKing',
    'GiElfHelmet',
    'GiExecutionerHood',
    'GiWomanElfFace',
    'GiFishMonster',
    'GiGoblinHead',
    'GiGolemHead',
    'GiKenkuHead',
    'GiMonkFace',
    'GiNunFace',
    'GiOgre',
    'GiOrcHead',
    'GiOverlordHelm',
    'GiTroll',
    'GiRestingVampire',
    'GiVisoredHelm',
    'GiWarlockHood',
    'GiWizardFace',
]

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') return res.status(405)
    const { display, password, confPass, icon } = req.body as {
        display: string
        password: string
        confPass: string
        icon: string
    }

    let updateDetails = { display: '', password: '', icon: '' }

    // basic check
    if (
        typeof display !== 'string' ||
        display.length < 1 ||
        display.length > 31
    ) {
        updateDetails.display = 'Invalid display'
    }
    if (
        typeof password !== 'string' ||
        password.length < 1 ||
        password.length > 255
    ) {
        updateDetails.password = 'Invalid password'
    }
    try {
        const authRequest = auth.handleRequest({
            req,
            res,
        })
        const session = await authRequest.validate()
        if (iconList.includes(icon)) {
            const user = await auth.updateUserAttributes(session.user.userId, {
                icon: icon,
            })
            updateDetails.icon = 'Updated'
        }
        if (display !== undefined) {
            if (
                display !== session.user.display &&
                (display.length > 1 || display.length < 31)
            ) {
                console.log('2')
                console.log(display)
                const user = await auth.updateUserAttributes(
                    session.user.userId,
                    {
                        display: display,
                    }
                )
                updateDetails.display = 'Updated'
            }
        }

        if (confPass === password) {
            const newKey = await auth.updateKeyPassword(
                'username',
                session.user.user_id.toLowerCase(),
                password
            )
            updateDetails.password = 'Updated'
        } else {
            updateDetails.password = 'Passwords Mismatch'
        }

        return res.redirect(302, '/profile') // profile page
    } catch (e: any) {
        console.log(e)
        if (
            e instanceof LuciaError &&
            (e.message === 'AUTH_INVALID_KEY_ID' ||
                e.message === 'AUTH_INVALID_PASSWORD')
        ) {
            // user does not exist
            // or invalid password
            return res.status(400).json({
                error: 'Incorrect username or password',
            })
        }
        if (e instanceof LuciaError && e.message === 'AUTH_INVALID_KEY_ID') {
            return res.status(400).json({
                error: 'Unexpected DB Error',
            })
        }
        return res.status(500).json({
            error: 'An unknown edrror occurre',
        })
    }
}

export default handler

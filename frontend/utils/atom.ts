import { atom, useAtom } from 'jotai'
import { loadable } from 'jotai/utils'
type data = {
    username: string
    icon: string
}

export const userData = atom({ username: 'Loading...', icon: 'cowled.svg' })
export const getUserData = atom(async (get) => get(userData))
export const writeAtom = atom(null, async (get, set, payload: data) => {
    set(userData, payload)
})

export const loadableAtom = loadable(getUserData)



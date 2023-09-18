/// <reference types="lucia" />
declare namespace Lucia {
    type Auth = import('./lucia').Auth
    type DatabaseUserAttributes = {
        display: string
		icon: string
		user_id:string
    }
    type DatabaseSessionAttributes = {}
}

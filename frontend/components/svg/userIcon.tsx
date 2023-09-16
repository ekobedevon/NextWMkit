import { NextPage } from 'next'

interface Props {
    Icon: string
	className?: string
}

const UserIcon: NextPage<Props> = ({ Icon,className }) => {
    return (
        <img
            src={`/UserIcons/${Icon}`}
            alt={`${Icon} user icon`}
            className={className ||  "w-auto h-8"}
        />
    )
}

export default UserIcon

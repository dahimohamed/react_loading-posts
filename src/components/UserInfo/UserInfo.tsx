import React from 'react'
import { type User } from '../../Types/users'
import './UserInfo.scss'

interface Props {
  user: User | null
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (user === null) {
    return null
  }

  return (
    <a
      className="
      text-blue-500
      hover:text-blue-700
      font-bold"

      href={`mailto:${user?.email}`}>
      {user?.name}
    </a>
  )
}

import React, { useContext } from 'react'
import { FaBell } from 'react-icons/fa'
import { AppContext } from '../../AppContext'
import './Header.scss'

export const Header: React.FC = () => {
  const { count } = useContext(AppContext)

  return (
    <header className="header">
      <a className="header__logo" href="/">
        <img src="" alt="logo"/>
      </a>

      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item nav__item--is-active relative">
            <a href="/" className="nav__link ">Posts</a>
              <span className="
                p-4
                absolute
                transform
                -translate-x-4
                -translate-y-7
                inline-block
                text-red-500"
            >
              {count}
            </span>
          </li>
          <li className="nav__item">
            <a href="/" className="nav__lin block mt-6 ml-2">
              <FaBell />
            </a>
          </li>
          <li className="nav__item">
            <a href="/" className="nav__link">
              <img src="" alt="Profile picture" className="rounded-full"/>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

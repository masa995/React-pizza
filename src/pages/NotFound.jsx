import React from 'react'
import { Link } from 'react-router-dom'

import notFound from '../assets/img/not-found.png'

function NotFound() {
  return (
    <div className="container">
      <div className="not-found">
        <h2>
          Ничего не найдено <i>😕</i>
        </h2>

        <img src={notFound} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  )
}

export default NotFound

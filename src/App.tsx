import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.scss'
import { PostList } from './components/PostList'

import { AppProvider } from './AppContext'
import { CreatingPost } from './components/CreatingPost/CreatingPost'
import { PostDetails } from './components/PostDtails/PostDetails'

export const App: React.FC = () => (
  <AppProvider>
    <section className="App">
      <h1 className="App__title">list of posts (User 1)</h1>

      <Routes>
        <Route
          path='/'
          element={
            <PostList />
          }
        />

        <Route
          path='/creatPost'
          element={
            <CreatingPost />
          }
        />

        <Route
          path='/post-details'
          element={
            <PostDetails />
          }
        />

        <Route
          path='*'
          element={<h1>Page not found</h1>}
        />
      </Routes>
    </section>
  </AppProvider>
)

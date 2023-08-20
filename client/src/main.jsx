import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import { UserProvider } from './context/UserProvider.jsx'
import { PostProvider } from './context/PostProvider.jsx'
import { CommentsProvider } from './context/CommentsProvider.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
      <UserProvider>
        <CommentsProvider>
          <PostProvider>
            <App />
          </PostProvider>
      </CommentsProvider>
      </UserProvider>
    </Router>
)

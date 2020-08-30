import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
// States
import GithubState from './context/github/GithubState'
import AlertState from './context/alert/AlertState'
// Utilities
import Navbar from './components/layouts/Navbar'
import Alert from './components/layouts/Alert'
// Small Components
import User from './components/users/User'
// Page Components
import Home from './components/pages/Home'
import About from './components/pages/About'
import Services from './components/pages/Services'
import NotFound from './components/pages/NotFound'
// Stylesheets
import './App.css'
import './fonts/css/all.css'

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar />
            <div className='container'>
              <Alert />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/services' component={Services} />
                <Route exact path='/user/:login' component={User} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  )
}

export default App

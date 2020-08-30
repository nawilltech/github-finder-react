import React, {useReducer} from 'react'
import axios from 'axios'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'

import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types'

let githubClientId, githubClientSecret

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_PROFILE_FINDER_CLIENT_ID
  githubClientSecret = process.env.REACT_APP_GITHUB_PROFILE_FINDER_CLIENT_SECRET
} else {
  githubClientId = process.env.GITHUB_PROFILE_FINDER_CLIENT_ID
  githubClientSecret = process.env.GITHUB_PROFILE_FINDER_CLIENT_SECRET
}

const GithubState = props => {
  const initialState = {
    user: {},
    users: [],
    repos: [],
    loading: false
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState)

  // Get selected Github user
  const getUser = async username => {
    setLoading()
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    )

    dispatch({
      type: GET_USER,
      payload: res.data
    })
  }

  // Search GitHub Users
  const searchUsers = async text => {
    setLoading()
    const res = await axios.get(
      `https://api.github.com/search/users?client_id=${githubClientId}&client_secret=${githubClientSecret}&q=${text}`
    )

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    })
  }

  // Get User's Repos
  const getUserRepos = async username => {
    setLoading()
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    )

    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  }

  // Clear users from state
  const clearUsers = () => dispatch({type: CLEAR_USERS})

  // Set Loading
  const setLoading = () => dispatch({type: SET_LOADING})

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  )
}

export default GithubState

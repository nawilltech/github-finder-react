import React, {useState, useContext} from 'react'
import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alertContext'

const Search = () => {
  const githubContext = useContext(GithubContext)
  const alertContext = useContext(AlertContext)

  const {users, clearUsers} = githubContext

  const [text, setText] = useState('')

  const onChange = e => {
    setText(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault()
    if (text === '') {
      alertContext.setAlert('Please enter something', 'Light')
    } else {
      githubContext.searchUsers(text)
      setText('')
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={text}
          onChange={onChange}
        />
        <h1>{text}</h1>
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {users.length > 0 && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  )
}

export default Search

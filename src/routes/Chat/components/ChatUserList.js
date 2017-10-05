import React from 'react'
import PropTypes from 'prop-types'
import CSSModule from 'react-css-modules'
import styles from './ChatUserList.module.scss'

class ChatMessages extends React.Component {
  static propTypes = {
    users: PropTypes.array.isRequired
  }

  constructor (props) {
    super(props)
  }

  render () {
    const { users } = this.props

    return (
      <div>
        <ul styleName='user-list'>
          {users.sort((a, b) => {
            return a.username > b.username
          }).map((user) => {
            const { username, isWriting } = user
            return (
              <li key={username}>
                {username}
                {isWriting && (
                  <span> is writing</span>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default CSSModule(ChatMessages, styles)

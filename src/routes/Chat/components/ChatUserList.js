import React from 'react'
import PropTypes from 'prop-types'
import CSSModule from 'react-css-modules'
import ChatUserListUser from './ChatUserListUser'
import styles from './ChatUserList.module.scss'

class ChatMessages extends React.Component {
  static propTypes = {
    users: PropTypes.array.isRequired
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
              <ChatUserListUser
                username={username}
                isWriting={isWriting || false}
              />
            )
          })}
        </ul>
      </div>
    )
  }
}

export default CSSModule(ChatMessages, styles)

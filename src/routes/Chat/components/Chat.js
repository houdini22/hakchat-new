import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import moment from 'moment'
import ChatNewMessageContainer from '../containers/ChatNewMessageContainer'
import styles from './Chat.module.scss'

export class ChatView extends React.Component {
  static propTypes = {
    chat: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
  }

  render () {
    const { chat: { users, messages } } = this.props

    const style = { height: '100%' }

    return (
      <div style={{ ...style, margin: '0 15px' }}>
        <div className={`${styles['my-col']} ${styles['my-col-1']}`}>
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
        <div className={`${styles['my-col']} ${styles['my-col-2']}`}>
          <div styleName='messages'>
            <ul>
              {messages.map((data) => {
                const { message, timestamp, user } = data
                return (
                  <li styleName='message' key={timestamp}>
                    <p>
                      <span>{moment(timestamp).format('HH:mm')}</span>
                      <span styleName='nick'>{user.username}:</span>
                      <span styleName='message-content'>
                        {message}
                      </span>
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
          <ChatNewMessageContainer />
        </div>
      </div>
    )
  }
}

export default CSSModules(ChatView, styles)

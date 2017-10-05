import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import moment from 'moment'
import { meStartWriting, sendMessage } from '../../../reducers/chat'
import styles from './Chat.module.scss'

export class ChatView extends React.Component {
  static propTypes = {
    chat: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyDown (e) {
    const { dispatch } = this.props
    const message = this.input.value.trim()

    if (e.keyCode === 13) {
      if (message) {
        dispatch(sendMessage(message))
        this.input.value = ''
      }
    } else {
      dispatch(meStartWriting())
    }
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
                  <li styleName='message'>
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
          <div styleName='message-container'>
            <input
              type='text'
              autoComplete='off'
              ref={(input) => {
                this.input = input
              }}
              onKeyDown={this.handleKeyDown}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default CSSModules(ChatView, styles)

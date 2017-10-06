import React from 'react'
import PropTypes from 'prop-types'
import CSSModule from 'react-css-modules'
import moment from 'moment'
import classNames from 'classnames'
import styles from './ChatMessage.module.scss'
import { hasMyNickInMessage } from '../../../helpers/chat'
import { USER_JOINED, USER_LEFT } from '../../../reducers/chat'

class ChatMessage extends React.Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    myNick: PropTypes.string.isRequired,
    type: PropTypes.string,
    data: PropTypes.object
  }

  renderMessageContent () {
    const { message, type, data } = this.props

    if (!type) return message

    switch (message) {
      case USER_JOINED:
        return `User ${data.username} has joined.`

      case USER_LEFT:
        return `User ${data.username} has left.`

      default:
        return 'ERROR'
    }
  }

  render () {
    const { message, timestamp, user, myNick, type } = this.props

    return (
      <li
        styleName='message'
        className={classNames({
          [styles['has-my-nick']]: hasMyNickInMessage(myNick, message),
          [styles['is-system-message']]: Boolean(type)
        })}
        key={moment(timestamp).format('HH:mm:ss.SSSS')}
      >
        <p>
          <span>{moment(timestamp).format('HH:mm')}</span>
          <span styleName='nick'>{user.username}:</span>
          <span styleName='message-content'>
            {this.renderMessageContent()}
          </span>
        </p>
      </li>
    )
  }
}

export default CSSModule(ChatMessage, styles)

import React from 'react'
import PropTypes from 'prop-types'
import CSSModule from 'react-css-modules'
import moment from 'moment'
import classNames from 'classnames'
import styles from './ChatMessage.module.scss'
import { hasMyNickInMessage } from '../../../helpers/chat'

class ChatMessages extends React.Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    myNick: PropTypes.string.isRequired,
  }

  render () {
    const { message, timestamp, user, myNick } = this.props

    return (
      <li
        styleName='message'
        className={classNames({
          [styles['has-my-nick']]: hasMyNickInMessage(myNick, message)
        })}
        key={moment(timestamp).format('HH:mm:ss.SSSS')}
      >
        <p>
          <span>{moment(timestamp).format('HH:mm')}</span>
          <span styleName='nick'>{user.username}:</span>
          <span styleName='message-content'>
            {message}
          </span>
        </p>
      </li>
    )
  }
}

export default CSSModule(ChatMessages, styles)

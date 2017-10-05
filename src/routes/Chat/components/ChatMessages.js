import React from 'react'
import PropTypes from 'prop-types'
import CSSModule from 'react-css-modules'
import moment from 'moment'
import ChatMessageContainer from '../containers/ChatMessageContainer'
import styles from './ChatMessages.module.scss'

class ChatMessages extends React.Component {
  static propTypes = {
    messages: PropTypes.array.isRequired
  }

  constructor (props) {
    super(props)
  }

  renderMessages () {
    const { messages } = this.props

    return messages.map((data) => {
      const { message, timestamp, user } = data
      return (
        <ChatMessageContainer
          key={moment(timestamp).format('HH:mm:ss.SS')}
          message={message}
          timestamp={timestamp}
          user={user}
        />
      )
    })
  }

  render () {
    return (
      <div styleName='messages'>
        <ul>
          {this.renderMessages()}
        </ul>
      </div>
    )
  }
}

export default CSSModule(ChatMessages, styles)

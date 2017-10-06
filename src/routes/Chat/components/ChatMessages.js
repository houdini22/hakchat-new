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

  componentDidUpdate () {
    this.messagesDiv.scrollTop = this.messagesDiv.scrollHeight
  }

  renderMessages () {
    const { messages } = this.props

    return messages.map((data) => {
      const { message, timestamp, user } = data
      return (
        <ChatMessageContainer
          message={message}
          timestamp={timestamp}
          user={user}
          key={moment(timestamp).format('HH:mm:ss.SSSS')}
        />
      )
    })
  }

  render () {
    return (
      <div
        styleName='messages'
        ref={(div) => {
          this.messagesDiv = div
        }}
      >
        <ul>
          {this.renderMessages()}
        </ul>
      </div>
    )
  }
}

export default CSSModule(ChatMessages, styles)

import React from 'react'
import PropTypes from 'prop-types'
import CSSModule from 'react-css-modules'
import styles from './ChatNewMessage.module.scss'

class ChatNewMessage extends React.Component {
  static propTypes = {
    sendMessage: PropTypes.func.isRequired,
    meStartWriting: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyDown (e) {
    const { sendMessage, meStartWriting } = this.props
    const message = this.input.value.trim()

    if (e.keyCode === 13) {
      if (message) {
        sendMessage(message)
        this.input.value = ''
      }
    } else {
      meStartWriting()
    }
  }

  render () {
    return (
      <div styleName='chat-new-message-container'>
        <input
          type='text'
          autoComplete='off'
          ref={(input) => {
            this.input = input
          }}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    )
  }
}

export default CSSModule(ChatNewMessage, styles)

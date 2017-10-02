import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Row, Col } from 'reactstrap'
import styles from './Chat.module.scss'

export class ChatView extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired,
    chat: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    userStartsWriting: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.startWritingTimeout = null;

    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyDown (e) {
    const { dispatch, userStartsWriting, user } = this.props
    const message = this.input.value.trim()

    if (e.keyCode === 13) {
      if (message) {
        console.log(message)
        this.input.value = ''
      }
    } else {
      clearTimeout(this.startWritingTimeout)
      this.startWritingTimeout = setTimeout(() => {
        userStartsWriting(user.user.username)
      }, 100)
    }
  }

  render () {
    const { chat: { users } } = this.props

    return (
      <div styleName='chat-container'>
        <Row className={`${styles['row']}`}>
          <Col md={3} sm={4} xs={12} className={`${styles['col']} ${styles['col-1']}`}>
            <ul>
              {users.map((user) => {
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
          </Col>
          <Col md={9} sm={8} xs={12} className={`${styles['col']} ${styles['col-2']}`}>
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
          </Col>
        </Row>
      </div>
    )
  }
}

export default CSSModules(ChatView, styles)

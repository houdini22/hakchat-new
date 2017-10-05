import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Row, Col } from 'reactstrap'
import { meStartWriting, meStopWriting } from '../../../reducers/chat'
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
        dispatch(meStopWriting())
        this.input.value = ''
      }
    } else {
      dispatch(meStartWriting())
    }
  }

  render () {
    const { chat: { users } } = this.props

    const style = { height: '100%' }

    return (
      <div style={{ ...style, margin: '0 15px' }}>
        <Row style={style}>
          <Col md={3} sm={4} xs={12} className={`${styles['my-col']} ${styles['my-col-1']}`}>
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
          </Col>
          <Col md={9} sm={8} xs={12} className={`${styles['my-col']} ${styles['my-col-2']}`}>
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

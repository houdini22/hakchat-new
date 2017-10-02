import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Row, Col } from 'reactstrap'
import styles from './Chat.module.scss'

export class ChatView extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyDown (e) {
    const message = this.input.value.trim()
    if (e.keyCode === 13) {
      if (message) {
        console.log(message)
        this.input.value = ''
      }
    }
  }

  render () {
    return (
      <div styleName='chat-container'>
        <Row className={`${styles['row']}`}>
          <Col md={3} sm={4} xs={12} className={`${styles['col']} ${styles['col-1']}`}>

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

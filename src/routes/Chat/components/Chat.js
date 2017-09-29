import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Chat.scss'

export class ChatView extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired
  }

  render () {
    return (
      <div styleName='chat'>
        Hello!
      </div>
    )
  }
}

export default CSSModules(ChatView, styles)

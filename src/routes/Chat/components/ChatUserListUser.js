import React from 'react'
import PropTypes from 'prop-types'
import CSSModule from 'react-css-modules'
import styles from './ChatUserListUser.module.scss'

class ChatMessages extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    isWriting: PropTypes.bool.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {
      hover: false
    }
  }

  render () {
    const { username, isWriting } = this.props

    return (
      <li
        key={username}
        onMouseEnter={() => {
          this.setState({ hover: true })
        }}
        onMouseLeave={() => {
          this.setState({ hover: false })
        }}
        className={this.state.hover ? styles['user-hover'] : ''}
      >
        {username}
        {isWriting && (
          <div styleName='spinner'>
            <div/>
            <div styleName='rect2'/>
            <div styleName='rect3'/>
          </div>
        )}
      </li>
    )
  }
}

export default CSSModule(ChatMessages, styles)

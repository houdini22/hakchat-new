import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Button.scss'

class Button extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool
  }

  render () {
    const { children, type, disabled } = this.props

    return (
      <button styleName='button' type={type} disabled={disabled}>
        {children}
      </button>
    )
  }
}

export default CSSModules(Button, styles)

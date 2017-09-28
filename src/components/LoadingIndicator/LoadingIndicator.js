import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './LoadingIndicator.scss'

class LoadingIndicator extends React.Component {
  render () {
    return (
      <div styleName='loading-indicator' />
    )
  }
}

export default CSSModules(LoadingIndicator, styles)

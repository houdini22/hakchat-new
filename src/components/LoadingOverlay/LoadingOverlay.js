import React from 'react'
import CSSModule from 'react-css-modules'
import styles from './LoadingOverlay.scss'

class LoadingOverlay extends React.Component {
  render () {
    return (
      <div styleName='loading-overlay-container'>
        <div styleName='spinner'>
          <div styleName='double-bounce1' />
          <div styleName='double-bounce2' />
        </div>
      </div>
    )
  }
}

export default CSSModule(LoadingOverlay, styles)

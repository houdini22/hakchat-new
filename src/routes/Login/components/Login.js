import React from 'react'
import CSSModules from 'react-css-modules'
import LoginFormContainer from '../containers/LoginFormContainer'
import styles from './Login.scss'

export class HomeView extends React.Component {
  static propTypes = {}

  render () {
    return (
      <div styleName='login'>
        <LoginFormContainer />
      </div>
    )
  }
}

export default CSSModules(HomeView, styles)

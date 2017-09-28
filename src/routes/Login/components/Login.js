import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import LoginFormContainer from '../containers/LoginFormContainer'
import styles from './Login.scss'

export class LoginView extends React.Component {
  static propTypes = {
    connect: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { connect } = this.props
    connect()
  }

  render () {
    return (
      <div styleName='login'>
        <LoginFormContainer />
      </div>
    )
  }
}

export default CSSModules(LoginView, styles)

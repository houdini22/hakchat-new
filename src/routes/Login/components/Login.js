import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Alert } from 'reactstrap'
import LoginFormContainer from '../containers/LoginFormContainer'
import { LoadingOverlay } from '../../../components'
import styles from './Login.module.scss'

export class LoginView extends React.Component {
  static propTypes = {
    connect: PropTypes.func.isRequired,
    socket: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    loginFailed: PropTypes.bool
  }

  componentDidMount () {
    const { connect } = this.props
    connect()
  }

  componentWillReceiveProps (nextProps) {
    const { user: { isLoggedIn } } = nextProps
    if (isLoggedIn) {
      this.props.router.push('/chat')
    }
  }

  render () {
    const { socket: { connected, loginInProgress, loginFailed } } = this.props

    return (
      <div styleName='login-container-outer'>
        <div styleName='login-container-inner'>
          <LoginFormContainer/>
          {loginFailed && (
            <Alert color='danger' styleName='error-message'>
              Wrong credentials!
            </Alert>
          )}
        </div>
        {(!connected || loginInProgress) && (
          <LoadingOverlay/>
        )}
      </div>
    )
  }
}

export default CSSModules(LoginView, styles)

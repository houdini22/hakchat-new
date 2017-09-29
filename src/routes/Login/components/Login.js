import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import LoginFormContainer from '../containers/LoginFormContainer'
import { LoadingOverlay } from '../../../components'
import styles from './Login.scss'

export class LoginView extends React.Component {
  static propTypes = {
    connect: PropTypes.func.isRequired,
    socket: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
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
    const { socket: { connected } } = this.props

    return (
      <div styleName='login'>
        <LoginFormContainer/>
        {!connected && (
          <LoadingOverlay/>
        )}
      </div>
    )
  }
}

export default CSSModules(LoginView, styles)

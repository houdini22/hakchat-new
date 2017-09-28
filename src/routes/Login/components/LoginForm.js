import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import CSSModules from 'react-css-modules'
import styles from './LoginForm.scss'

export class LoginForm extends React.Component {
  static propTypes = {}

  render () {
    const {handleSubmit} = this.props

    return (
      <div styleName='login'>
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name='user'
              component='input'
              type='text'
              placeholder='Username'
            />
          </div>
          <div>
            <Field
              name='password'
              component='input'
              type='password'
              placeholder='Password'
            />
          </div>
          <div>
            <button type='submit'>Log In</button>
          </div>
        </form>
      </div>
    )
  }
}

export default CSSModules(LoginForm, styles)

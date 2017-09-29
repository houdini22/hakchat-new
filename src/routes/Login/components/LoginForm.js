import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import CSSModules from 'react-css-modules'
import { TextField } from '../../../components'
import styles from './LoginForm.scss'

export class LoginForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  render () {
    const { handleSubmit } = this.props

    return (
      <div styleName='login'>
        <form onSubmit={handleSubmit}>
          <Field
            name='username'
            component={TextField}
            type='text'
            placeholder='Username'
          />
          <Field
            name='password'
            component={TextField}
            type='password'
            placeholder='Password'
          />
          <div styleName='button-container'>
            <button type='submit'>Log In</button>
          </div>
        </form>
      </div>
    )
  }
}

export default CSSModules(LoginForm, styles)

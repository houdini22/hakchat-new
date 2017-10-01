import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import CSSModules from 'react-css-modules'
import { Button } from 'react-bootstrap'
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
            <Button type='submit'>Log In</Button>
          </div>
        </form>
      </div>
    )
  }
}

export default CSSModules(LoginForm, styles)

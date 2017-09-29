import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { login } from '../../../store/socket'

const FORM_NAME = 'login-form'

const validate = (values) => {
  const requiredFields = [
    'user',
    'password'
  ]

  const errors = {}

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })

  return errors
}

const onSubmit = (values, dispatch) => {
  dispatch(login(values.user, values.password))
}

const _reduxForm = reduxForm({
  form: FORM_NAME,
  onSubmit,
  validate,
  initialValues: {
    user: '',
    password: ''
  },
})(LoginForm)

const selector = formValueSelector(FORM_NAME)

export default connect(state => {
  const { user, password } = selector(state, 'user', 'password')
  return {
    user,
    password
  }
})(_reduxForm)

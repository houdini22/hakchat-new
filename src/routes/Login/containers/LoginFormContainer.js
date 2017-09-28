import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
// import { updateCurrentItem, initialValues } from '../../../store/rectangles'

const FORM_NAME = 'login-form'

/*
const validate = (values) => {
  const requiredFields = [
    'backgroundColor',
    'size',
    'borderRadius'
  ]

  const errors = {}

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })

  console.log(values)

  return errors
}
 */

const onSubmit = (values, dispatch) => {
  console.log(values)
}

const _reduxForm = reduxForm({
  form: FORM_NAME,
  onSubmit,
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

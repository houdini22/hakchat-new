import React from 'react'
import PropTypes from 'prop-types'
import CSSModule from 'react-css-modules'
import { FormGroup, FormControl, HelpBlock } from 'react-bootstrap'
import classNames from 'classnames'
import styles from './TextField.module.less'

class TextField extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object
  }

  render () {
    const { input, label, meta: { touched, error }, ...custom } = this.props

    let validationState = null
    if (touched) {
      validationState = !error ? 'success' : 'error'
    }

    return (
      <FormGroup validationState={validationState}>
        <FormControl {...input} {...custom} autoComplete='off'/>
        {!!error && touched && (
          <HelpBlock>{error}</HelpBlock>
        )}
      </FormGroup>
    )
  }
}

export default CSSModule(TextField, styles)

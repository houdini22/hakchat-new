import React from 'react'
import PropTypes from 'prop-types'
import CSSModule from 'react-css-modules'
import classNames from 'classnames'
import styles from './TextField.scss'

class TextField extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object
  }

  render () {
    const { input, label, meta: { touched, error }, ...custom } = this.props
    const classes = {
      [styles.field]: true,
      [styles['has-error']]: !!error && touched
    }

    return (
      <div className={classNames(classes)}>
        <input {...input} {...custom} styleName='input' autoComplete='off' />
        {!!error && touched && (
          <p styleName='error-message'>{error}</p>
        )}
      </div>
    )
  }
}

export default CSSModule(TextField, styles)

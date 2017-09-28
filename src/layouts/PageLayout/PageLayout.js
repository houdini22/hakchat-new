import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './PageLayout.scss'

class PageLayout extends React.Component {
  render () {
    const { children } = this.props

    return (
      <div styleName='layout'>
        {children}
      </div>
    )
  }
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default CSSModules(PageLayout, styles)

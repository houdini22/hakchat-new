import { connect } from 'react-redux'
import Home from '../components/Login'

const mapDispatchToProps = {}

const mapStateToProps = (state) => ({
  ...(state.user)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

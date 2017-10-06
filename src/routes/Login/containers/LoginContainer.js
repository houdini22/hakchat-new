import { connect } from 'react-redux'
import Login from '../components/Login'
import { actions } from '../../../reducers/socket'

const mapDispatchToProps = {
  connect: actions.connect
}

const mapStateToProps = (state) => ({
  auth: { ...(state.auth) },
  socket: { ...(state.socket) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)

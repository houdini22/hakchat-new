import { connect } from 'react-redux'
import Login from '../components/Login'
import { actions } from '../../../reducers/socket'

const mapDispatchToProps = {
  connect: actions.connect
}

const mapStateToProps = (state) => ({
  user: { ...(state.user) },
  socket: { ...(state.socket) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)

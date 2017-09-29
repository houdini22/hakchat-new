import { connect } from 'react-redux'
import Home from '../components/Login'
import { actions } from '../../../store/socket'

const mapDispatchToProps = {
  connect: actions.connect
}

const mapStateToProps = (state) => ({
  user: { ...(state.user) },
  socket: { ...(state.socket) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

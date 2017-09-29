import { connect } from 'react-redux'
import Chat from '../components/Chat'
import { actions } from '../../../store/socket'

const mapDispatchToProps = {}

const mapStateToProps = (state) => ({
  user: { ...(state.user) },
  socket: { ...(state.socket) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat)

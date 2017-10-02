import { connect } from 'react-redux'
import Chat from '../components/Chat'
import { actions } from '../../../reducers/chat'

const mapDispatchToProps = {
  userStartsWriting: actions.userStartsWriting
}

const mapStateToProps = (state) => ({
  user: { ...(state.user) },
  socket: { ...(state.socket) },
  chat : { ...(state.chat) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat)

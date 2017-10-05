import { connect } from 'react-redux'
import Chat from '../components/Chat'

const mapDispatchToProps = {}

const mapStateToProps = (state) => ({
  chat: { ...(state.chat) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat)

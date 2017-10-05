import { connect } from 'react-redux'
import ChatMessages from '../components/ChatMessages'

const mapDispatchToProps = dispatch => {
  return {}
}

const mapStateToProps = (state) => {
  return {
    messages: state.chat.messages
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessages)

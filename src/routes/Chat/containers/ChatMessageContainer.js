import { connect } from 'react-redux'
import ChatMessage from '../components/ChatMessage'

const mapDispatchToProps = dispatch => {
  return {}
}

const mapStateToProps = (state) => {
  return {
    myNick: state.auth.user.username
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessage)

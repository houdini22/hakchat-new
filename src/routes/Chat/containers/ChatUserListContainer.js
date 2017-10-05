import { connect } from 'react-redux'
import ChatUserList from '../components/ChatUserList'

const mapDispatchToProps = dispatch => {
  return {}
}

const mapStateToProps = (state) => {
  return {
    users: state.chat.users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatUserList)

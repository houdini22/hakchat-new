import { connect } from 'react-redux'
import ChatNewMessage from '../components/ChatNewMessage'
import { meStartWriting, sendMessage } from '../../../reducers/chat'

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: message => {
      dispatch(sendMessage(message))
    },
    meStartWriting: () => {
      dispatch(meStartWriting())
    }
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatNewMessage)

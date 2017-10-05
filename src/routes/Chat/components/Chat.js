import React from 'react'
import CSSModules from 'react-css-modules'
import ChatNewMessageContainer from '../containers/ChatNewMessageContainer'
import ChatMessagesContainer from '../containers/ChatMessagesContainer'
import ChatUserListContainer from '../containers/ChatUserListContainer'
import styles from './Chat.module.scss'

export class ChatView extends React.Component {
  render () {
    const style = { height: '100%' }

    return (
      <div style={{ ...style, margin: '0 15px' }}>
        <div className={`${styles['my-col']} ${styles['my-col-1']}`}>
          <ChatUserListContainer/>
        </div>
        <div className={`${styles['my-col']} ${styles['my-col-2']}`}>
          <ChatMessagesContainer/>
          <ChatNewMessageContainer/>
        </div>
      </div>
    )
  }
}

export default CSSModules(ChatView, styles)

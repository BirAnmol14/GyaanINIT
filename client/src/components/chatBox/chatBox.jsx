import React from 'react';
import chatCss from './chatBox.css';
function ChatBox(props){
  return(
    <div>
      {props.allChats?"To show all chats of "+props.of+" and to load message dialogue box on click":"Show message box for conversation between " + props.from + ' and '+props.to}
    </div>
  );
}
export default ChatBox;

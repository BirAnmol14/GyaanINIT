import React from 'react';
import chatBoxCSS from './chatBox.css';
function ChatBox(props){
  const [hide,setHide]=React.useState(true);
  const [activeChat,setActiveChat]=React.useState(null);
  function activeChatClick(event){
    if(activeChat){
      if(activeChat!==event.target.id){
        setActiveChat(event.target.id);
      }
    }else{
      setActiveChat(event.target.id);
    }
  }
  React.useEffect(()=>{
    if(activeChat){
      setHide(false);
    }
  },[activeChat]);
  return(
    <div>
      {props.allChats?"To show all chats of "+props.of+" and to load message dialogue box on click":"Show message box for conversation between " + props.from + ' and '+props.to}
      <br/>
      {props.allChats?  <div id="container">
  	<aside>
  		<div className="chatHeader">
  			<input type="text" placeholder="search"/>
  		</div>
  		<ul>
      <li id="topic 1 id" className={activeChat&&activeChat==="topic 1 id"?"chatActive":null} onClick={activeChatClick}>
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
        <div>
          <h2>Prénom Nom</h2>
          <h3>
            <span class="status orange"></span>
            Topic Name 1
          </h3>
        </div>
      </li>
      <li id="topic 2 id" className={activeChat&&activeChat==="topic 2 id"?"chatActive":null} onClick={activeChatClick}>
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_02.jpg" alt=""/>
        <div>
          <h2>ABC Nom</h2>
          <h3>
            <span class="status green"></span>
            Topic Name 2
          </h3>
        </div>
      </li>
  			<li>
  				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_03.jpg" alt=""/>
  				<div>
  					<h2>Prénom Nom</h2>
  					<h3>
  						<span class="status orange"></span>
  						offline
  					</h3>
  				</div>
  			</li>
  			<li>
  				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_04.jpg" alt=""/>
  				<div>
  					<h2>Prénom Nom</h2>
  					<h3>
  						<span class="status green"></span>
  						online
  					</h3>
  				</div>
  			</li>
  			<li>
  				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_05.jpg" alt=""/>
  				<div>
  					<h2>Prénom Nom</h2>
  					<h3>
  						<span class="status orange"></span>
  						offline
  					</h3>
  				</div>
  			</li>
  			<li>
  				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_06.jpg" alt=""/>
  				<div>
  					<h2>Prénom Nom</h2>
  					<h3>
  						<span class="status green"></span>
  						online
  					</h3>
  				</div>
  			</li>
  			<li>
  				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_07.jpg" alt=""/>
  				<div>
  					<h2>Prénom Nom</h2>
  					<h3>
  						<span class="status green"></span>
  						online
  					</h3>
  				</div>
  			</li>
  			<li>
  				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_08.jpg" alt=""/>
  				<div>
  					<h2>Prénom Nom</h2>
  					<h3>
  						<span class="status green"></span>
  						online
  					</h3>
  				</div>
  			</li>
  			<li>
  				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_09.jpg" alt=""/>
  				<div>
  					<h2>Prénom Nom</h2>
  					<h3>
  						<span class="status green"></span>
  						online
  					</h3>
  				</div>
  			</li>
  			<li>
  				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_10.jpg" alt=""/>
  				<div>
  					<h2>Prénom Nom</h2>
  					<h3>
  						<span class="status orange"></span>
  						offline
  					</h3>
  				</div>
  			</li>
  		</ul>
  	</aside>
    {
      !hide?<main>
    		<div className="chatHeader">
    			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
    			<div>
    				<h2>Chat with Vincent Porter</h2>
            <h3>Name of topic with id: {activeChat}</h3>
    				<h3>already 1902 messages</h3>
    			</div>
    			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_star.png" alt=""/>
    		</div>
    		<ul id="chat">
    			<li class="you">
    				<div class="entete">
    					<span class="status green"></span>
    					<h2>Vincent</h2>
    					<h3>10:12AM, Today</h3>
    				</div>
    				<div class="triangle"></div>
    				<div class="message">
    					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
    				</div>
    			</li>
    			<li class="me">
    				<div class="entete">
    					<h3>10:12AM, Today</h3>
    					<h2>Vincent</h2>
    					<span class="status blue"></span>
    				</div>
    				<div class="triangle"></div>
    				<div class="message">
    					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
    				</div>
    			</li>
    			<li class="me">
    				<div class="entete">
    					<h3>10:12AM, Today</h3>
    					<h2>Vincent</h2>
    					<span class="status blue"></span>
    				</div>
    				<div class="triangle"></div>
    				<div class="message">
    					OK
    				</div>
    			</li>
    			<li class="you">
    				<div class="entete">
    					<span class="status green"></span>
    					<h2>Vincent</h2>
    					<h3>10:12AM, Today</h3>
    				</div>
    				<div class="triangle"></div>
    				<div class="message">
    					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
    				</div>
    			</li>
    			<li class="me">
    				<div class="entete">
    					<h3>10:12AM, Today</h3>
    					<h2>Vincent</h2>
    					<span class="status blue"></span>
    				</div>
    				<div class="triangle"></div>
    				<div class="message">
    					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
    				</div>
    			</li>
    			<li class="me">
    				<div class="entete">
    					<h3>10:12AM, Today</h3>
    					<h2>Vincent</h2>
    					<span class="status blue"></span>
    				</div>
    				<div class="triangle"></div>
    				<div class="message">
    					OK
    				</div>
    			</li>
    		</ul>
    		<footer>
    			<textarea placeholder="Type your message"></textarea>
    			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_picture.png" alt=""/>
    			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_file.png" alt=""/>
    			<a href="#">Send</a>
    		</footer>
    	</main>:<main><div style={{marginTop:"250px",marginLeft:"50px"}}>"Select a Chat Please"</div></main>
    }

  </div>:null}
    {
      !props.allChats?  <div id="container">
  	<aside>
  		<div className="chatHeader">
  			<input type="text" placeholder="search"/>
  		</div>
  		<ul>
  			<li id="topic 1 id" className={activeChat&&activeChat==="topic 1 id"?"chatActive":null} onClick={activeChatClick}>
  				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
  				<div>
  					<h2>Prénom Nom</h2>
  					<h3>
  						<span class="status orange"></span>
  						Topic Name 1
  					</h3>
  				</div>
  			</li>
  			<li id="topic 2 id" className={activeChat&&activeChat==="topic 2 id"?"chatActive":null} onClick={activeChatClick}>
  				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
  				<div>
  					<h2>Prénom Nom</h2>
  					<h3>
  						<span class="status green"></span>
  						Topic Name 2
  					</h3>
  				</div>
  			</li>
        <li>
  				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
  				<div>
  					<h2>Prénom Nom</h2>
  					<h3>
  						<span class="status green"></span>
  						Topic Name 2
  					</h3>
  				</div>
  			</li>
        <li>
  				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
  				<div>
  					<h2>Prénom Nom</h2>
  					<h3>
  						<span class="status green"></span>
  						Topic Name 2
  					</h3>
  				</div>
  			</li>
        <li>
  				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
  				<div>
  					<h2>Prénom Nom</h2>
  					<h3>
  						<span class="status green"></span>
  						Topic Name 2
  					</h3>
  				</div>
  			</li>
        <li>
  				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
  				<div>
  					<h2>Prénom Nom</h2>
  					<h3>
  						<span class="status orange"></span>
  						Topic Name 2
  					</h3>
  				</div>
  			</li>
        <li>
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
          <div>
            <h2>Prénom Nom</h2>
            <h3>
              <span class="status green"></span>
              Topic Name 2
            </h3>
          </div>
        </li>
        <li>
  				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
  				<div>
  					<h2>Prénom Nom</h2>
  					<h3>
  						<span class="status green"></span>
  						Topic Name 2
  					</h3>
  				</div>
  			</li>
        <li>
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
          <div>
            <h2>Prénom Nom</h2>
            <h3>
              <span class="status green"></span>
              Topic Name 2
            </h3>
          </div>
        </li>
        <li>
  				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
  				<div>
  					<h2>Prénom Nom</h2>
  					<h3>
  						<span class="status green"></span>
  						Topic Name 2
  					</h3>
  				</div>
  			</li>
  		</ul>
  	</aside>

    {!hide?  <main>
    		<div className="chatHeader">
    			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
    			<div>
    				<h2>Chat with Vincent Porter</h2>
            <h3>Name of topic with id: {activeChat}</h3>
    				<h3>already 1902 messages</h3>
    			</div>
    			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_star.png" alt=""/>
    		</div>
    		<ul id="chat">
    			<li class="you">
    				<div class="entete">
    					<span class="status green"></span>
    					<h2>Vincent</h2>
    					<h3>10:12AM, Today</h3>
    				</div>
    				<div class="triangle"></div>
    				<div class="message">
    					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
    				</div>
    			</li>
    			<li class="me">
    				<div class="entete">
    					<h3>10:12AM, Today</h3>
    					<h2>Vincent</h2>
    					<span class="status blue"></span>
    				</div>
    				<div class="triangle"></div>
    				<div class="message">
    					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
    				</div>
    			</li>
    			<li class="me">
    				<div class="entete">
    					<h3>10:12AM, Today</h3>
    					<h2>Vincent</h2>
    					<span class="status blue"></span>
    				</div>
    				<div class="triangle"></div>
    				<div class="message">
    					OK
    				</div>
    			</li>
    			<li class="you">
    				<div class="entete">
    					<span class="status green"></span>
    					<h2>Vincent</h2>
    					<h3>10:12AM, Today</h3>
    				</div>
    				<div class="triangle"></div>
    				<div class="message">
    					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
    				</div>
    			</li>
    			<li class="me">
    				<div class="entete">
    					<h3>10:12AM, Today</h3>
    					<h2>Vincent</h2>
    					<span class="status blue"></span>
    				</div>
    				<div class="triangle"></div>
    				<div class="message">
    					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
    				</div>
    			</li>
    			<li class="me">
    				<div class="entete">
    					<h3>10:12AM, Today</h3>
    					<h2>Vincent</h2>
    					<span class="status blue"></span>
    				</div>
    				<div class="triangle"></div>
    				<div class="message">
    					OK
    				</div>
    			</li>
    		</ul>
    		<footer>
    			<textarea placeholder="Type your message"></textarea>
    			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_picture.png" alt=""/>
    			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_file.png" alt=""/>
    			<a href="#">Send</a>
    		</footer>
    	</main>:<main><div style={{marginTop:"250px",marginLeft:"50px"}}>"Select a Chat Please"</div></main>}

  </div>:null
    }
    </div>
  );
}
export default ChatBox;

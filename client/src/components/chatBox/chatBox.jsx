import React from 'react';
import './chatBox.css';
import ReactHtmlParser from 'react-html-parser';
import ServerRoutes from '../ServerRoutes.js';
var parse = require('html-react-parser');

function ChatBox(props){
  const [hide,setHide]=React.useState(true);
  const [activeChat,setActiveChat]=React.useState(null);
  const [sentTopicsPrivate,setSentTopicPrivate]=React.useState(null);
  const [recvdTopicsPrivate,setRecvdTopicPrivate]=React.useState(null);
  const [postsPrivate,setPostsPrivate]=React.useState(null);
  async function activeChatClick(event){
    if(activeChat){
      if(activeChat!==event.target.id){
        setPostsPrivate(null);
        setActiveChat(event.target.id);
      }
    }else{
      setActiveChat(event.target.id);
	}

  }
  async function getMessages(id,slug){
    if(!id){
      return
    }
	const loc=window.location.pathname.split('/');
	if(loc.length!==3||loc[loc.length-1].length<0){
	  window.location.href='/';
	}
	const url=ServerRoutes.getPosts+'t/'+slug+"/"+id;
	const res=await fetch(url,{
	method: 'GET',
	credentials: 'include'
	});
	if(await res.status===200){
	  const result=await res.json();
	  if(result.status){

		setPostsPrivate(result.body);
	   //console.log(result.body);   //Posts by slug and id(page 1) only of  Messages
	  }
	}else{
	  alert('Error '+await res.status);
	  window.location.href='/';
	}
}
  async function getPrivateMessages(){
    const loc=window.location.pathname.split('/');
    if(loc.length!==3||loc[loc.length-1].length<0){
      window.location.href='/';
    }
    var id= props.allChats?props.of:props.from;
    var url=ServerRoutes.getPosts+'topics/private-messages-sent/';
    url+=id;
    const res=await fetch(url,{
    method: 'GET',
    credentials: 'include'
    });
    if(await res.status===200){
      const result=await res.json();
      if(result.status){

        setSentTopicPrivate(result.body.topic_list.topics);
       // console.log(result.body.topic_list.topics);   //Sent Topics of Private Messages
      }
    }else{
      alert('Error '+await res.status);
      window.location.href='/';
    }

    var url2=ServerRoutes.getPosts+'topics/private-messages/';		//Repalce with props.of/props.from depending on props.allChats, b123 for testing

    url2= url2+id;
   // console.log("received");
    const res2=await fetch(url2,{
    method: 'GET',
    credentials: 'include'
    });
    if(await res2.status===200){
      const result2=await res2.json();
      if(result2.status){
        setRecvdTopicPrivate(result2.body.topic_list.topics);
    //   console.log(result2.body.topic_list.topics);   //Received Topics of Private Messages
      }
    }else{
      alert('Error '+await res2.status);
      //window.location.href='/';
    }
  }
  React.useEffect(()=>{
    async function runner(){
      await getPrivateMessages();
    }
    runner();
  },[]);
  React.useEffect(()=>{
    if(activeChat){
      getMessages(activeChat,null);
      setHide(false);
    }else{
      setHide(true);
    }
  },[activeChat]);
  return(
    <div>

      {props.allChats?"To show all chats of "+props.of+" and to load message dialogue box on click":"Show message box for conversation between " + props.from + ' and '+props.to}
      {
        //if props.allchats then you have props.of => load all chats for this user
      }
      {
        //if not props.allchats then you have props.from(your id) props.to (receipient id)=> load all chats between these 2 users
      }
      {
        props.allChats?  <div id="container">
  	<aside>
  		<div className="chatHeader">
  			<input type="text" placeholder="search"/>
  		</div>
  		<ul>
      {recvdTopicsPrivate?recvdTopicsPrivate.map((topic)=>{return (<li key={topic.id} id={topic.id} slug={topic.slug} className={activeChat&&activeChat===topic.id.toString()?"chatActive":null} onClick={activeChatClick}>
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
        <div>
	  <h2>{topic.last_poster_username}</h2>
          <h3>
            <span className="status orange"></span>
            {topic.fancy_title}
          </h3>
        </div>
      </li>);}):null}

  		</ul>
  	</aside>
    {
      postsPrivate&&!hide?<main>
    		<div className="chatHeader">
    			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
    			<div>
    				<h2>{postsPrivate.fancy_title}</h2>
            <h3>Id: {activeChat}</h3>
    				<h3>already {postsPrivate.posts_count} messages</h3>
    			</div>
    			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_star.png" alt=""/>
    		</div>
    		<ul id="chat">
    			{postsPrivate.post_stream.posts.map((post)=>{return(<li key={post.id} className={props.allChats?post.username===props.of?"me":"you":post.username===props.from?"me":"you"}>
    				<div className="entete">
    					<span className="status green"></span>
    					<h2 style={{marginRight:'5px'}}>{post.username}</h2>
    					<h3>{new Date(post.created_at).toLocaleString()}</h3>
    				</div>
    				<div className="triangle"></div>
    				<div className="message">
					{parse(post.cooked)}
    				</div>
	</li>);})
	}

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
  						<span className="status orange"></span>
  						Topic Name 1
  					</h3>
  				</div>
  			</li>
  			<li id="topic 2 id" className={activeChat&&activeChat==="topic 2 id"?"chatActive":null} onClick={activeChatClick}>
  				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
  				<div>
  					<h2>Prénom Nom</h2>
  					<h3>
  						<span className="status green"></span>
  						Topic Name 2
  					</h3>
  				</div>
  			</li>
        <li>
  				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
  				<div>
  					<h2>Prénom Nom</h2>
  					<h3>
  						<span className="status green"></span>
  						Topic Name 2
  					</h3>
  				</div>
  			</li>
        <li>
  				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
  				<div>
  					<h2>Prénom Nom</h2>
  					<h3>
  						<span className="status green"></span>
  						Topic Name 2
  					</h3>
  				</div>
  			</li>
        <li>
  				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
  				<div>
  					<h2>Prénom Nom</h2>
  					<h3>
  						<span className="status green"></span>
  						Topic Name 2
  					</h3>
  				</div>
  			</li>
        <li>
  				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
  				<div>
  					<h2>Prénom Nom</h2>
  					<h3>
  						<span className="status orange"></span>
  						Topic Name 2
  					</h3>
  				</div>
  			</li>
        <li>
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
          <div>
            <h2>Prénom Nom</h2>
            <h3>
              <span className="status green"></span>
              Topic Name 2
            </h3>
          </div>
        </li>
        <li>
  				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
  				<div>
  					<h2>Prénom Nom</h2>
  					<h3>
  						<span className="status green"></span>
  						Topic Name 2
  					</h3>
  				</div>
  			</li>
        <li>
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
          <div>
            <h2>Prénom Nom</h2>
            <h3>
              <span className="status green"></span>
              Topic Name 2
            </h3>
          </div>
        </li>
        <li>
  				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
  				<div>
  					<h2>Prénom Nom</h2>
  					<h3>
  						<span className="status green"></span>
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
    			<li className="you">
    				<div className="entete">
    					<span className="status green"></span>
    					<h2>Vincent</h2>
    					<h3>10:12AM, Today</h3>
    				</div>
    				<div className="triangle"></div>
    				<div className="message">
    					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
    				</div>
    			</li>
    			<li className="me">
    				<div className="entete">
    					<h3>10:12AM, Today</h3>
    					<h2>Vincent</h2>
    					<span className="status blue"></span>
    				</div>
    				<div className="triangle"></div>
    				<div className="message">
    					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
    				</div>
    			</li>
    			<li className="me">
    				<div className="entete">
    					<h3>10:12AM, Today</h3>
    					<h2>Vincent</h2>
    					<span className="status blue"></span>
    				</div>
    				<div className="triangle"></div>
    				<div className="message">
    					OK
    				</div>
    			</li>
    			<li className="you">
    				<div className="entete">
    					<span className="status green"></span>
    					<h2>Vincent</h2>
    					<h3>10:12AM, Today</h3>
    				</div>
    				<div className="triangle"></div>
    				<div className="message">
    					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
    				</div>
    			</li>
    			<li className="me">
    				<div className="entete">
    					<h3>10:12AM, Today</h3>
    					<h2>Vincent</h2>
    					<span className="status blue"></span>
    				</div>
    				<div className="triangle"></div>
    				<div className="message">
    					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
    				</div>
    			</li>
    			<li className="me">
    				<div className="entete">
    					<h3>10:12AM, Today</h3>
    					<h2>Vincent</h2>
    					<span className="status blue"></span>
    				</div>
    				<div className="triangle"></div>
    				<div className="message">
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

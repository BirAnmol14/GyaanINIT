import React from 'react';
import './chatBox.css';
import ServerRoutes from '../ServerRoutes.js';
import SendIcon from '@material-ui/icons/Send';
var parse = require('html-react-parser');

function ChatBox(props) {
	const [hide, setHide] = React.useState(true);
	const [activeChat, setActiveChat] = React.useState(null);
	const [sentTopicsPrivate, setSentTopicPrivate] = React.useState(null);
	const [usersMessaged, setUsersMessaged] = React.useState(null);
	const [recvdTopicsPrivate, setRecvdTopicPrivate] = React.useState(null);
	const [postsPrivate, setPostsPrivate] = React.useState(null);
	const [text,setText]=React.useState("");
	async function activeChatClick(event) {
		if (activeChat) {
			if (activeChat !== event.target.id) {
				setPostsPrivate(null);
				setActiveChat(event.target.id);
			}
		} else {
			setActiveChat(event.target.id);
		}

	}
	async function getMessages(id, slug) {
		if (!id) {
			return
		}
		const loc = window.location.pathname.split('/');
		if (loc.length !== 3 || loc[loc.length - 1].length < 0) {
			window.location.href = '/';
		}
		const url = ServerRoutes.getPosts + 't/' + slug + "/" + id;
		const res = await fetch(url, {
			method: 'GET',
			credentials: 'include'
		});
		if (await res.status === 200) {
			const result = await res.json();
			if (result.status) {

				setPostsPrivate(result.body);
				//console.log(result.body);   //Posts by slug and id(page 1) only of  Messages
			}
		} else {
			alert('Error ' + await res.status);
			window.location.href = '/';
		}
	}
	async function getPrivateMessages() {
		const loc = window.location.pathname.split('/');
		if (loc.length !== 3 || loc[loc.length - 1].length < 0) {
			window.location.href = '/';
		}
		var id = props.allChats ? props.of : props.from;
		var url = ServerRoutes.getPosts + 'topics/private-messages-sent/';
		url += id;
		const res = await fetch(url, {
			method: 'GET',
			credentials: 'include'
		});
		if (await res.status === 200) {
			const result = await res.json();
			if (result.status) {

				setSentTopicPrivate(result.body.topic_list.topics);
				//console.log(result.body.topic_list.topics);   //Sent Topics of Private Messages
			}
		} else {
			alert('Error ' + await res.status);
			window.location.href = '/';
		}

		var url2 = ServerRoutes.getPosts + 'topics/private-messages/';		//Repalce with props.of/props.from depending on props.allChats, b123 for testing

		url2 = url2 + id;
		// console.log("received");
		const res2 = await fetch(url2, {
			method: 'GET',
			credentials: 'include'
		});
		if (await res2.status === 200) {
			const result2 = await res2.json();
			if (result2.status) {
				setRecvdTopicPrivate(result2.body.topic_list.topics);
				setUsersMessaged(result2.body.users)	//List of all Users
				//console.log(result2.body.users);
				 //Received Topics of Private Messages
				 if(!props.allChats){
					 setRecvdTopicPrivate([]);
					let u_id = result2.body.users.find(o => o.username === props.to);
					if(u_id){
					//console.log(u_id.id);
					let relevantChats=result2.body.topic_list.topics.filter(o=>o.participants.find(k=>k.user_id===u_id.id));
				//	console.log(relevantChats);
					setRecvdTopicPrivate(relevantChats);
					}

				 }
			}
		} else {
			alert('Error ' + await res2.status);
			//window.location.href='/';
		}
	}
	async function sendMessage(){
		if(text.length<10){
			alert('Message too short'); return;
		}
		var find=-1;
		for(var i=0;i<postsPrivate.details.allowed_users.length;i++){
			if(props.of&&postsPrivate.details.allowed_users[i].username!==props.of){
				find=i;break;
			}else if(props.from&&postsPrivate.details.allowed_users[i].username!==props.from){
				find=i;break;
			}
		}
		const body=JSON.stringify({topicId:Number(activeChat),message:text,otherUser:postsPrivate.details.allowed_users[find].username});
    const response=await fetch(ServerRoutes.makePrivatePost,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: body
    });
    const status=await response.status;
    if(status===200){
      const res=await response.json();
      if(res.status===true){
        alert(res.message);
      }else{
        alert(res.message);
      }
    }else{
      alert('Error '+status);
    }
		await getMessages(activeChat,null);
		setText('');
	}
	React.useEffect(() => {
		async function runner() {
			await getPrivateMessages();
		}
		runner();
	}, []);
	React.useEffect(() => {
		if (activeChat) {
			getMessages(activeChat, null);
			setHide(false);
		} else {
			setHide(true);
		}
	}, [activeChat]);
	React.useEffect(()=>{
		if(postsPrivate){
			var elem=document.getElementById('chat');
			if(elem){
				elem.scrollTop=elem.scrollHeight;
			}
		}
	},[postsPrivate]);
	return (
		<div className="dataCont">

			{props.allChats ? "Showing all chats of " + props.of : "Showing messages between " + props.from + ' and ' + props.to}
			{
				//if props.allchats then you have props.of => load all chats for this user
			}
			{
				//if not props.allchats then you have props.from(your id) props.to (receipient id)=> load all chats between these 2 users
			}
			{
				props.allChats ? <div id="container">
					<aside style={activeChat?{display:'none'}:{display:'block'}}>
						<div className="chatHeader">
							<input type="text" placeholder="search" />
						</div>
						<ul style={{overflowY:"scroll"}}>
							{recvdTopicsPrivate ? recvdTopicsPrivate.map((topic) => {
								return (<li key={topic.id} id={topic.id} slug={topic.slug} className={activeChat && activeChat === topic.id.toString() ? "chatActive" : null} onClick={activeChatClick}>
									<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
									<div style={{pointerEvents:'none'}}>
										<h2>{topic.fancy_title}</h2>
										<h3>
											<span className="status orange"></span>
											{topic.last_poster_username}
										</h3>
									</div>
								</li>);
							}) : null}

						</ul>
					</aside >
					{
						postsPrivate && !hide ? <main style={activeChat?{display:'block'}:{display:'none'}}>
							<div className="chatHeader">
								<img src="https://static.thenounproject.com/png/2916775-200.png" className="backImg" alt="" onClick={()=>{setPostsPrivate(null);setActiveChat(null)}}/>
								<div>
									<h2>{postsPrivate.fancy_title}</h2>
									<button type="button" class="btn btn-secondary btn-sm" data-toggle="tooltip" data-placement="right" title={
										postsPrivate.details.allowed_users.map((user,index)=>{return(user.name)})
									}>
									Participants
								</button>
									<h3>already {postsPrivate.posts_count} messages</h3>
								</div>
								<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_star.png" alt="" />
							</div>
							<ul id="chat">
								{postsPrivate.post_stream.posts.map((post) => {
									return (<li key={post.id} className={props.allChats ? post.username === props.of ? "me" : "you" : post.username === props.from ? "me" : "you"}>
										<div className="entete">
											<span className="status green"></span>
											<h2 style={{ marginRight: '5px' }}>{post.username}</h2>
											<h3>{new Date(post.created_at).toLocaleString()}</h3>
										</div>
										<div className="triangle"></div>
										<div className="message">
											{parse(post.cooked)}
										</div>
									</li>);
								})
								}

							</ul>
							<footer>
								<textarea placeholder="Type your message" value={text} onChange={(eve)=>{setText(eve.target.value)}}></textarea>
								<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_picture.png" alt="" />
								<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_file.png" alt="" />
								<button className="btn btn-primary" style={{marginBottom:"2px"}} onClick={sendMessage}><SendIcon style={{ display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/> Send</button>
							</footer>
						</main> : <main><div style={{ marginTop: "250px", marginLeft: "50px" }}>"Select a Chat Please"</div></main>
					}

				</div> : null}
			{
				!props.allChats ? <div id="container">
					<aside style={activeChat?{display:'none'}:{display:'block'}}>
						<div className="chatHeader">
							<input type="text" placeholder="search" />
						</div>
						<ul style={{overflowY:"scroll"}}>
							{recvdTopicsPrivate ? recvdTopicsPrivate.map((topic) => {
								return (<li key={topic.id} id={topic.id} slug={topic.slug} className={activeChat && activeChat === topic.id.toString() ? "chatActive" : null} onClick={activeChatClick}>
									<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt="" />
									<div style={{pointerEvents:'none'}}>
										<h2>{topic.fancy_title}</h2>
										<h3>
											<span className="status orange"></span>
											{topic.last_poster_username}
										</h3>
									</div>
								</li>);
							}) : null}

						</ul>
					</aside>

					{postsPrivate && !hide ? <main style={activeChat?{display:'block'}:{display:'none'}}>
						<div className="chatHeader">
							<img src="https://static.thenounproject.com/png/2916775-200.png" alt="" className="backImg" onClick={()=>{setPostsPrivate(null);setActiveChat(null)}}/>
							<div>
								<h2>{postsPrivate.fancy_title}</h2>
								<button type="button" class="btn btn-secondary btn-sm" data-toggle="tooltip" data-placement="right" title={
									postsPrivate.details.allowed_users.map((user,index)=>{return(user.name)})
								}>
								  Participants
								</button>
								<h3>already {postsPrivate.posts_count} messages</h3>
							</div>
							<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_star.png" alt="" />
						</div>
						<ul id="chat">
							{postsPrivate.post_stream.posts.map((post) => {
								return (<li key={post.id} className={props.allChats ? post.username === props.of ? "me" : "you" : post.username === props.from ? "me" : "you"}>
									<div className="entete">
										<span className="status green"></span>
										<h2 style={{ marginRight: '5px' }}>{post.username}</h2>
										<h3>{new Date(post.created_at).toLocaleString()}</h3>
									</div>
									<div className="triangle"></div>
									<div className="message">
										{parse(post.cooked)}
									</div>
								</li>);
							})
							}
						</ul>
						<footer>
							<textarea placeholder="Type your message" value={text} onChange={(eve)=>{setText(eve.target.value)}}></textarea>
							<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_picture.png" alt="" />
							<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_file.png" alt="" />
							<button className="btn btn-primary" style={{marginBottom:"2px"}} onClick={sendMessage}><SendIcon style={{ display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/> Send</button>
						</footer>
					</main> : <main><div style={{ marginTop: "250px", marginLeft: "50px" }}>"Select a Chat Please"</div></main>}

				</div> : null
			}
		</div>
	);
}
export default ChatBox;

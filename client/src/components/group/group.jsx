import React from 'react';
import ServerRoutes from '../ServerRoutes.js';
import GroupPost from './groupPost.jsx';
import Navbar from '../navbar.jsx';
import ModalTopic from '../Modal/modalTopic.jsx';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
function Group(props){
  const [topicHead,setTopicHead]=React.useState(null);
  const [body,setBody]=React.useState(null);
  const [url,setUrl]=React.useState('');
async function getGroup(topic,id){
  const response = await fetch(ServerRoutes.getGroup+topic+'/'+id+'/', {
  method: 'GET',
  credentials: 'include'
});
const status=await response.status;
  if(status===200){
    const data = await response.json();
    if(data.status===true){
      setTopicHead(data.topic_head);
      setBody(data.body);
      setUrl(data.url);
    }else{
      alert(data.message);
    }
  }else{
    alert("Error "+status);
  }
}
  function getId(){
    const loc=window.location.href.split('/');
    return loc[loc.length-1];
  }
  React.useEffect(()=>{
    async function runner(){
      var pathname=window.location.pathname.split('/');
      if(pathname.length!==4){
        window.location.href='/';
      }else{
        await getGroup(pathname[2],pathname[3]);
      }
    }
    runner();
  },[]);
  return(
      topicHead&&body&&url.length>0?<div><Navbar links={{active:{name:'category',url:window.location.href},other:[{name:'Home',url:'/'},{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/join'},{name:'Create Meet',url:'/create'}]}} brand='true' discuss='true' search='true' login={props.logged.status} pic={props.logged.status?props.logged.user.profilePic:null}/>
      <div style={{marginTop:"100px"}}>
      <GroupPost topicHead={topicHead} body={body} url={url}/></div>
      <Fab color="primary" aria-label="add" style={{position: 'fixed',bottom: '1rem', right: '1.5rem',zIndex: 100}} data-toggle="modal" data-target="#ModalCenter">
      <AddIcon />
      </Fab>
      <ModalTopic category={getId()}/>
      </div>:null
  );
}

export default Group;

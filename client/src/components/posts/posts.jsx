import React from 'react';
import ServerRoutes from '../ServerRoutes.js';
import Navbar from '../navbar.jsx';
import PostPage from './postPage.jsx';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ModalPost from '../Modal/modalPost.jsx';
function Post(props){
  const [body,setBody]=React.useState(null);
  const [url,setUrl]=React.useState('');
  const [category,setCategory]=React.useState(null);
  async function getPosts(url1,url2,url3){
    const response = await fetch(ServerRoutes.getPosts+url1+'/'+url2+'/'+url3, {
    method: 'GET',
    credentials: 'include'
  });
  const status=await response.status;
    if(status===200){
      const data = await response.json();
      if(data.status===true){
        setCategory(data.category);
        setBody(data.body);
        setUrl(data.url);
      }else{
        alert(data.message);
      }
    }else{
      alert("Error "+status);
    }
  }

  React.useEffect(()=>{
      async function runner(){
        var pathname=window.location.pathname.split('/');
        if(pathname.length<5){
          window.location.href='/';
        }else{
          await getPosts(pathname[2],pathname[3],pathname[4]);
        }
      }
      runner();
    },[]);
  return(
    <div>
    {
        body&&url.length>0?<div><Navbar links={{active:{},other:[{name:'Home',url:'/'},{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/join'},{name:'Create Meet',url:'/create'}]}} brand='true' discuss='true' search='true' login={props.logged.status} pic={props.logged.status?props.logged.user.profilePic:null}/>
        <div style={{marginTop:"100px"}}><PostPage body={body} url={url} category={category}/></div>
        <Fab color="primary" aria-label="add" style={{position: 'fixed',bottom: '1rem', right: '1.5rem',zIndex: 100}} data-toggle="modal" data-target="#ModalCenter">
        <AddIcon />
        </Fab>
        <ModalPost category={""}/>
        </div>:null
    }
    </div>
  );
}

export default Post;

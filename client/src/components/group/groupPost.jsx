import React from 'react';
import logo from '../images/stemlogo.png';
import GetAppIcon from '@material-ui/icons/GetApp';
import '../../css/pure.css';
import parse from 'html-react-parser';
import LinkIcon from '@material-ui/icons/Link';
import FavoriteIcon from '@material-ui/icons/Favorite';
function GroupPost(props){
  return (
    <div>
    <div className="sidebar pure-u-1 pure-u-md-1-4">
        <div className="header">
            <h1 className="brand-title">{props.topicHead.name.split('_').join(' ')}</h1>
            <h2 className="brand-tagline"><img style={{height:"80px",width:"80px",borderRadius:'100px'}} className="post-avatar" src={props.topicHead.uploaded_logo?(props.url.toString()+props.topicHead.uploaded_logo.url.toString()):logo} alt='thumbnail'/></h2>
        </div>
    </div>
      <div id="layout" className="pure-g">

         <div  className="content pure-u-1 pure-u-md-3-4" style={{backgroundColor:"#000",opacity:'0.9'}}>
         <ul className="nav nav-pills" id="myTab" role="tablist">
          <li className="nav-item">
            <a className="nav-link active" style={{color:'white'}} id="topic-tab" data-toggle="tab" href="#topics" role="tab" aria-controls="topics" aria-selected="true">Topics</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" style={{color:'white'}} id="home-tab" data-toggle="tab" href="#users" role="tab" aria-controls="users" aria-selected="false">Users</a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent" style={{color:'white'}}>
          <div className="tab-pane fade" id="users" role="tabpanel" aria-labelledby="users-tab">
            {
              props.body&&props.body.users?props.body.users.map((user,index)=>{return(
                <div name="users" id={user.id} key={user.id} className="post">
                <section>
                        <header className="post-header">
                            <p className="post-meta" style={{color:"white"}}>
                            <img style={{height:"50px",width:"50px",borderRadius:'100px',marginRight:"10px"}} src={props.url.substring(0,props.url.length-1)+user.avatar_template.replace("{size}","80")} alt='user profile'/>
                            {user.name} (<a href={'/u/'+user.username}>@{user.username}</a>)
                            </p>
                        </header>
                  </section>
                </div>
              );}
            ):null
            }
          </div>
          <div className="tab-pane fade show active" id="topics" role="tabpanel" aria-labelledby="topics-tab">
            {
              props.body&&props.body.topic_list?props.body.topic_list.topics.map((topic,index)=>{return (

                  <div name="topics" id={topic.id} key={topic.id} style={{marginTop:"5px",marginBottom:"5px"}} className="post" >
                  {topic.pinned? <h1 className="content-subhead"><span role="img" aria-label="pinned">📌</span></h1>:null}
                    <section>
                            <header className="post-header">
                                <img style={{height:"80px",width:"80px",borderRadius:'200px'}} className="post-avatar" src={topic.image_url?topic.image_url.toString():logo} alt='thumbnail'/>
                                <h2 className="post-title">{topic.title}</h2>
                                <a className="post-category post-category-js" href={"/post/t/"+topic.slug+'/'+topic.id+"/1"}><LinkIcon  style={{ display: "inline", verticalAlign: "middle" }}/> Read More</a>
                                <p className="post-meta">
                                Post Count: {topic.posts_count}<br/>
                                <FavoriteIcon style={{ color: '#ff4c68',display: "inline", verticalAlign: "middle" }}/>: {topic.like_count}
                                </p>
                            </header>

                            <div className="post-description">
                                <p>
                                  {topic.excerpt?parse(topic.excerpt.replace("https://stemgames.metastudio.org/t/","/post/t/")):null}
                                </p>
                            </div>
                        </section>
                  </div>
              );
              }):null
            }
            <button style={{marginTop:'20px',marginBottom:'20px'}} type="button" className="btn btn-primary"><GetAppIcon style={{ display: "inline", verticalAlign: "middle" }}/> Load More </button>
          </div>
        </div>
        </div>
      </div>
      </div>
  )
}
export default GroupPost;

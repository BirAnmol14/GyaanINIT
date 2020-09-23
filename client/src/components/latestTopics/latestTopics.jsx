import React from 'react';
import '../../css/pure.css';
import ServerRoutes from '../ServerRoutes.js';
import logo from '../images/stemlogo.png';
import parse from 'html-react-parser';
import LinkIcon from '@material-ui/icons/Link';
import FavoriteIcon from '@material-ui/icons/Favorite';
function LatestTopics(){
  const [topics,setTopics]=React.useState([]);
  const [groups,setGroups]=React.useState([]);
  const [url,setUrl]=React.useState('');
  async function getTopics(){
    const response = await fetch(ServerRoutes.latestTopics, {
    method: 'GET',
    credentials: 'include'
  });
  const status=await response.status;
    if(status===200){
      const data = await response.json();
      if(data.status===true){
        setUrl(data.url);
        setGroups(data.groups);
        setTopics(data.topics);
      }else{
        alert(data.message);
      }
    }else{
      alert("Error "+status);
    }
  }

  React.useEffect(()=>{
    async function runner(){
        await getTopics();
    }
    runner();
  },[]);

  return (
    <div id="layout" className="pure-g" >
      {url?<h1 className="post"><center>Categories</center></h1>:null}
      {
        groups.map((group,index)=>{
          return <div id={group.id} key={group.id} className="post" >
          <section>
                  <header className="post-header">
                      <img style={{height:"80px",width:"80px",borderRadius:'100px'}} className="post-avatar" src={group.uploaded_logo?(url.toString()+group.uploaded_logo.url.toString()):logo} alt='thumbnail'/>
                      <h2 className="post-title">{group.name.split('_').join(' ')}</h2>
                      <a className="post-category post-category-js" href={'/group/'+group.slug+'/'+group.id}><LinkIcon  style={{ display: "inline", verticalAlign: "middle" }}/> Read More</a>
                      <p className="post-meta">
                      Topic Count: {group.topic_count}<br/>
                      Post Count: {group.post_count}
                      </p>
                  </header>

                  <div className="post-description">
                      <p>
                        {group.description}
                      </p>
                  </div>
            </section>
          </div>
        })
      }
      {url?<h1 className="post"><center>Latest Topics</center></h1>:null}
      {
        topics.map((topic,index)=>{
          return <div id={topic.id} key={topic.id}  className="post" >
          {topic.pinned? <h1 className="content-subhead"><span role="img" aria-label="pinned">📌</span></h1>:null}
            <section>
                    <header className="post-header">
                        <h2 className="post-title">{topic.title.split('_').join(' ').split('/').join('-')}</h2>
                        <a className="post-category post-category-js" href={'/post/t/'+topic.title.split(' ').join('-').split('/').join('-')+'/'+topic.id+'/1'}><LinkIcon  style={{ display: "inline", verticalAlign: "middle" }}/> Read More</a>
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
        })
      }
    </div>
  );
}

export default LatestTopics;

import React from 'react';
import GetAppIcon from '@material-ui/icons/GetApp';
import parse from 'html-react-parser';
import pureCss from '../../css/pure.css';
function PostPage(props){
  return (
      <div id="layout" className="pure-g">
      <div style={{marginBottom:"10px"}}>
      <h2 className="post-title">{props.body.title}</h2>
      {props.category&&props.category.name?<a className="post-category post-category-js" href={props.category?"/group/"+props.category.slug+'/'+props.category.id:'#'} id='cat' name={props.body.category_id}>{props.category.name}</a>:null}
      </div>
      <br/>
      {
        props.body&&props.body.post_stream && props.body.post_stream.posts?props.body.post_stream.posts.map((post,index)=>{return (
          <div id={post.id} key={index} className="post">
          <section>
                  <header className="post-header">
                      <p>
                      <img style={{height:'50px',width:'50px',borderRadius:'200px',marginRight:"10px"}} src={props.url.substring(0,props.url.length-1)+post.avatar_template.replace("{size}","80")} alt='user profile'/>
                      {post.name}
                      (@{post.username})
                      </p>
                      <p className="post-meta">
                      {new Date(post.created_at).toLocaleString()}
                      </p>
                  </header>

                  <div className="post-description">
                      <p>
                        {post.cooked?parse(post.cooked.replace("https://stemgames.metastudio.org/t/","/post/t/")):null}
                      </p>

                  </div>
                  <hr/>
              </section>
          </div>
        );
      }):null
      }
      <button style={{marginTop:'20px',marginBottom:'20px'}} type="button" className="btn btn-primary"><GetAppIcon style={{ display: "inline", verticalAlign: "middle" }}/> Load More </button>
      </div>
  )
}
export default PostPage;

import React from 'react';
import ServerRoutes from '../ServerRoutes.js';
import SendIcon from '@material-ui/icons/Send';
function ModalPost(props){
  const [post,setPost]=React.useState({topicId:'',description:''});
  function modifyPost(event){
    const {value,name}=event.target;
    setPost(prev=>{return ({...prev,[name]:value});});
  }
  async function postNow(event){
    event.preventDefault();
    const body=JSON.stringify(post);
    const response=await fetch(ServerRoutes.makePost,{
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
        window.location.reload();
      }else{
        alert(res.message);
      }
    }else{
      alert('Error '+status);
    }
    resetPost();
  }
  function resetPost(){
    var loc=window.location.pathname.split('/');
    loc=loc[4];
    setPost({topicId:loc,description:''});
  }
  React.useEffect(()=>{
    resetPost();
  },[]);
  return (<div class="modal fade" id="ModalCenter" tabIndex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Compose Post</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form onSubmit={postNow}>
        <div class="modal-body">
        <label htmlFor="post">Post</label>
        <textarea id="post" className="form-control" name="description" required autoComplete="off" value={post.description} onChange={modifyPost}></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary"><SendIcon style = {{display: "inline",verticalAlign:"middle"}}/> Post</button>
        </div>
        </form>
      </div>
    </div>
  </div>);
}
export default ModalPost;

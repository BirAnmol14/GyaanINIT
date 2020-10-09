import React from 'react';
import ServerRoutes from '../ServerRoutes.js';
function ModalTopic(props){
  const [cat,setCat]=React.useState([]);
  const [postData,setPostData]=React.useState({title:'',description:'',categoryId:props.category});
  async function getCategories(){
    const response = await fetch(ServerRoutes.getCategories, {
    method: 'GET',
    credentials: 'include'
  });
  const status=await response.status;
    if(status===200){
      const data = await response.json();
      if(data.status===true){
        setCat(data.categories);
      }else{
        alert(data.message);
      }
    }else{
      alert("Error "+status);
    }
  }
 function postDataChanged(event){
    const {value,name}=event.target;
    setPostData(prev=>{return ({...prev,[name]:value});});
  }
  async function post(event){
    event.preventDefault();
    const body=JSON.stringify(postData);
    const response=await fetch(ServerRoutes.createTopic,{
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
        window.location.href='/post/t/'+res.topic_slug.split(' ').join('-').split('/').join('-')+'/'+res.topic_id+'/1/';
      }else{
        alert(res.message);
      }
    }else{
      alert('Error '+status);
    }
    setPostData({title:'',description:'',categoryId:props.category});
  }
  React.useEffect(()=>{getCategories()},[])
  return (<div className="modal fade" id="ModalCenter" tabIndex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLongTitle">Create Topic</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form onSubmit={post}>
        <div className="modal-body">
        <input className="form-control" type="text" name="title" required autoComplete="off" placeholder="Title" value={postData.title} onChange={postDataChanged}/>
        <br/>
        <textarea className="form-control" name="description" required autoComplete="off" placeholder="Description" value={postData.description} onChange={postDataChanged}></textarea>
        <br/>
        <select className="form-control" id = "multi-role" name='categoryId' required placeholder='Select a Category' value={postData.categoryId} onChange={postDataChanged}>
            <option value="" disabled selected>Select your Category</option>
            {
              cat.map((category,index)=>{return(<option key={category.id} id={index} value={category.id}>{category.name}</option>)})
            }
        </select>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" className="btn btn-primary">Create</button>
        </div>
        </form>
      </div>
    </div>
  </div>);
}
export default ModalTopic;

import React from 'react';
import './VideoCall.css'
function VideoCall(props) {
 var [ toggle,changeToggle]=React.useState({width:"0px",height: "92%",top:"0px",right:"0px",position:"fixed", transition: "0.1s", overflowY: "scroll"});
function changeToggle_(){

{toggle.width==="0px"?changeToggle((prevState) => ({
  ...prevState,
  width:"200px",
  
})):changeToggle((prevState) => ({
  ...prevState,
  width:"0px"
}))}

}

  return (
    <div className="full-height">
      {/* <h1>Video Call</h1>
    <h2>Url: {window.location.pathname.split('/')[2]}</h2> */}
      <div ><h1>Video Call</h1>
    <h2>Url: {window.location.pathname.split('/')[2]}</h2></div>
     
     
    <div style={toggle}>
    <ul className="list-group">
  <li className="list-group-item">Cras justo odio</li>
  <li className="list-group-item">Dapibus ac facilisis in</li>
  <li className="list-group-item">Morbi leo risus</li>
  <li className="list-group-item">Porta ac consectetur ac</li>
  <li className="list-group-item">Vestibulum at eros</li>
  <li className="list-group-item">Cras justo odio</li>
  <li className="list-group-item">Dapibus ac facilisis in</li>
  <li className="list-group-item">Morbi leo risus</li>
  <li className="list-group-item">Porta ac consectetur ac</li>
  <li className="list-group-item">Vestibulum at eros</li>
  <li className="list-group-item">Cras justo odio</li>
  <li className="list-group-item">Dapibus ac facilisis in</li>
  <li className="list-group-item">Morbi leo risus</li>
  <li className="list-group-item">Porta ac consectetur ac</li>
  <li className="list-group-item">Vestibulum at eros</li>
</ul>
        </div>
     
     
      <nav class="navbar fixed-bottom navbar-light bg-light">

        <div class="d-flex justify-content-start"><button type="button" class="btn btn-secondary">Extra
    </button>
        </div>
        <div class="d-flex justify-content-center">

          <button type="button" class="btn btn-secondary ml-2">Mic</button>
          <button type="button" class="btn btn-secondary ml-2">Call</button>
          <button type="button" class="btn btn-secondary ml-2">Video</button>

        </div>
        <div class="d-flex justify-content-end">
          <button type="button" onClick={changeToggle_} class="btn btn-secondary ml-1">Users</button>
          <button type="button" class="btn btn-secondary ml-1">Chat</button>
        </div>

      </nav>
    </div>

  );
}

export default VideoCall;

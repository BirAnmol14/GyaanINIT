import React from 'react';
import './login.css'
import profile from './profile.png';



function ViewProfile(props){
    return(
      <div >
            <div class="container">
                <div class = "d-flex justify-content-center" style={{marginTop:'140px'}}><h1>My Profile</h1></div>
                <br />
                <div class="row">

                <div class="col-md-3">
                    <div class="text-center">

                    <img src={props.pic?props.pic:profile} class="avatar img-circle" alt="avatar" style={{marginTop:'100px',width:'150px'}}/>
                    </div>
                </div>


                <div class="col-md-9 personal-info">
                    <div class="alert alert-info alert-dismissable" style={{width:'550px'}}>
                    <a href="/" class="panel-close close" data-dismiss="alert">×</a>

                    This is an <strong>.alert</strong>. Use this to show important messages to the user.
                    </div>
                    <h3>Personal info</h3>

                    <form class="form-horizontal">
                    <div class="form-group">
                        <label class="col-lg-3 control-label">First Name:</label>
                        <div class="col-lg-8">
                        <input class="input" type="form-control" value="---User_Name---" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label">Middle Name:</label>
                        <div class="col-lg-8">
                        <input class="input" type="text" value="---Middle_Name---" readOnly/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label">Last Name:</label>
                        <div class="col-lg-8">
                        <input class="input" type="text" value="---Last_Name---" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label">Email:</label>
                        <div class="col-lg-8">
                        <input class="input" type="text" value="---user@name.com----" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label">Country</label>
                        <div class="col-lg-8">
                        <input class="input" type="text" value="India" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">Username:</label>
                        <div class="col-md-8">
                        <input class="input" type="text" value="noobmaster" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label"></label>
                        <div class="col-md-8">
                        <a href="/profile/edit"><input type="button" class="btn btn-primary" value="Edit" /></a>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
            </div>

      </div>
    );

}



export default ViewProfile;

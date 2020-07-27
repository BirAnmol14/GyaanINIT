import React from 'react';
import "./dashboard.css"

function Menu(){
    return(
            <div className="mx-auto">
                <div class="container">
               
                    <section>
                        
                        <div class="row">
                            <div class="col-md-12">
                                <div class="panel panel-primary">
                                    <div class="panel-heading">
                                        <h3 class="panel-title d-flex justify-content-center"><span class="glyphicon glyphicon-thumbs-up"></span>Dashboard</h3>
                                    </div>
                                    <div class="panel-body">
                                        <br />
                                        <h3 class="panel-heading panel-heading">Lectures</h3>
                                        <br />
                                        <div class="row">
                                            <div class="col-md-12">
                                            <button type="button" class="btn btn-info btn-lg m-2"><span class="glyphicon glyphicon-cog glyphsize red"></span>Join<br />Lecture<span class="glyphicon glyphicon-cog black"></span></button>
                                            </div>
                                        </div>
                                        <br />
                                        <br />
                                        <h3 class="panel-heading panel-heading">My Social Network</h3>
                                        <br />
                                        <br />
                                        <div class="row">
                                        
                                        <div class="col-md-12">
                                        <button type="button" class="btn btn-success btn-lg m-2">Recent Activities</button>
                                        <button type="button" class="btn btn-success btn-lg m-2">Post</button>
                                        </div> 
                                        </div>
                                        <br />
                                        <h3 class="panel-heading panel-heading">My Academics</h3>
                                        <br />
                                        <div class="row">
                                            <div class="col-md-12">
                                         
                                            <a href="#" class="btn btn-lg btn-primary m-2">
                                                <i class="fa fa-user fa-6x"></i>
                                                Slides <br />
                                            </a>
                                                <a href="#" class="btn btn-lg btn-primary m-2">
                                                <i class="fa fa-user fa-5x"></i>
                                                Video Lectures <br />
                                            </a>
                                                <a href="#" class="btn btn-lg btn-primary m-2">
                                                <i class="fa fa-user fa-5x"></i>
                                                Quizes <br />
                                            </a>
                                            <br />
                                                <a href="#" class="btn btn-lg btn-primary m-2">
                                                <i class="fa fa-user fa-5x"></i>
                                                Class Schedule <br />
                                            </a>
                                                <a href="#" class="btn btn-lg btn-primary m-2">
                                                <i class="fa fa-user fa-5x"></i>
                                                My Progress <br />
                                            </a>
                                            </div>
                                        </div>
                                        <br />
                                        <h3 class="panel-heading panel-heading">Requests</h3>
                                        <br />
                                        <div class="row">
                                            <div class="col-md-12">
                                            
                                            <button type="button" class="btn btn-danger btn-lg m-2"><span class="glyphicon glyphicon-signal glyphsize green"></span>Leave<br />Course </button>
                                            </div>
                                        </div>
                                        <br />
                                            <h3 >Updates</h3>
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    </div>
            </div>
    );

}

export default Menu;

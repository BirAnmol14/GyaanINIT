import React from 'react';
import "./dashboard.css"

function Menu() {
    return (
        <div className="mx-auto m-2">
            <div className="container " style={{opacity:"0.99"}}>

                <section>

                    <div className="row">
                        <div className="col-md-12" style={{paddingLeft:'0px',paddingRight:'0px'}}>
                            <div className="panel panel-primary">

                                <div className="p-3 mb-2 bg-dark text-white">   <div className="panel-heading">
                                    <h2 className="panel-title d-flex justify-content-center font-weight-bolder text-monospace"><span className="glyphicon glyphicon-thumbs-up"></span>Dashboard</h2>
                                </div></div>
                                <div className="panel-body" style={{marginLeft:'5%',marginRight:'5%'}}>

                                    <br />
                                    <h3 className="panel-heading panel-heading"><span class="text-dark border-primary">Updates</span></h3>

                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="list-group">
                                                    <a href="#" className="list-group-item list-group-item-action">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1">List group item heading</h5>
                                                            <small>3 days ago</small>
                                                        </div>
                                                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                                        <small>Donec id elit non mi porta.</small>
                                                    </a>
                                                    <a href="#" className="list-group-item list-group-item-action">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1">List group item heading</h5>
                                                            <small className="text-muted">3 days ago</small>
                                                        </div>
                                                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                                        <small className="text-muted">Donec id elit non mi porta.</small>
                                                    </a>
                                                    <a href="#" className="list-group-item list-group-item-action">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5 className="mb-1">List group item heading</h5>
                                                            <small className="text-muted">3 days ago</small>
                                                        </div>
                                                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                                        <small className="text-muted">Donec id elit non mi porta.</small>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />

                                    <h3 className="panel-heading panel-heading"><span className="text-dark border-primary">Lectures Scheduled</span></h3>
                                    <div className="list-group">
                                        <a href="#" className="list-group-item list-group-item-action">
                                            Cras justo odio
                                            </a>
                                        <a href="#" className="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
                                        <a href="#" className="list-group-item list-group-item-action">Morbi leo risus</a>
                                        <a href="#" className="list-group-item list-group-item-action">Porta ac consectetur ac</a>
                                        <a href="#" className="list-group-item list-group-item-action">Vestibulum at eros</a>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <button type="button" className="btn btn-dark btn-lg m-2"><span className="glyphicon glyphicon-cog glyphsize red"></span>Join Lecture<span className="glyphicon glyphicon-cog black"></span></button>
                                        </div>
                                    </div>





                                    <br />
                                    <h3 className="panel-heading panel-heading"><span className="text-dark border-primary">My Courses</span></h3>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <nav>
                                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                    <a className="nav-item nav-link active bg-dark text-white" id="nav-slides-tab" data-toggle="tab" href="#nav-slides" role="tab" aria-controls="nav-slides" aria-selected="true">Slides</a>
                                                    <a className="nav-item nav-link bg-dark text-white" id="nav-Recorded_Lectures-tab" data-toggle="tab" href="#nav-Recorded_Lectures" role="tab" aria-controls="nav-Recorded_Lectures" aria-selected="false">Recorded Lectures</a>
                                                    <a className="nav-item nav-link  bg-dark text-white" id="nav-quiz-tab" data-toggle="tab" href="#nav-quiz" role="tab" aria-controls="nav-quiz" aria-selected="false">Quizes</a>
                                                    <a className="nav-item nav-link bg-dark text-white" id="nav-schedule-tab" data-toggle="tab" href="#nav-schedule" role="tab" aria-controls="nav-schedule" aria-selected="false">className Schedule</a>
                                                    <a className="nav-item nav-link  bg-dark text-white" id="nav-progress-tab" data-toggle="tab" href="#nav-progress" role="tab" aria-controls="nav-progress" aria-selected="false">My Progress</a>


                                                </div>
                                            </nav>
                                            <div className="tab-content" id="nav-tabContent">
                                                <div className="tab-pane fade show active" id="nav-slides" role="tabpanel" aria-labelledby="nav-slides-tab"><ul className="list-group list-group-flush">
                                                    <li className="list-group-item">Slide 1</li>
                                                    <li className="list-group-item">Slide 2</li>
                                                    <li className="list-group-item">Slide 3</li>
                                                    <li className="list-group-item">Slide 4</li>
                                                    <li className="list-group-item">Slide 5</li>
                                                </ul></div>
                                                <div className="tab-pane fade show " id="nav-Recorded_Lectures" role="tabpanel" aria-labelledby="nav-Recorded_Lectures-tab"><ul className="list-group list-group-flush">
                                                    <li className="list-group-item">Lecture 1</li>
                                                    <li className="list-group-item">Lecture 2</li>
                                                    <li className="list-group-item">Lecture 3</li>
                                                    <li className="list-group-item">Lecture 4</li>
                                                    <li className="list-group-item">Lecture 5</li>
                                                </ul></div>
                                                <div className="tab-pane fade show " id="nav-quiz" role="tabpanel" aria-labelledby="nav-quiz-tab"><ul className="list-group list-group-flush">
                                                    <li className="list-group-item">quiz 1</li>
                                                    <li className="list-group-item">quiz 2</li>
                                                    <li className="list-group-item">quiz 3</li>
                                                    <li className="list-group-item">quiz 4</li>
                                                    <li className="list-group-item">quiz 5</li>
                                                </ul></div>
                                                <div className="tab-pane fade show " id="nav-schedule" role="tabpanel" aria-labelledby="nav-schedule-tab"><ul className="list-group list-group-flush">
                                                    <li className="list-group-item">schedule 1</li>
                                                    <li className="list-group-item">schedule 2</li>
                                                    <li className="list-group-item">schedule 3</li>
                                                    <li className="list-group-item">schedule 4</li>
                                                    <li className="list-group-item">schedule 5</li>
                                                </ul></div>
                                                <div className="tab-pane fade show " id="nav-progress" role="tabpanel" aria-labelledby="nav-progress-tab"><ul className="list-group list-group-flush">
                                                    <li className="list-group-item">progress 1</li>
                                                    <li className="list-group-item">progress 2</li>
                                                    <li className="list-group-item">progress 3</li>
                                                    <li className="list-group-item">progress 4</li>
                                                    <li className="list-group-item">progress 5</li>
                                                </ul></div>


                                            </div>
                                            <br />

                                            <h3 className="panel-heading panel-heading"><span className="text-dark border-primary">My Networks</span></h3>


                                            <div className="row">

                                                <div className="col-md-12">
                                                    <nav>
                                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                            <a className="nav-item nav-link active bg-dark text-white" id="nav-recentActivities-tab" data-toggle="tab" href="#nav-recentActivities" role="tab" aria-controls="nav-recentActivities" aria-selected="true">Recent Activities</a>
                                                            <a className="nav-item nav-link bg-dark text-white" id="nav-posts-tab" data-toggle="tab" href="#nav-posts" role="tab" aria-controls="nav-posts" aria-selected="false">Posts</a>

                                                        </div>
                                                    </nav>
                                                    <div className="tab-content" id="nav-tabContent">
                                                        <div className="tab-pane fade show active" id="nav-recentActivities" role="tabpanel" aria-labelledby="nav-recentActivities-tab"><ul className="list-group list-group-flush">
                                                            <li className="list-group-item">Act 1</li>
                                                            <li className="list-group-item">Act 2</li>
                                                            <li className="list-group-item">Act 3</li>
                                                            <li className="list-group-item">Act 4</li>
                                                            <li className="list-group-item">Act 5</li>
                                                        </ul></div>
                                                        <div className="tab-pane fade" id="nav-posts" role="tabpanel" aria-labelledby="nav-posts-tab"><ul className="list-group list-group-flush">
                                                            <li className="list-group-item">Post 1</li>
                                                            <li className="list-group-item">Post 2</li>
                                                            <li className="list-group-item">Post 3</li>
                                                            <li className="list-group-item">Post 4</li>
                                                            <li className="list-group-item">Post 5</li>
                                                        </ul></div>

                                                    </div>

                                                </div>
                                            </div>


                                        </div>
                                    </div>

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

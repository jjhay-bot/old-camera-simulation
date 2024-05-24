import React from 'react';
import $ from 'jquery';
import '../../css/index.css';

export default class VerifiedAnswer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.previously_verified_data.length == 0) {
            return (<div></div>);

        }
        else {
            return (
                <div>
                    {/* className="col-sm-12 col-lg-5 col-md-5" */}
                    <div>
                        <b>Previous Submission</b>
                        <br></br>
                        <br></br>


                    </div>
                    {this.props.previously_verified_data.map((item) => {


                        if (item.is_verification_needed == true && item.data_type == "file_upload") {

                            var answer_div_class = "row answer" + item.question_id;
                            return (
                                <div className={answer_div_class} >

                                    <br></br>
                                    <div className="col-sm-12 col-lg-5 col-md-5">
                                        <b>{item.question}</b>
                                        <br></br>
                                        <p>ID type</p>
                                        <p>{item.doc_name}</p>
                                        <br></br>


                                    </div>
                                    <div className="col-sm-12 col-lg-6 col-md-6" style={{ maxWidth: 250 + "px", maxHeight: 250 + "px" }} >
                                        <embed style={{ width: "100%", height: "100%" }} src={item.answer} alt="image not visible" ></embed>


                                        <br></br>
                                    </div>

                                    <br></br>

                                    <div style={{ height: 3 + "px", width: "100%", marginTop: 10 + "px", backgroundColor: "#EAEAEA" }}></div>

                                </div>

                            )
                        }

                    })
                    }


                </div>
            );
        }
    }
}
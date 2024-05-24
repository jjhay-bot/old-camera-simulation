import React from 'react';
import $ from 'jquery';
import '../css/index.css';
import sendNotification from '../utils/sendNotification';
// import { Left, Right } from 'react-bootstrap/lib/Media';

export default class CustomerNameChange extends React.Component {
    constructor(props) {
        super(props);
        this.state = { comment_val: "" };
        this.getSelectedComment = this.getSelectedComment.bind(this);
    }
    getSelectedComment() {
        var check_box_class = "comment_check_box" + this.props.item.question_id;
        var comment_val = $("input[name=" + this.props.item.question_id + "]:checked").val();
        this.setState({ comment_val: comment_val });
        this.props.getSelectedComment(comment_val);
    }

    customerNameChangeAprrove(item) {

        var all_condition_satisified = true;
        var check_box_class = "change_name_radio";
        // change_name_mandatatory_radio
        var radio_val = $("input[name=change_name_radio]:checked").val();
        if ($("input[name=change_name_radio]:checked").length == 0) {
            all_condition_satisified = false;
            sendNotification("Validation Error", "Please choose a reason for name change", "error");
            return
        }
        if (radio_val == "3") {
            all_condition_satisified = false;
            sendNotification("Validation Error", "You cannot approve", "error");

            return
        }
        var approval_mandatory_radio = $("input[name=change_name_mandatatory_radio]:checked").val();
        if (approval_mandatory_radio == "4") {
            all_condition_satisified = true
        }
        else {
            all_condition_satisified = false;
            sendNotification("Validation Error", "Please check if name is correct per ID", "error");

        }

        // if()

        if (all_condition_satisified) {
            sendNotification("Okay", "You are Approving", "success");

            var color_change_div_class = "1answer" + item.question_id;
            $('.' + color_change_div_class).css('background-color', '#b9f3b9');
            var res = { "is_verified": true }

            this.props.nameChangeResponse(res);
            //   this.checkAndUpdateStatus(item, true)
        }


    }

    rejectResponse() {
        var res = { "is_verified": false };

        var color_change_div_class = "1answer" + this.props.item.question_id;
        $('.' + color_change_div_class).css('background-color', '#ecbdbd');
        sendNotification("Okay", "You are Rejecting", "success");

        this.props.nameChangeResponse(res);
    }
    render() {
        var check_box_class = "comment_check_box" + this.props.item.question_id;
        var item = this.props.item;
        var check_box_class = "mandatory_check_box" + this.props.item.question_id;
        var answer_div_class = "row 1answer" + this.props.item.question_id;
        return (

            <div className={answer_div_class} >
                <div style={{ height: 3 + "px", width: "100%", backgroundColor: "#EAEAEA" }}></div>
                <br></br>
                <div className="col-sm-12 col-lg-5 col-md-5">
                    <b>Name Change Confirmation</b>
                    <br></br>
                    <br></br>
                    {/* {item.verifier_questions.map((item_question) => {
    return (<div><label><input className={check_box_class} type="checkbox"></input><p>{item_question}</p></label> <br></br></div>
    )
  })} */}
                    <div className="row">
                        <div className="col-sm-5 col-lg-5 col-md-5" style={{ textAlign: "Right" }}>
                            New Name
  </div>
                        <div className="col-sm-7 col-lg-7 col-md-7" style={{ textAlign: "left", borderStyle: "groove" }}>
                            {item.answer}
                        </div>
                    </div>

                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-sm-5 col-lg-5 col-md-5" style={{ textAlign: "right" }}>
                            Origin Name
  </div>
                        <div className="col-sm-7 col-lg-7 col-md-7" style={{ textAlign: "left", borderStyle: "groove" }}>
                            {this.props.customer_name}
                        </div>
                    </div>
                    <br></br>
                    <b>1. Reason For Name Change</b>
                    <div style={{ paddingLeft: 50 }}>

                        <div><label><input className="change_name_radio1" name="change_name_radio" value="1" type="radio"></input><p>Misspelling of current name on system</p></label> <br></br></div>
                        <div><label><input className="change_name_radio2" name="change_name_radio" type="radio" value="2"></input><p>Different name but address match</p></label> <br></br></div>
                        <div><label><input className="change_name_radio3" name="change_name_radio" type="radio" value="3"></input><p>Different Name Different Address</p></label> <br></br></div>
                    </div>
                    <b>2.</b>
                    <div style={{ paddingLeft: 50 }}><div><label><input className="change_name_radio4" value="4" name="change_name_mandatatory_radio" type="radio"></input><p>Name is correct as per ID</p></label> <br></br></div>
                    </div>
                </div>

                <div style={{ display: "inline-block", margin: "auto", padding: 30 + "px", width: "100%", textAlign: "center" }}>
                    <input value="Approve" className="approve_btn" type="button" onClick={() => this.customerNameChangeAprrove(item)}></input>
                    {/* <CommentModal item={item} getSelectedComment={(e) => this.checkComment(e, item)}>
  </CommentModal> */}
                    <div>
                        <input value="Reject" type="button" className="btn reject_btn" onClick={() => this.rejectResponse(item, false)}></input>
                    </div>
                </div>
            </div>

        );
    }
}
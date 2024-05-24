import React from 'react';
import $ from 'jquery';
import '../css/index.css';
import { Snackbar, Alert as MuiAlert } from '@mui/material';

export default class CommentModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comment_val: "",
            snackbar_type: "success",
            snackbar_open: false,
            alert_mssg: ""
        };
        this.getSelectedComment = this.getSelectedComment.bind(this);
        this.changeButtonOpacity = this.changeButtonOpacity.bind(this);
        this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
    }

    handleSnackBarClose() {
        this.setState({ snackbar_open: false });
    }

    getSelectedComment() {
        var check_box_class = "comment_check_box" + this.props.item.question_id;
        var comment_val = $("input[name=" + this.props.item.question_id + "]:checked").val();

        if (comment_val) {
            this.setState({ comment_val: comment_val });
            this.props.getSelectedComment(comment_val);


        }
        else {
            this.setState({
                snackbar_type: "error",
                snackbar_open: true,
                alert_mssg: "Please select a rejection reason"
            })
        }

    }

    changeButtonOpacity() {
        var check_box_class = "comment_check_box" + this.props.item.question_id;
        var save_button_id = "save" + this.props.item.question_id;
        
        if ($('.' + check_box_class + ':checked').length == 0) {

            $('#reject_button_id').css('opacity', '0.5');
            $('#save-comment').css('opacity', '0.5');
        }
        else {
            
            $('#reject_button_id').css('opacity', '1');
            $('#' + save_button_id).css('opacity', '1');
        }


    }

    render() {
        var check_box_class = "comment_check_box" + this.props.item.question_id;
        var save_button_id = "save" + this.props.item.question_id;
        return (
            <div>
                {this.state.snackbar_open && <Snackbar style={{ width: "100%", maxWidth: 600 + "px" }} open={this.state.snackbar_open} onClose={this.handleSnackBarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <MuiAlert style={{ width: "100%" }} onClose={this.handleSnackBarClose} severity={this.state.snackbar_type}>
                        {this.state.alert_mssg}
                    </MuiAlert>
                </Snackbar>}
                <button type="button" id="reject_button_id" class="btn reject_btn" opacity="0.5" data-toggle="modal" data-target={"#" + "exampleModal" + this.props.item.question_id}>
                    Reject
                </button>

                <div class="modal fade" id={"exampleModal" + this.props.item.question_id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Please select a Comment</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                {this.props.item.comment_questions.map((item_comment_question) => {
                                    return (<div>
                                        <label>
                                            <input className={check_box_class} value={item_comment_question} name={this.props.item.question_id} type="radio" onChange={this.changeButtonOpacity}>
                                            </input>
                                            <p>{item_comment_question}</p>
                                        </label>
                                        <br></br>
                                    </div>
                                    )
                                })}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button id={save_button_id} type="button" class="btn btn-primary " style={{ opacity: 0.5 }} onClick={this.getSelectedComment} data-dismiss="modal">Save</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}
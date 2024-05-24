import React, { Component } from 'react';
import $ from 'jquery';
import '../../css/index.css';
import { DatePicker, Layout } from 'antd';
import "react-datepicker/dist/react-datepicker.css";
import constants from '../../constants.json';

import { CustomerNameChange, CommentModal } from '../../Components';
import VerifiedAnswer from '../VerifierPanel/verified_answer';
import StoreInfo from '../VerifierPanel/store_info';
import { Snackbar, Alert as MuiAlert } from '@mui/material';

import {  HeaderService, HeaderMenu } from '../../atoms';
import ProgressBar from '../../atoms/ProgressBar';

const { Header} = Layout;
class VerifierPanelComponent extends Component {
  constructor(props) {
    super(props);
    this.getAnswersToVerify = this.getAnswersToVerify.bind(this);
    this.rejectResponse = this.rejectResponse.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.approveResponse = this.approveResponse.bind(this);
    this.skipVerifierResponse = this.skipVerifierResponse.bind(this);
    this.submitVerifierResponse = this.submitVerifierResponse.bind(this);
    this.checkComment = this.checkComment.bind(this);
    this.nameChangeResponse = this.nameChangeResponse.bind(this);
    this.customerNameChangeAprrove = this.customerNameChangeAprrove.bind(this);
    this.changeOpacityApproval = this.changeOpacityApproval.bind(this);
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.name_change_item = [];
    var default_state = {
      answer_set: [],
      previously_verified_data: [],
      forced_update: [],
      customer_info: {},
      loaded: true,
      rejected_question_id_array: [],
      answer_verifier_status: [],
      no_of_verfications_needed: 0,
      startDate: new Date(),
      verifier_json_array: [],
      is_commented: false,
      snackbar_type: "success",
      snackbar_open: false,
      alert_mssg: "",
      show_customer_name: false
    }
    this.state = default_state;
  }


  componentDidMount() {
  }


  getAnswersToVerify() {
    this.setState({ loaded: false })

    fetch(constants.local_base_url + "/admin/v1/get_answers", {
      method: "GET", headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include'
    }).then(res => { return res.json() }
    )
      .then(result => {

        this.setState({ snackbar_open: true, alert_mssg: result['message'], snackbar_type: "info" })
        if (result['code'] == constants.SESSION_EXPIRED_CODE) {
          localStorage.removeItem("userType")
          window.location.reload();
        }
        else if (result['success'] != true) {
          this.setState({ loaded: true });
        }
        else {
          if (result['data'].hasOwnProperty('answer_data')) {
            var count = 0;
            var verifier_json_array = [];
            var forced_update_array = [];
            console.log(result['data']['answer_data']);
            for (var i = 0; i < result['data']['answer_data'].length; i++) {
              var verifier_json = {};
              verifier_json['question_id'] = result['data']['answer_data'][i].question_id
              verifier_json['is_verified'] = true;
              verifier_json['answer'] = result['data']['answer_data'][i].answer;
              verifier_json['rank'] = result['data']['answer_data'][i].rank;
              verifier_json['data_type'] = result['data']['answer_data'][i].data_type;
              if (result['data']['answer_data'][i].is_verification_needed == true) {
                count++;
                verifier_json['expiry_date'] = null
                verifier_json['is_verified'] = false;
                verifier_json['has_expiry_date'] = true
                verifier_json['comment'] = ""

              }
              if ("data_type" in result['data']['answer_data'][i] && result['data']['answer_data'][i]['data_type'] == "customer_name") {
                verifier_json['has_expiry_date'] = false
              }
              if ("parent_obj" in result['data']['answer_data'][i] && "answer_id" in result['data']['answer_data'][i]['parent_obj']) {
                var forced_update_obj = {
                  "answer_id": result['data']['answer_data'][i]['parent_obj']['answer_id'],
                  "answer": result['data']['answer_data'][i]['parent_obj']['answer']
                }
                forced_update_array.push(forced_update_obj)
              }

              verifier_json_array.push(verifier_json)
            }
            this.setState({
              verifier_json_array: verifier_json_array, no_of_verfications_needed: count,
              answer_set: result['data']['answer_data'], previously_verified_data: result['data']['verified_data'],
              customer_info: result['data']['account_info'], loaded: true, forced_update: forced_update_array
            })
            console.log(this.state)
          }

          this.setState({ loaded: true })
        }

      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

  }

  checkBeforeSubmitting() {
    var verifier_json = this.state.verifier_json_array
    var current_date = new Date();
    if (this.state.no_of_verfications_needed == this.state.answer_verifier_status.length) {
      return true;
    }
    else {
      this.setState({ snackbar_open: true, alert_mssg: "please approve or reject", snackbar_type: "warning" })

      return false;
    }
  }

  skipVerifierResponse() {
    var body = {
      "kyc_account_id": this.state.customer_info.kyc_account_id,
      "question_group_id": this.state.customer_info.question_group_id
    };

    fetch(constants.local_base_url + "/admin/v1/skip_verifier_response", {
      method: "POST", headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(body),
      credentials: 'include'
    }).then(res => { return res.json() }
    )
      .then(result => {
        if (result['code'] == constants.SESSION_EXPIRED_CODE) {
          localStorage.removeItem("userType");
          window.location.reload();

        }
        else if (!result['success']) {
          window.location.reload();
        }
        this.setState({
          answer_set: [],
          customer_info: {},
          loaded: true,
          rejected_question_id_array: [],
          answer_verifier_status: [],
          no_of_verfications_needed: 0,
          snackbar_open: true, alert_mssg: result['message'], snackbar_type: "success"
        })


      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  submitVerifierResponse() {
    if (this.checkBeforeSubmitting()) {
      this.setState({ loaded: false })
      var body = {
        "kyc_account_id": this.state.customer_info.kyc_account_id,
        "store_id": this.state.customer_info.store_id,
        "question_group_id": this.state.customer_info.question_group_id,
        "answer_status": this.state.answer_verifier_status,
        "verifier_response": this.state.verifier_json_array,
        "forced_update": this.state.forced_update
      }

      console.log(body)

      this.setState({ snackbar_open: true, alert_mssg: "you are submitting", snackbar_type: "info" })
      fetch(constants.local_base_url + "/admin/v1/verifier_response", {
        method: "POST", headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cache': 'no-cache',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(body),
        credentials: 'include'
      }).then(res => { return res.json() }
      )
        .then(result => {
          if (result['code'] == constants.SESSION_EXPIRED_CODE) {
            localStorage.removeItem("userType");
            window.location.reload();

          }
          else if (!result['success']) {
            window.location.reload();
          }
          this.setState({
            answer_set: [],
            customer_info: {},
            loaded: true,
            rejected_question_id_array: [],
            answer_verifier_status: [],
            no_of_verfications_needed: 0,
            snackbar_open: true, alert_mssg: result['message'], snackbar_type: "info"
          })
          alert(result['message'])

        },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  }

  rejectResponse(item, check_comment = true) {
    if ("data_type" in item) {
      this.setState({ show_customer_name: false });
    }
    if (check_comment == true) {
      if (!this.state.is_commented) {
        this.setState({ snackbar_open: true, alert_mssg: "please comment", snackbar_type: "warning" })
        return
      }
    }
    this.setState({ snackbar_open: true, alert_mssg: "you are rejecting", snackbar_type: "info" })
    var check_box_class = "mandatory_check_box" + item.question_id;
    var color_change_div_class = "answer" + item.question_id;
    $('.' + color_change_div_class).css('background-color', '#ecbdbd');
    $('.' + check_box_class).removeAttr('checked');
    this.checkAndUpdateStatus(item, false)
    this.setState({ is_commented: false })
    console.log(this.state.verifier_json_array)

  }

  nameChangeResponse(res, single_answer) {
    console.log(single_answer);

    if (res['is_verified'] == true) {
      this.checkAndUpdateStatus(single_answer, true)
    }
    else {
      this.checkAndUpdateStatus(single_answer, false)
    }
  }

  customerNameChangeAprrove(item) {

    var all_condition_satisified = true;
    var check_box_class = "change_name_radio";
    // change_name_mandatatory_radio
    var radio_val = $("input[name=change_name_radio]:checked").val();
    if (radio_val == "3") {
      all_condition_satisified = false;

      this.setState({ snackbar_open: true, alert_mssg: "you cannot approve", snackbar_type: "error" })
      return
    }
    var approval_mandatory_radio = $("input[name=change_name_mandatatory_radio]:checked").val();
    if (approval_mandatory_radio == "4") {
      all_condition_satisified = true
    }
    else {
      all_condition_satisified = false;

      this.setState({ snackbar_open: true, alert_mssg: "please check if name is correct per ID", snackbar_type: "warning" })
    }

    // if()

    if (all_condition_satisified) {


      this.setState({ snackbar_open: true, alert_mssg: "you are approving", snackbar_type: "info" })
      var color_change_div_class = "answer" + item.question_id;
      $('.' + color_change_div_class).css('background-color', '#b9f3b9');
      this.checkAndUpdateStatus(item, true)
    }


  }

  checkAndUpdateStatus(single_answer, is_verified) {
    var answer_status = this.state.answer_verifier_status;
    var verifier_json = this.state.verifier_json_array;
    for (var i = 0; i < verifier_json.length; i++) {
      if (verifier_json[i].question_id == single_answer.question_id) {
        verifier_json[i].is_verified = is_verified;
        this.setState({
          verifier_json_array: verifier_json
        });
        break;
      }
    }
    var is_new = true;
    for (var i = 0; i < answer_status.length; i++) {
      if (single_answer.question_id == answer_status[i].question_id) {
        answer_status[i]['is_verified'] = is_verified
        is_new = false;
      }
    }
    if (is_new) {
      answer_status.push({ "question_id": single_answer.question_id, "is_verified": is_verified })
    }
    this.setState({ answer_verifier_status: answer_status })
    console.log(answer_status);
    console.log(verifier_json);
  }

  approveResponse(item) {
    var all_condition_satisified = true;
    var check_box_class = "mandatory_check_box" + item.question_id;
    if ("data_type" in item) {
      this.setState({ show_customer_name: true });
    }
    if ($('.' + check_box_class + ':checked').length == $('.' + check_box_class).length) {
      var verifier_json = this.state.verifier_json_array;
      for (var i = 0; i < verifier_json.length; i++) {
        if (verifier_json[i].question_id == item.question_id) {
          if (verifier_json[i].question_id === 42 || verifier_json[i].question_id === 13) {
            // noop, this is a merchandizing question, temporary
            break
          }
          if (verifier_json[i].has_expiry_date == true && verifier_json[i].expiry_date == null) {

            this.setState({ snackbar_open: true, alert_mssg: "expiry date is required", snackbar_type: "error" })
            all_condition_satisified = false;
            break;
          }
          else if (verifier_json[i].has_expiry_date == true && verifier_json[i].expiry_date < this.state.startDate) {


            this.setState({ snackbar_open: true, alert_mssg: "please check your expiry date", snackbar_type: "error" })
            all_condition_satisified = false;
            break;
          }
        }
      }
      if (all_condition_satisified) {

        this.setState({ snackbar_open: true, alert_mssg: "you are approving", snackbar_type: "info" })

        var color_change_div_class = "answer" + item.question_id;
        $('.' + color_change_div_class).css('background-color', '#b9f3b9');
        this.checkAndUpdateStatus(item, true)
      }
    }
    else {

      this.setState({ snackbar_open: true, alert_mssg: "please check all boxes", snackbar_type: "warning" })
    }

  }

  handleExpiryDateCB(e, count, item) {

    var expiry_check_class = "expiry_check_box" + item.question_id;
    var disable_data_picker = "date_picker" + item.question_id;
    var verifier_json_array_loc = this.state.verifier_json_array;
    if ($('.' + expiry_check_class + ':checked').length > 0) {
      $("." + disable_data_picker).show();
      for (var i = 0; i < verifier_json_array_loc.length; i++) {
        if (verifier_json_array_loc[i].question_id == item.question_id) {
          verifier_json_array_loc[i].has_expiry_date = true;

          break;
        }
      }
      this.setState({ verifier_json_array: verifier_json_array_loc });

    }
    else {
      $("." + disable_data_picker).hide();

      for (var i = 0; i < verifier_json_array_loc.length; i++) {
        if (verifier_json_array_loc[i].question_id == item.question_id) {
          verifier_json_array_loc[i].expiry_date = null
          verifier_json_array_loc[i].has_expiry_date = false;
          break;
        }
      }
      this.setState({ verifier_json_array: verifier_json_array_loc });

    }

  }

  handleDateChange(date, single_answer, file_index) {
    var current_date = new Date();

    var verifier_json = this.state.verifier_json_array;
    for (var i = 0; i < verifier_json.length; i++) {
      if (verifier_json[i].question_id == single_answer.question_id) {
        verifier_json[i].expiry_date = date;
        this.setState({
          verifier_json_array: verifier_json
        });
        break;
      }
    }
  }

  changeOpacityApproval(item) {
    var check_box_class = "mandatory_check_box" + item.question_id;
    var approve_btn = "approve" + item.question_id;
    if ($('.' + check_box_class + ':checked').length == $('.' + check_box_class).length) {
      $('.' + approve_btn).css('opacity', '1');
    }
    else {
      $('.' + approve_btn).css('opacity', '0.5');
    }

  }

  checkComment(comment, single_answer) {

    var verifier_json = this.state.verifier_json_array;
    for (var i = 0; i < verifier_json.length; i++) {

      if (verifier_json[i].question_id == single_answer.question_id) {
        verifier_json[i].comment = comment;

        this.setState({
          verifier_json_array: verifier_json,
          is_commented: true
        });
      }

    }


    this.setState({ snackbar_open: true, alert_mssg: "you are rejecting", snackbar_type: "info" })
    console.log(this.state.verifier_json_array)

    console.log(this.state.is_commented)
    var check_box_class = "mandatory_check_box" + single_answer.question_id;
    var color_change_div_class = "answer" + single_answer.question_id;
    $('.' + color_change_div_class).css('background-color', '#ecbdbd');
    $('.' + check_box_class).removeAttr('checked');
    this.checkAndUpdateStatus(single_answer, false);
    this.setState({ is_commented: false, snackbar_open: true, alert_mssg: "you are rejecting", snackbar_type: "info" })

  }

  handleSnackBarClose() {
    this.setState({ snackbar_open: false });
  }

  handleDropdownChange(event, answer_id) {
    // debugger
    console.log(event.target.value);

    var forced_update_loc = this.state.forced_update;
    alert("Your change will overwrite user submitted document type!")
    this.setState({ snackbar_open: true, alert_mssg: "Your change will overwrite user submitted document type", snackbar_type: "info" })
    for (var i = 0; i < forced_update_loc.length; i++) {
      if (forced_update_loc[i].answer_id == answer_id) {
        forced_update_loc[i].answer = event.target.value;
        break;
      }
    }
    this.setState({ forced_update: forced_update_loc });

    console.log(this.state)

  }

  render() {
    if (this.state.loaded == true && "customer_name" in this.state.customer_info) {

      var count = -1;

      return (
        <>
          <Header>
            <HeaderService />
            <HeaderMenu />
          </Header>
          <div style={{ padding: 20 + "px", margin: 20 + "px" }}>

            {this.state.snackbar_open && <Snackbar autoHideDuration={3000} style={{ width: "100%", maxWidth: 600 + "px" }} open={this.state.snackbar_open} onClose={this.handleSnackBarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
              <MuiAlert style={{ width: "100%" }} onClose={this.handleSnackBarClose} severity={this.state.snackbar_type}>
                {this.state.alert_mssg}
              </MuiAlert>
            </Snackbar>}
            <div>
              <div>
                <h3> KYC Submisions </h3>
                <br></br>
              </div>
              <StoreInfo customer_info={this.state.customer_info}></StoreInfo>
              <br></br>

              <div>
                <VerifiedAnswer previously_verified_data={this.state.previously_verified_data} >
                </VerifiedAnswer>

                {this.state.answer_set.map((item) => {

                  count = count + 1;
                  if (item.data_type == "customer_name") {

                    this.name_change_item[0] = item;
                  }

                  if (item.is_verification_needed == true && item.data_type == "file_upload") {

                    var check_box_class = "mandatory_check_box" + item.question_id;
                    var expiry_check_class = "expiry_check_box" + item.question_id;
                    var answer_div_class = "row answer" + item.question_id;
                    var approve_btn_class = "approve_btn approve" + item.question_id;
                    return (
                      <div className={answer_div_class} >
                        <div style={{ height: 3 + "px", width: "100%", backgroundColor: "#EAEAEA" }}></div>
                        <br></br>
                        <div className="col-sm-12 col-lg-5 col-md-5">
                          <b>{item.question}</b>
                          <p>ID type</p>
                          <b>{item.doc_name}</b>
                          <select class="form-control" onChange={(e) => this.handleDropdownChange(e, item.parent_obj.answer_id)} defaultValue={item.parent_obj.default_option}>
                            {
                              item.parent_obj.options.map((qoption, i) => {

                                return (<option key={i} value={qoption.id}>{qoption.id}</option>
                                );
                              })
                            }
                          </select>
                          {/* <p>{item.doc_name}</p> */}
                          <br></br>
                          <br></br>
                          {item.verifier_questions.map((item_question) => {
                            return (<div><label><input onChange={(e) => this.changeOpacityApproval(item)} className={check_box_class} type="checkbox"></input><p>{item_question}</p></label> <br></br></div>
                            )
                          })}
                          {item.is_expiry_date_needed && (
                            <div>
                              <div><label><input className={expiry_check_class} type="checkbox" defaultChecked onChange={(e) => this.handleExpiryDateCB(e, count, item)} ></input><p>ID has expiry date</p></label> <br></br></div>
                              <div className={"date_picker" + item.question_id}>
                                <p>Expiry Date</p>
                                <DatePicker id={item.question_id}
                                  selected={this.state.verifier_json_array[count].expiry_date}
                                  onChange={(e) => this.handleDateChange(e, item, count)}
                                />
                              </div>
                              <br></br>
                              <br></br>
                            </div>
                          )}


                        </div>
                        <div className="col-sm-12 col-lg-6 col-md-6" >
                          <img 
                            draggable="false" 
                            style={{ width: "100%", height: "auto", objectFit: "contain" }} 
                            src={item.answer} alt="not visible" 
                            onLoad={(e) => {
                              const img = e.target;
                              if (0.75 < img.naturalWidth || img.naturalHeight < 1.25) {
                                img.style.maxHeight= "460px";
                                img.style.maxWidth= "100%";
                              }
                          }}/>
                        </div>
                        <br>
                        </br>
                        <div style={{ display: "inline-block", margin: "auto", padding: 30 + "px", width: "100%", textAlign: "center" }}>
                          <input value="Approve" id="" className={approve_btn_class} type="button" style={{ opacity: 0.5 }} onClick={() => this.approveResponse(item)}></input>
                          <CommentModal item={item} getSelectedComment={(e) => this.checkComment(e, item)}>
                          </CommentModal>
                        </div>
                      </div>)
                  }

                  else if (item.is_verification_needed == true) {
                    var answer_div_class = "row answer" + item.question_id;
                    console.log(item)
                    return (
                      <div className={answer_div_class} >
                        <div style={{ height: 3 + "px", width: "100%", backgroundColor: "#EAEAEA" }}></div>
                        <br></br>
                        <div className="col-sm-12 col-lg-5 col-md-5">
                          <b>{item.question}</b>
                          <br></br>
                          <br></br>
                          <p>{item.answer}</p>
                          {item.verifier_questions.map((item_question) => {
                            return (<div><label><input className={check_box_class} type="checkbox"></input><p>{item_question}</p></label> <br></br></div>
                            )
                          })}

                        </div>
                        <br></br>
                        <div style={{ display: "inline-block", margin: "auto", padding: 30 + "px", width: "100%", textAlign: "center" }}>

                          <input value="Approve" className="approve_btn" type="button" onClick={() => this.approveResponse(item)}></input>
                          {item.comment_questions.length > 0 &&
                            <CommentModal item={item} getSelectedComment={(e) => this.checkComment(e, item)}>
                            </CommentModal>
                          }
                          {item.comment_questions.length == 0 && <input value="Reject" type="button" className="reject_btn" onClick={() => this.rejectResponse(item, false)}></input>}

                        </div>
                      </div>)

                  }

                })
                }

                {this.name_change_item.map((item) => {
                  console.log(item)

                  if ("data_type" in item && this.state.show_customer_name) {
                    return (
                      <CustomerNameChange item={item} customer_name={this.state.customer_info.owner_name} nameChangeResponse={(e) => this.nameChangeResponse(e, item)}>
                      </CustomerNameChange>

                    );
                  }
                })}
              </div>

            </div>
            <div style={{ display: "inline-block", margin: "auto", padding: 30 + "px", paddingBottom: 10 + "px", width: "100%", textAlign: "center" }}>
              <input value="Submit" className="approve_btn" type="button" onClick={this.submitVerifierResponse}></input>
            </div>
            <div style={{ display: "inline-block", margin: "auto", padding: 30 + "px", paddingTop: 10 + "px", width: "100%", textAlign: "center" }}>
              <input value="Skip" className="skip_btn" type="button" onClick={this.skipVerifierResponse}></input>
            </div>
          </div>
        </>
      );
    }
    else if (this.state.loaded == true && !this.state.customer_info.hasOwnProperty("customer_name")) {

      return (<div style={{ "textAlign": "center", "margin": "auto", "color": "#ff6501" }}>
        <Header>

          <HeaderService />
          <HeaderMenu />
        </Header>

        <input type="button" className="btn btn-primary-alt" value="Get Data" onClick={this.getAnswersToVerify} style={{ "color": "#ff6501", "borderColor": "#ff6501", marginTop: 20 + "px" }}></input>

      </div>)
    }
    else if (this.state.loaded == false) {
      return (
        <ProgressBar
          loading={this.state.loaded}
          message={
            <a className="btn btn-primary btn-lg" href="#" role="button">
              Learn more
            </a>
          }
        />
      );
    }
  }
}

export default VerifierPanelComponent;
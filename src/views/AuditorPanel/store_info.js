import React from 'react';
import $ from 'jquery';
import '../../css/index.css';

export default class StoreInfo extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-4 col-lg-4 col-md-4">
                        <div>
                            Store Name
                            <br></br>
                            {this.props.customer_info.customer_name}
                        </div>
                    </div>
                    <div className="col-sm-4 col-lg-4 col-md-4">
                        <div>
                            Owner
                            <br></br>
                            {this.props.customer_info.owner_name},
                            {this.props.customer_info.username}
                        </div>
                    </div>
                    <div className="col-sm-4 col-lg-4 col-md-4">
                        <div>
                            Address
                            <br></br>
                            {this.props.customer_info.address},{this.props.customer_info.locality},{this.props.customer_info.city}
                            ,{this.props.customer_info.province}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
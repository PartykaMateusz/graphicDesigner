import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import EditOrderForm from "../../components/Forms/EditOrderForm";
import "../Index/index.css";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getOrder } from "../../actions/orderActions";

class EditOrder extends Component {
  constructor(props) {
    super(props);
    this.state = { orderId: this.props.match.params.id, order: {} };
  }

  componentDidMount() {
    this.props.getOrder(this.state.orderId);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.order !== this.state.order) {
      this.setState({
        order: nextProps.order
      });
    }
  }

  render() {
    return (
      <div className="indexContainer">
        <Navbar history={this.props.history} />
        <div className="row">
          <div className="col-md-8 offset-md-2 profile border rounded">
            <EditOrderForm
              history={this.props.history}
              order={this.state.order}
            />
          </div>
        </div>
      </div>
    );
  }
}

EditOrder.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getOrder: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile,
  order: state.order
});

export default connect(
  mapStateToProps,
  { getOrder }
)(EditOrder);

import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOrderProposals } from "../../actions/proposalService";

class OrderProposals extends Component {
  constructor(props) {
    super(props);
    this.state = { orderId: this.props.match.params.id, proposals: {} };
  }

  componentDidMount() {
    this.props.getOrderProposals(this.state.orderId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orderProposals !== this.state.proposals) {
      this.setState({
        proposals: nextProps.orderProposals
      });
    }
  }

  render() {
    return (
      <div>
        <Navbar history={this.props.history} />
        TEST {this.state.orderId}
      </div>
    );
  }
}

OrderProposals.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getOrderProposals: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile,
  orderProposals: state.orderProposals
});

export default connect(
  mapStateToProps,
  { getOrderProposals }
)(OrderProposals);

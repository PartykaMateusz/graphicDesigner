import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserProposals } from "../../actions/proposalService";
import Order from "../../components/Order/Order";
import { Loading } from "../../components/Loading/Loading";
import { Stats } from "../../components/Stats/Stats";

import "./DesignerPanel.css";
import { ROLE_DESIGNER } from "../../actions/types";

class DesignerPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { profile: {}, proposals: {} };

    this.redirectToOrder = this.redirectToOrder.bind(this);
  }

  componentDidMount() {
    if (this.props.profile.data !== this.state.profile) {
      this.setState({
        profile: this.props.profile.data
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.data !== this.state.profile) {
      this.setState({
        profile: nextProps.profile.data
      });
      if (nextProps.profile.data.id) {
        this.props.getUserProposals(nextProps.profile.data.id);
      }
    }

    if (nextProps.orderProposals.content !== this.state.proposals) {
      this.setState({
        proposals: nextProps.orderProposals.content
      });
    }
  }

  redirectToOrder(id) {
    this.props.history.push(`/order/${id}`);
  }

  generateProposals(orders) {
    let arr = [];
    for (var i in orders) {
      arr.push(
        <Order
          key={orders[i].order.id}
          id={orders[i].order.id}
          subject={orders[i].order.subject}
          username={orders[i].order.user.username}
          price={orders[i].order.price}
          categories={orders[i].order.categoryList}
          redirectToOrder={this.redirectToOrder}
          history={this.props.history}
        />
      );
    }

    return arr;
  }

  render() {
    if (this.state.proposals === undefined) {
      return (
        <React.Fragment>
          <Navbar history={this.props.history} />
          <Loading />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Navbar history={this.props.history} />
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="panelStats">
                <Stats
                  role={ROLE_DESIGNER}
                  actualProposals={this.state.profile.actualProposalsNumber}
                  allProposals={0}
                  actualJobs={0}
                  allJobs={0}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 offset-md-1">
              <div className="myProposals">
                <h2>Moje zgłoszenia:</h2>
                {this.generateProposals(this.state.proposals)}
              </div>
            </div>

            <div className="col-md-4 offset-md-1">
              <div className="myProposals"></div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

DesignerPanel.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getUserProposals: PropTypes.func.isRequired,
  orderProposals: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile,
  orderProposals: state.orderProposals
});

export default connect(
  mapStateToProps,
  { getUserProposals }
)(DesignerPanel);

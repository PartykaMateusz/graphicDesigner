import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Order.css";
import { getOrder } from "../../actions/orderActions";
import {
  addProposal,
  cancelProposal,
  getOrderProposals
} from "../../actions/proposalService";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Loading } from "../../components/Loading/Loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faArrowAltCircleLeft
} from "@fortawesome/free-solid-svg-icons";
import { ROLE_DESIGNER } from "../../actions/types";

import "./Order.css";

const JoinButton = ({ addProposal }) => (
  <button
    type="button"
    className="btn btn-primary btn-lg mt-4 buttonWork"
    onClick={() => addProposal()}
  >
    Zgłoś się
  </button>
);

const CancelButton = ({ cancelProposal }) => (
  <button
    type="button"
    className="btn btn-warning btn-lg mt-4 buttonWork"
    onClick={() => cancelProposal()}
  >
    Anuluj
  </button>
);

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: this.props.match.params.id,
      order: {},
      orderCreator: {},
      creatorAvatar: {},
      ActUserRole: null,
      proposals: {},
      userInProposals: false
    };

    this.ifUserIsInProposals = this.ifUserIsInProposals.bind(this);
  }

  componentDidMount() {
    this.props.getOrder(this.state.orderId);
    this.props.getOrderProposals(this.state.orderId);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.order !== this.state.order) {
      this.setState({
        order: nextProps.order
      });
    }

    if (nextProps.order.user !== this.state.orderCreator) {
      this.setState({
        orderCreator: nextProps.order.user
      });
    }

    if (nextProps.profile.data.role !== this.state.ActUserRole) {
      this.setState({
        ActUserRole: nextProps.profile.data.role
      });
    }

    if (nextProps.orderProposals !== this.state.proposals) {
      this.setState(
        {
          proposals: nextProps.orderProposals
        },
        function() {
          this.ifUserIsInProposals();
        }
      );
    }
  }

  redirectBack = () => {
    this.props.history.goBack();
  };

  redirectToProfile = userId => {
    this.props.history.push(`/profile/${userId}`);
  };

  AddButtonIfRoleIsDesigner = () => {
    if (this.state.ActUserRole === ROLE_DESIGNER) {
      if (this.state.userInProposals) {
        return <CancelButton cancelProposal={this.cancelProposal} />;
      } else {
        return <JoinButton addProposal={this.addProposal} />;
      }
    }
  };

  cancelProposal = () => {
    let designerId = this.props.profile.data.id;
    let orderId = parseInt(this.state.orderId);

    this.props.cancelProposal(designerId, orderId).then(func => {
      this.props.getOrderProposals(this.state.orderId);
    });
    //this.props.getOrderProposals(this.state.orderId);
  };

  addProposal = () => {
    const proposal = {
      designerId: this.props.profile.data.id,
      orderId: parseInt(this.state.orderId)
    };

    this.props.addProposal(proposal).then(func => {
      this.props.getOrderProposals(this.state.orderId);
    });
    //this.props.getOrderProposals(this.state.orderId);
  };

  ifUserIsInProposals() {
    let bool = false;
    let proposals = { ...this.state.proposals.proposals };
    let userId = this.props.profile.data.id;
    if (proposals !== null) {
      Object.keys(proposals).forEach(function(key) {
        if (proposals[key].user.id === userId) {
          bool = true;
        }
      });
      this.setState({
        userInProposals: bool
      });
    }
  }

  render() {
    if (
      this.state.orderCreator === undefined ||
      this.state.orderCreator.avatar === undefined ||
      this.state.proposals === undefined
    ) {
      return (
        <React.Fragment>
          <Navbar history={this.props.history} />
          <Loading />
        </React.Fragment>
      );
    } else {
      return (
        <div>
          <Navbar history={this.props.history} />

          <div className="description-section mt-5">
            <div className="arrowIcon">
              <FontAwesomeIcon
                icon={faArrowAltCircleLeft}
                onClick={() => this.redirectBack()}
              />
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-4 mt-2">
                  <div className="desc-image">
                    <img
                      className="user-avatar rounded"
                      src={this.state.orderCreator.avatar.base64}
                    />
                  </div>
                  <div
                    className="username mt-2 mb-2 ml-1"
                    onClick={() =>
                      this.redirectToProfile(this.state.orderCreator.id)
                    }
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <span>{this.state.orderCreator.username}</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="desc-title">
                    <h2>{this.state.order.subject}</h2>
                    <p>{this.state.order.text}</p>

                    <h4>Cena: </h4>
                    <p>{this.state.order.price} zł</p>
                    <h4>Dodane:</h4>
                    <p>{this.state.order.date}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-2 offset-md-10 proposalNumber">
                <FontAwesomeIcon icon={faUsers} />
                <span>{this.state.proposals.size}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 offset-md-3">
                {this.AddButtonIfRoleIsDesigner()}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

Order.propTypes = {
  errors: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  addProposal: PropTypes.func.isRequired,
  cancelProposal: PropTypes.func.isRequired,
  getOrderProposals: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  order: state.order,
  profile: state.profile,
  orderProposals: state.orderProposals
});

export default connect(
  mapStateToProps,
  { getOrder, addProposal, cancelProposal, getOrderProposals }
)(Order);

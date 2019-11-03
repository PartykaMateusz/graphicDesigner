import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Order.css";
import { getOrder } from "../../actions/orderActions";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Loading } from "../../components/Loading/Loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faArrowAltCircleLeft
} from "@fortawesome/free-solid-svg-icons";
import { ROLE_DESIGNER } from "../../actions/types";

const JoinButton = ({}) => (
  <button
    type="button"
    id="buttonJoinToWork"
    className="btn btn-primary btn-lg mt-4"
  >
    Zgłoś się
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
      ActUserRole: null
    };
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
  }

  redirectBack = () => {
    this.props.history.goBack();
  };

  redirectToProfile = userId => {
    this.props.history.push(`/profile/${userId}`);
  };

  AddButtonIfRoleIsDesigner = () => {
    if (this.state.ActUserRole === ROLE_DESIGNER) {
      return <JoinButton />;
    }
  };

  render() {
    if (
      this.state.orderCreator === undefined ||
      this.state.orderCreator.avatar === undefined
    ) {
      return <Loading />;
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
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  order: state.order,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getOrder }
)(Order);

import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserOrders } from "../../actions/orderActions";
import { Stats } from "../../components/Stats/Stats";
import Order from "../../components/Order/Order";
import { ROLE_USER } from "../../actions/types";
import { Loading } from "../../components/Loading/Loading";

class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { profile: {}, orders: {} };
  }

  componentDidMount() {
    if (this.props.profile.data !== this.state.profile) {
      this.setState({
        profile: this.props.profile.data,
        page: 0,
        numberOnOnePage: 10,
        selectedOrder: null,
        showOrderProposals: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.data !== this.state.profile) {
      this.setState({
        profile: nextProps.profile.data
      });
      if (nextProps.profile.data.id) {
        this.props.getUserOrders(
          this.state.page,
          this.state.numberOnOnePage,
          nextProps.profile.data.id
        );
      }
    }

    if (nextProps.orders.content !== this.state.orders) {
      this.setState({
        orders: nextProps.orders.content
      });
    }
  }

  generateOrders(orders) {
    let arr = [];
    for (var i in orders) {
      arr.push(
        <Order
          key={orders[i].id}
          id={orders[i].id}
          subject={orders[i].subject}
          username={orders[i].user.username}
          price={orders[i].price}
          categories={orders[i].categoryList}
          redirectToOrder={this.showOrderProposals}
          history={this.props.history}
        />
      );
    }

    return arr;
  }

  showOrderProposals = () => {};

  render() {
    if (this.state.orders === undefined) {
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
                  role={ROLE_USER}
                  actualProposals={this.state.profile.actualOrderNumber}
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
                <h2>Moje Zlecenia:</h2>
                {this.generateOrders(this.state.orders)}
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

UserPanel.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getUserOrders: PropTypes.func.isRequired,
  orders: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile,
  orders: state.orders
});

export default connect(
  mapStateToProps,
  { getUserOrders }
)(UserPanel);

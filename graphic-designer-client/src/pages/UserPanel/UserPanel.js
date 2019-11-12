import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserOrders } from "../../actions/orderActions";
import { Stats } from "../../components/Stats/Stats";
import Order from "../../components/Order/Order";
import { ROLE_USER } from "../../actions/types";
import { Loading } from "../../components/Loading/Loading";
import "./UserPanel.css";
import { template } from "@babel/core";

const SelectedOrder = ({ order }) => (
  <div>
    <div>Id: {order.id}</div>
    <div>Temat: {order.subject}</div>
  </div>
);

class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { profile: {}, orders: {} };
  }

  componentDidMount() {
    if (this.props.profile.data !== this.state.profile) {
      this.setState({
        profile: this.props.profile.data,
        pageNumber: 0,
        totalPages: 0,
        ordersInOnePage: 10,
        selectedOrder: null,
        showOrderProposals: false
      });
    }

    this.changePage = this.changePage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.data !== this.state.profile) {
      this.setState({
        profile: nextProps.profile.data
      });
      if (nextProps.profile.data.id) {
        this.props.getUserOrders(
          0,
          this.state.ordersInOnePage,
          nextProps.profile.data.id
        );
      }
    }

    if (nextProps.orders.content !== this.state.orders) {
      this.setState({
        orders: nextProps.orders.content,
        pageNumber: nextProps.orders.number,
        totalPages: nextProps.orders.totalPages
      });
    }
  }

  generatePagination(pageNumber, totalPages) {
    let arr = [];

    arr.push(<a onClick={() => this.changePage(0)}>&laquo;</a>);

    for (let i = 0; i < totalPages; i++) {
      if (i === pageNumber) {
        arr.push(
          <a key={i} className="active" onClick={() => this.changePage(i)}>
            {i + 1}
          </a>
        );
      } else {
        arr.push(
          <a key={i} onClick={() => this.changePage(i)}>
            {i + 1}
          </a>
        );
      }
    }

    arr.push(<a onClick={() => this.changePage(totalPages - 1)}>&raquo;</a>);

    return arr;
  }

  changePage(pageNumber) {
    this.props.getUserOrders(
      pageNumber,
      this.state.ordersInOnePage,
      this.state.profile.id
    );
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

  generateSelectedOrder = () => {
    if (this.state.showOrderProposals && this.state.selectedOrder !== null) {
      return <SelectedOrder order={this.state.selectedOrder} />;
    }
  };

  showOrderProposals = id => {
    let tempArray = [...this.state.orders];
    let tempSelectedOrder = tempArray.find(x => x.id === id);

    this.setState({
      showOrderProposals: true,
      selectedOrder: tempSelectedOrder
    });
  };

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
          <div className="container">
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
                  <div className="pagination mt-5 ">
                    {this.generatePagination(
                      this.state.pageNumber,
                      this.state.totalPages
                    )}
                  </div>
                  {this.generateOrders(this.state.orders)}
                </div>
              </div>

              <div className="col-md-4 offset-md-1">
                <div className="myProposals">
                  <h2>Wybrane zlecenie:</h2>
                  <div
                    className={
                      this.state.showOrderProposals
                        ? "orderProposalsShow"
                        : "orderProposalsHidden"
                    }
                  >
                    {this.generateSelectedOrder()}
                  </div>
                </div>
              </div>
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

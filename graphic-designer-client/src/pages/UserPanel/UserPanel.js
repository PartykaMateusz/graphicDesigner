import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserOrders } from "../../actions/orderActions";
import { getClientJobs } from "../../actions/jobActions";
import { Stats } from "../../components/Stats/Stats";
import Order from "../../components/Order/Order";
import { ROLE_USER } from "../../actions/types";
import { Loading } from "../../components/Loading/Loading";
import "./UserPanel.css";

class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { profile: {}, orders: {}, jobs: {} };
  }

  componentDidMount() {
    if (this.props.profile.data !== this.state.profile) {
      this.setState({
        profile: this.props.profile.data,
        pageNumberOrder: 0,
        totalPagesOrder: 0,
        ordersInOnePage: 10,

        pageNumberJob: 0,
        totalPagesJob: 0,
        jobsInOnePage: 10
      });
    }

    this.changePageOrder = this.changePageOrder.bind(this);
    this.redirectToOrder = this.redirectToOrder.bind(this);
    this.redirectToJob = this.redirectToJob.bind(this);
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

        this.props.getClientJobs(
          0,
          this.state.jobsInOnePage,
          nextProps.profile.data.id
        );
      }
    }

    if (nextProps.orders.content !== this.state.orders) {
      this.setState({
        orders: nextProps.orders.content,
        pageNumberOrder: nextProps.orders.number,
        totalPagesOrder: nextProps.orders.totalPages
      });
    }

    if (nextProps.jobs.content !== this.state.jobs) {
      this.setState({
        jobs: nextProps.jobs.content,
        pageNumberJob: nextProps.jobs.number,
        totalPagesJob: nextProps.jobs.totalPages
      });
    }
  }

  generatePaginationOrder(pageNumber, totalPages) {
    let arr = [];

    arr.push(<a onClick={() => this.changePageOrder(0)}>&laquo;</a>);

    for (let i = 0; i < totalPages; i++) {
      if (i === pageNumber) {
        arr.push(
          <a key={i} className="active" onClick={() => this.changePageOrder(i)}>
            {i + 1}
          </a>
        );
      } else {
        arr.push(
          <a key={i} onClick={() => this.changePageOrder(i)}>
            {i + 1}
          </a>
        );
      }
    }

    arr.push(
      <a onClick={() => this.changePageOrder(totalPages - 1)}>&raquo;</a>
    );

    return arr;
  }

  generatePaginationJobs(pageNumber, totalPages) {
    let arr = [];

    arr.push(<a onClick={() => this.changePageJobs(0)}>&laquo;</a>);

    for (let i = 0; i < totalPages; i++) {
      if (i === pageNumber) {
        arr.push(
          <a key={i} className="active" onClick={() => this.changePageJobs(i)}>
            {i + 1}
          </a>
        );
      } else {
        arr.push(
          <a key={i} onClick={() => this.changePageJobs(i)}>
            {i + 1}
          </a>
        );
      }
    }

    arr.push(
      <a onClick={() => this.changePageJobs(totalPages - 1)}>&raquo;</a>
    );

    return arr;
  }

  changePageOrder(pageNumber) {
    this.props.getUserOrders(
      pageNumber,
      this.state.ordersInOnePage,
      this.state.profile.id
    );
  }

  changePageJob(pageNumber) {
    this.props.getClientJobs(
      pageNumber,
      this.state.jobsInOnePage,
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
          redirectToOrder={this.redirectToOrder}
          history={this.props.history}
        />
      );
    }

    return arr;
  }

  generateJobs(jobs) {
    let arr = [];
    for (var i in jobs) {
      arr.push(
        <Order
          key={jobs[i].id}
          id={jobs[i].id}
          subject={jobs[i].fromOrder.subject}
          username={jobs[i].designer.username}
          price={jobs[i].fromOrder.price}
          categories={jobs[i].fromOrder.categoryList}
          redirectToOrder={this.redirectToJob}
          history={this.props.history}
        />
      );
    }

    return arr;
  }

  redirectToOrder(id) {
    this.props.history.push(`/order/${id}`);
  }

  redirectToJob(id) {
    this.props.history.push(`/job/${id}`);
  }

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
                    {this.generatePaginationOrder(
                      this.state.pageNumberOrder,
                      this.state.totalPagesOrder
                    )}
                  </div>
                  {this.generateOrders(this.state.orders)}
                </div>
              </div>

              <div className="col-md-4 offset-md-1">
                <div className="myProposals">
                  <h2>Moje prace:</h2>
                  <div className="pagination mt-5 ">
                    {this.generatePaginationJobs(
                      this.state.pageNumberJob,
                      this.state.totalPagesJob
                    )}
                  </div>
                  {this.generateJobs(this.state.jobs)}
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
  orders: PropTypes.object.isRequired,
  getClientJobs: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile,
  orders: state.orders,
  jobs: state.jobs
});

export default connect(mapStateToProps, { getUserOrders, getClientJobs })(
  UserPanel
);

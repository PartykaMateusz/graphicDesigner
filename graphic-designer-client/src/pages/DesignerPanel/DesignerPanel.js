import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserProposals } from "../../actions/proposalService";
import { getDesignerJobs } from "../../actions/jobActions";
import Order from "../../components/Order/Order";
import { Loading } from "../../components/Loading/Loading";
import { Stats } from "../../components/Stats/Stats";

import "./DesignerPanel.css";
import { ROLE_DESIGNER } from "../../actions/types";
import RateList from "../../components/Tables/RateList";

class DesignerPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      proposals: {},
      pageNumberProposals: 0,
      totalPagesProposals: 0,
      proposalsInOnePage: 10,

      pageNumberJobs: 0,
      totalPagesJobs: 0,
      jobsInOnePage: 10
    };

    this.redirectToOrder = this.redirectToOrder.bind(this);
    this.redirectToJob = this.redirectToJob.bind(this);
    this.changePageJobs = this.changePageJobs.bind(this);
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
        this.props.getUserProposals(
          0,
          this.state.proposalsInOnePage,
          nextProps.profile.data.id
        );

        this.props.getDesignerJobs(
          0,
          this.state.jobsInOnePage,
          nextProps.profile.data.id
        );
      }
    }

    if (nextProps.orderProposals.content !== this.state.proposals) {
      this.setState({
        proposals: nextProps.orderProposals.content,
        pageNumberProposals: nextProps.orderProposals.number,
        totalPagesProposals: nextProps.orderProposals.totalPages
      });
    }

    if (nextProps.jobs.content !== this.state.jobs) {
      this.setState({
        jobs: nextProps.jobs.content,
        pageNumberJobs: nextProps.jobs.number,
        totalPagesJobs: nextProps.jobs.totalPages
      });
    }
  }

  redirectToOrder(id) {
    this.props.history.push(`/order/${id}`);
  }

  redirectToJob(id) {
    this.props.history.push(`/job/${id}`);
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

  generatePaginationProposals(pageNumber, totalPages) {
    let arr = [];

    arr.push(<a onClick={() => this.changePageProposals(0)}>&laquo;</a>);

    for (let i = 0; i < totalPages; i++) {
      if (i === pageNumber) {
        arr.push(
          <a
            key={i}
            className="active"
            onClick={() => this.changePageProposals(i)}
          >
            {i + 1}
          </a>
        );
      } else {
        arr.push(
          <a key={i} onClick={() => this.changePageProposals(i)}>
            {i + 1}
          </a>
        );
      }
    }

    arr.push(
      <a onClick={() => this.changePageProposals(totalPages - 1)}>&raquo;</a>
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

  changePageProposals(pageNumber) {
    this.props.getUserProposals(
      pageNumber,
      this.state.proposalsInOnePage,
      this.state.profile.id
    );
  }

  changePageJobs(pageNumber) {
    this.props.getDesignerJobs(
      pageNumber,
      this.state.jobsInOnePage,
      this.state.profile.id
    );
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
          <div className="container">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                <div className="panelStats">
                  <Stats
                    role={ROLE_DESIGNER}
                    actualProposals={this.state.profile.actualProposalsNumber}
                    allProposals={this.state.profile.allProposalsNumber}
                    actualJobs={this.state.profile.actualJobsNumber}
                    allJobs={this.state.profile.finishedJobsNumber}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 offset-md-1">
                <div className="myProposals">
                  <h2>Moje zgłoszenia:</h2>
                  <div className="pagination mt-5 ">
                    {this.generatePaginationProposals(
                      this.state.pageNumberProposals,
                      this.state.totalPagesProposals
                    )}
                  </div>
                  {this.generateProposals(this.state.proposals)}
                </div>
              </div>

              <div className="col-md-4 offset-md-1">
                <div className="myProposals">
                  <h2>Moje prace:</h2>
                  <div className="pagination mt-5 ">
                    {this.generatePaginationJobs(
                      this.state.pageNumberJobs,
                      this.state.totalPagesJobs
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

DesignerPanel.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  jobs: PropTypes.object.isRequired,
  getUserProposals: PropTypes.func.isRequired,
  orderProposals: PropTypes.object.isRequired,
  getDesignerJobs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile,
  orderProposals: state.orderProposals,
  jobs: state.jobs
});

export default connect(mapStateToProps, { getUserProposals, getDesignerJobs })(
  DesignerPanel
);

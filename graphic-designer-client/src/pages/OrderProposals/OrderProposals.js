import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOrderProposals } from "../../actions/proposalService";
import "./OrderProposals.css";
import { Loading } from "../../components/Loading/Loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

const Proposal = ({ userId, username, date, showProfile, selectDesigner }) => (
  <div className="proposalInfo mt-4">
    <div className="container">
      <div className="row">
        <div className="proposalUsername col-md-10">{username}</div>
        <div className="proposalButton col-md-2">
          <button
            type="button"
            className="btn btn-info"
            onClick={() => showProfile(userId)}
          >
            Zobacz Profil
          </button>
        </div>
        <div className="proposalDate col-md-10">{date}</div>
        <div className="proposalButton col-md-2">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => selectDesigner(userId)}
          >
            Wybierz Grafika
          </button>
        </div>
      </div>
    </div>
  </div>
);

class OrderProposals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: this.props.match.params.id,
      proposals: {},
      pageNumber: 0,
      totalPages: 0,
      proposalsInOnePage: 10
    };

    this.generateProposals = this.generateProposals.bind(this);
  }

  componentDidMount() {
    this.props.getOrderProposals(
      this.state.orderId,
      0,
      this.state.proposalsInOnePage
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orderProposals !== this.state.proposals) {
      this.setState({
        proposals: nextProps.orderProposals.content,
        pageNumber: nextProps.orderProposals.number,
        totalPages: nextProps.orderProposals.totalPages
      });
    }
  }

  redirectBack = () => {
    this.props.history.goBack();
  };

  showUserProfile = id => {
    this.props.history.push(`/profile/${id}`);
  };

  selectDesigner = id => {
    console.log("designer : " + id);
  };

  generateProposals(proposals) {
    let arr = [];
    for (var i in proposals) {
      arr.push(
        <Proposal
          key={proposals[i].proposal_id}
          userId={proposals[i].user.id}
          username={proposals[i].user.username}
          date={proposals[i].time}
          showProfile={this.showUserProfile}
          selectDesigner={this.selectDesigner}
        />
      );
    }

    return arr;
  }

  generatePagination(pageNumber, totalPages) {
    let arr = [];

    arr.push(
      <a key={-1} onClick={() => this.changePage(0)}>
        &laquo;
      </a>
    );

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

    arr.push(
      <a key={100} onClick={() => this.changePage(totalPages - 1)}>
        &raquo;
      </a>
    );

    return arr;
  }

  changePage(pageNumber) {
    this.props.getOrderProposals(
      this.state.orderId,
      pageNumber,
      this.state.proposalsInOnePage
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
        <div>
          <Navbar history={this.props.history} />
          <div className="container mt-3">
            <div className="row">
              <div className="col-md-1">
                <div className="arrowIcon">
                  <FontAwesomeIcon
                    icon={faArrowAltCircleLeft}
                    onClick={() => this.redirectBack()}
                  />
                </div>
              </div>
              <div className="col-md-10 proposalsHeader mb-3">
                Lista zgłoszeń:
              </div>
            </div>
            <div className="col-md-12">
              <div className="pagination mt-2 text-center ">
                {this.generatePagination(
                  this.state.pageNumber,
                  this.state.totalPages
                )}
              </div>
              <div className="proposalsContent">
                {this.generateProposals(this.state.proposals)}
              </div>
            </div>
          </div>
        </div>
      );
    }
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

export default connect(mapStateToProps, { getOrderProposals })(OrderProposals);

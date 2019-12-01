import React, { Component } from "react";
import { List } from "antd";
import "./RateList.css";
import StarRatings from "../../../node_modules/react-star-ratings";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRatingByUserId } from "../../actions/rateActions";
import { Loading } from "../Loading/Loading";

const MyItem = ({ client, description, stars, redirectToUser }) => (
  <div className="rateItem container">
    <div className="row">
      <div
        className="username col-md-3"
        onClick={() => redirectToUser(client.id)}
      >
        {client.username}
      </div>
      <div className="stars col-md-9">
        <StarRatings
          rating={stars}
          starDimension="30px"
          starSpacing="7px"
          numberOfStars={10}
          starRatedColor="orange"
        />
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">{description}</div>
    </div>
  </div>
);

class RateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      pageNumber: 0,
      totalPages: 0,
      ordersInOnePage: 10
    };
  }

  componentDidMount() {
    this.props.getRatingByUserId(
      this.state.userId,
      0,
      this.state.ordersInOnePage
    );
  }

  componentWillUpdate(nextProps) {
    if (
      nextProps.rate.content !== undefined &&
      nextProps.rate.content !== this.state.rates
    ) {
      this.setState({
        rates: nextProps.rate.content,
        pageNumber: nextProps.rate.number,
        totalPages: nextProps.rate.totalPages
      });
    }

    if (this.state.userId !== nextProps.userId) {
      this.setState({
        userId: nextProps.userId
      });
      this.props.getRatingByUserId(
        nextProps.userId,
        0,
        this.state.ordersInOnePage
      );
    }
  }

  redirectToUser = id => {
    this.props.history.push(`/profile/${id}`);
  };

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
    this.props.getRatingByUserId(
      this.state.userId,
      pageNumber,
      this.state.ordersInOnePage
    );
  }

  render() {
    if (this.state.rates === undefined) {
      return <Loading />;
    }
    if (this.state.rates.length === 0) {
      return <div></div>;
    } else {
      return (
        <div className="container">
          <div className="col-sm-10 offset-sm-1">
            <div className="pagination mt-5 rateListPagination">
              <div className="centerDiv">
                {this.generatePagination(
                  this.state.pageNumber,
                  this.state.totalPages
                )}
              </div>
            </div>
            <List
              itemLayout="horizontal"
              dataSource={this.state.rates}
              bordered={true}
              renderItem={item => (
                <MyItem
                  client={item.job.client}
                  stars={item.rate}
                  description={item.comment}
                  redirectToUser={this.redirectToUser}
                />
              )}
            />
          </div>
        </div>
      );
    }
  }
}

RateList.propTypes = {
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
  getRatingByUserId: PropTypes.func.isRequired,
  rate: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security,
  rate: state.rate
});

export default connect(mapStateToProps, { getRatingByUserId })(RateList);

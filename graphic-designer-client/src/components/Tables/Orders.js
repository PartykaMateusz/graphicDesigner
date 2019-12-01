import React, { Component } from "react";
import "./Orders.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOrders, searchOrders } from "../../actions/orderActions";
import { Loading } from "../../components/Loading/Loading";
import Order from "../Order/Order";

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: {},
      pageNumber: 0,
      totalPages: 0,
      ordersInOnePage: 10
    };

    this.generateOrders = this.generateOrders.bind(this);
    this.changePage = this.changePage.bind(this);
    this.redirectToOrder = this.redirectToOrder.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmitSearch = this.onSubmitSearch.bind(this);
  }

  componentDidMount() {
    this.props.getOrders(0, this.state.ordersInOnePage);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orders) {
      this.setState({
        orders: nextProps.orders.content,
        pageNumber: nextProps.orders.number,
        totalPages: nextProps.orders.totalPages,
        search: ""
      });
    }
  }

  redirectToOrder(id) {
    this.props.history.push(`/order/${id}`);
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
          date={orders[i].date}
          redirectToOrder={this.redirectToOrder}
        />
      );
    }

    return arr;
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
    this.props.getOrders(pageNumber, this.state.ordersInOnePage);
  }

  onSubmitSearch(e) {
    e.preventDefault();
    this.props.searchOrders(
      this.state.pageNumber,
      this.state.ordersInOnePage,
      this.state.search
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="orders">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-8">
              <div className="pagination  ">
                {this.generatePagination(
                  this.state.pageNumber,
                  this.state.totalPages
                )}
              </div>
            </div>
            <div className="col-md-4 ">
              <form
                className="form-inline mr-0 text-right"
                onSubmit={this.onSubmitSearch}
              >
                <div className="md-form">
                  <input
                    className="form-control searchOrderInput"
                    type="text"
                    placeholder="Szukaj"
                    aria-label="Search"
                    name="search"
                    value={this.state.search}
                    onChange={this.onChange}
                  />
                </div>
                <button className="btn btn-outline-white btn-md" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
        {this.generateOrders(this.state.orders)}
      </div>
    );
  }
}

Orders.propTypes = {
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
  getOrders: PropTypes.func.isRequired,
  searchOrders: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security,
  orders: state.orders
});

export default connect(mapStateToProps, { getOrders, searchOrders })(Orders);

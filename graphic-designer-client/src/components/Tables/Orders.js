import React, { Component } from "react";
import "./Orders.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOrders } from "../../actions/orderActions";

const Order = ({
  id,
  subject,
  username,
  price,
  categories,
  redirectToOrder
}) => (
  <div className="order row" onClick={() => redirectToOrder(id)}>
    <div className="col-md-4 orderName">{subject}</div>
    <div className="col-md-4 orderUser">{username}</div>
    <div className="col-md-4 orderPrice">{price} zł</div>
    <div className="col-md-10 orderCategory">Kategorie: {categories}</div>
  </div>
);

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
  }

  componentDidMount() {
    this.props.getOrders(0, this.state.ordersInOnePage);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orders) {
      this.setState({
        orders: nextProps.orders.content,
        pageNumber: nextProps.orders.number,
        totalPages: nextProps.orders.totalPages
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
          username={orders[i].userDto.username}
          price={orders[i].price}
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

  render() {
    return (
      <div className="orders">
        <div className="pagination mt-5 ">
          {this.generatePagination(
            this.state.pageNumber,
            this.state.totalPages
          )}
        </div>
        {this.generateOrders(this.state.orders)}
      </div>
    );
  }
}

Orders.propTypes = {
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
  getOrders: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security,
  orders: state.orders
});

export default connect(
  mapStateToProps,
  { getOrders }
)(Orders);

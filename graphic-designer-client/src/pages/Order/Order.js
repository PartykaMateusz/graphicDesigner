import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Order.css";
import { getOrder } from "../../actions/orderActions";

import { connect } from "react-redux";
import PropTypes from "prop-types";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: this.props.match.params.id,
      order: {},
      orderCreator: {}
    };
  }

  componentDidMount() {
    this.props.getOrder(this.state.orderId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.order !== this.state.order) {
      this.setState({
        order: nextProps.order
      });
    }

    if (nextProps.order.userDto !== this.state.user) {
      console.log("wbija");
      this.setState({
        orderCreator: nextProps.order.userDto
      });
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <div class="description-section mt-5">
          <div class="container">
            <div class="row">
              <div class="col-md-6 ">
                <div class="desc-image">
                  <img src="https://image.shutterstock.com/image-photo/beautiful-water-drop-on-dandelion-260nw-789676552.jpg" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="desc-title">
                  <h2>{this.state.order.subject}</h2>
                  <p>{this.state.order.text}</p>
                  <h4>Użytkownik:</h4>
                  <p>{this.state.orderCreator.username}</p>
                  <h4>Cena: </h4>
                  <p>{this.state.order.price} zł</p>
                  <h4>Dodane:</h4>
                  <p>{this.state.order.date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Order.propTypes = {
  errors: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  order: state.order
});

export default connect(
  mapStateToProps,
  { getOrder }
)(Order);

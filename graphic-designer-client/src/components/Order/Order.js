import React, { Component } from "react";
import { Loading } from "../Loading/Loading";

const Categories = ({ list }) => {
  if (list) {
    return list.map(item => {
      return item.name + ", ";
    });
  } else {
    return "";
  }
};

export default class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      subject: this.props.subject,
      username: this.props.username,
      price: this.props.price,
      categories: this.props.categories
    };
  }

  render() {
    if (this.state.id === undefined) {
      return <Loading />;
    } else {
      return (
        <div
          className="order row"
          onClick={() => this.props.redirectToOrder(this.state.id)}
        >
          <div className="col-md-4 orderName">{this.state.subject}</div>
          <div className="col-md-4 orderUser">{this.state.username}</div>
          <div className="col-md-4 orderPrice">{this.state.price} zł</div>
          <div className="col-md-10 orderCategory ">
            <span className="font-weight-bold">Kategorie:</span>{" "}
            <Categories list={this.state.categories} />
          </div>
        </div>
      );
    }
  }
}

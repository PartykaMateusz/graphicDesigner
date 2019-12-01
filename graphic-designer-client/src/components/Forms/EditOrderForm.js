import React, { Component } from "react";
import "./LoginForm.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllCategories } from "../../actions/categoryActions";
import { updateOrder } from "../../actions/orderActions";

import "./AddWorkForm.css";

const Categories = ({ categories, changeSelected }) =>
  categories.map(category => {
    return category.isSelected ? (
      <div
        key={category.id}
        className="alert-success category m-1"
        onClick={() => changeSelected(category)}
      >
        {category.name}
      </div>
    ) : (
      <div
        key={category.id}
        className="alert-dark category m-1"
        onClick={() => changeSelected(category)}
      >
        {category.name}
      </div>
    );
  });

class EditOrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      orderId: null,
      subject: "",
      text: "",
      price: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
  }

  componentDidMount() {
    this.props.getAllCategories();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categories) {
      let categories = nextProps.categories.categories;
      let categoriesList = [];

      //convert object to list, and add isSelected property
      Object.keys(categories).forEach(function(key) {
        categoriesList.push({
          id: categories[key]["id"],
          name: categories[key]["name"],
          isSelected: false
        });
      });

      this.setState({
        categories: categoriesList
      });
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.order) {
      this.setState({
        subject: nextProps.order.subject,
        text: nextProps.order.text,
        price: nextProps.order.price,
        orderId: nextProps.order.id
      });
    }
  }

  changeSelected(category) {
    let categories = [...this.state.categories];
    category.isSelected = !category.isSelected;

    this.setState({
      categories: categories
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    let allCategories = this.state.categories;
    let selectedCategories = [];

    Object.keys(allCategories).forEach(function(key) {
      if (allCategories[key].isSelected) {
        selectedCategories.push(allCategories[key]);
      }
    });

    const order = {
      subject: this.state.subject,
      text: this.state.text,
      price: this.state.price,
      categoryList: selectedCategories
    };

    this.props.updateOrder(this.state.orderId, order, this.props.history);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Temat</label>
          <input
            className="form-control"
            placeholder="Podaj nazwę zlecenia"
            id="subject"
            name="subject"
            value={this.state.subject}
            onChange={this.onChange}
            maxLength="15"
          />
        </div>

        <div className="form-group">
          <label>Treść</label>
          <textarea
            maxLength="255"
            className="form-control"
            rows="3"
            id="text"
            name="text"
            value={this.state.text}
            onChange={this.onChange}
          />
        </div>

        <div className="form-group">
          <label>Cena</label>
          <input
            type="number"
            className="form-control"
            placeholder="Podaj cenę"
            id="price"
            name="price"
            value={this.state.price}
            onChange={this.onChange}
            maxLength="6"
          />
        </div>

        <div className="form-group">
          <div>
            <label>Wybierz kategorię:</label>
          </div>
          <div>
            <Categories
              categories={this.state.categories}
              changeSelected={this.changeSelected}
            />
          </div>
        </div>

        <div>
          <button type="submit" className="btn btn-primary mt-3">
            Wyślij
          </button>
        </div>
      </form>
    );
  }
}

EditOrderForm.propTypes = {
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
  getAllCategories: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security,
  categories: state.categories,
  profile: state.profile
});

export default connect(mapStateToProps, { getAllCategories, updateOrder })(
  EditOrderForm
);
